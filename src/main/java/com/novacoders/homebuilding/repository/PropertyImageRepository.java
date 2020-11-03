package com.novacoders.homebuilding.repository;

import com.novacoders.homebuilding.domain.PropertyImage;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PropertyImage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PropertyImageRepository extends JpaRepository<PropertyImage, Long> {
}
