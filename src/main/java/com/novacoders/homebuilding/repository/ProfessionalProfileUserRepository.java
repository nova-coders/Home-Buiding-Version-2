package com.novacoders.homebuilding.repository;

import com.novacoders.homebuilding.domain.ProfessionalProfileUser;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ProfessionalProfileUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfessionalProfileUserRepository extends JpaRepository<ProfessionalProfileUser, Long> {
}
