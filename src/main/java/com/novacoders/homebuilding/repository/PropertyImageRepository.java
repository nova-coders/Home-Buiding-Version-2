package com.novacoders.homebuilding.repository;

import com.novacoders.homebuilding.domain.PropertyImage;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * Spring Data  repository for the PropertyImage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PropertyImageRepository extends JpaRepository<PropertyImage, Long> {
    Optional<PropertyImage> findFirstByProperty_Id(long propertyId);

    @Query(value = "SELECT o FROM PropertyImage o WHERE o.property.id = :id ORDER BY o.id DESC")
    Set<PropertyImage> findAllById(@Param("id") Long id);
}
