package com.novacoders.homebuilding.repository;

import com.novacoders.homebuilding.domain.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Property entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {

    @Query(value = "SELECT p FROM Property p WHERE p.sale is not null")
    List<Property> findBySaleNotNull();
}
