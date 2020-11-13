package com.novacoders.homebuilding.repository;

import com.novacoders.homebuilding.domain.Canton;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import java.util.List;
/**
 * Spring Data  repository for the Canton entity.
 */
@Repository
public interface CantonRepository extends JpaRepository<Canton, Long> {

    @Query(value = "SELECT c FROM Canton c WHERE c.province.id = :provinceId")
    List<Canton> findByProvinceId(long provinceId);
}

