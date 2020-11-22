package com.novacoders.homebuilding.repository;

import com.novacoders.homebuilding.domain.Property;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.time.ZonedDateTime;
import java.util.List;

/**
 * Spring Data  repository for the Property entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {


    @Query(value = "SELECT p FROM Property p WHERE p.sale is not null and p.state > 0")
    List<Property> findBySaleNotNull();

    @Query("SELECT p FROM Property p WHERE p.sale.finalDate <= :expireDateTime AND p.state = 1")
    List<Property> findAllWithCreationDateTimeBefore(@Param("expireDateTime") ZonedDateTime expireDateTime);

}
