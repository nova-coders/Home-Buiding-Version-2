package com.novacoders.homebuilding.repository;

import com.novacoders.homebuilding.domain.Property;
import com.novacoders.homebuilding.domain.Province;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Province entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProvinceRepository extends JpaRepository<Province, Long> {
}
