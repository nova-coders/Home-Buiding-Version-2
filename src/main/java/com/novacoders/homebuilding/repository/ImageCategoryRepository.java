package com.novacoders.homebuilding.repository;

import com.novacoders.homebuilding.domain.ImageCategory;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ImageCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ImageCategoryRepository extends JpaRepository<ImageCategory, Long> {
}
