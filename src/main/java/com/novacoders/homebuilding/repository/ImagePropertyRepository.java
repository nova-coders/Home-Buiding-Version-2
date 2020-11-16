package com.novacoders.homebuilding.repository;

import com.novacoders.homebuilding.domain.PropertyImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the image entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ImagePropertyRepository extends JpaRepository<PropertyImage, Long> {
    @Query(value = "SELECT img FROM PropertyImage img WHERE img.property.id = :propertyid ORDER BY img.creationDate DESC")
    List<PropertyImage> findByProperty(@Param("propertyid") long propertyid);
}
