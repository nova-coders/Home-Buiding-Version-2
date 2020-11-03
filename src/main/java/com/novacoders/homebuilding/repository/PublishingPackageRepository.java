package com.novacoders.homebuilding.repository;

import com.novacoders.homebuilding.domain.PublishingPackage;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PublishingPackage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PublishingPackageRepository extends JpaRepository<PublishingPackage, Long> {
}
