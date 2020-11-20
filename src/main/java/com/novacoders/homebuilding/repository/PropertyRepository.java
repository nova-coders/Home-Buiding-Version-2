package com.novacoders.homebuilding.repository;

import com.novacoders.homebuilding.domain.Property;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;

/**
 * Spring Data  repository for the Property entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
    @Query("SELECT p FROM Property p WHERE p.sale.finalDate <= :expireDateTime AND p.state = 1")
    List<Property> findAllWithCreationDateTimeBefore(@Param("expireDateTime") ZonedDateTime expireDateTime);
}
