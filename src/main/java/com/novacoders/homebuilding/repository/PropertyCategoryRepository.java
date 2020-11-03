package com.novacoders.homebuilding.repository;

import com.novacoders.homebuilding.domain.PropertyCategory;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PropertyCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PropertyCategoryRepository extends JpaRepository<PropertyCategory, Long> {
}
