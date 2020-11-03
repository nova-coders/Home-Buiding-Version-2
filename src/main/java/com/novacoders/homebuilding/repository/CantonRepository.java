package com.novacoders.homebuilding.repository;

import com.novacoders.homebuilding.domain.Canton;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Canton entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CantonRepository extends JpaRepository<Canton, Long> {
}
