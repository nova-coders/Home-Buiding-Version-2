package com.novacoders.homebuilding.repository;

import com.novacoders.homebuilding.domain.Canton;
import com.novacoders.homebuilding.domain.ProfessionalProfileUser;

import com.novacoders.homebuilding.domain.UserAccount;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;

/**
 * Spring Data  repository for the ProfessionalProfileUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfessionalProfileUserRepository extends JpaRepository<ProfessionalProfileUser, Long> {
    @Query(value = "SELECT u FROM UserAccount u INNER JOIN ProfessionalProfileUser p ON p.id = u.professionalProfileUser.id WHERE u.professionalProfileUser IS NOT NULL ")
    List<UserAccount> findProffesionalWithUserId();

    @Query(value = "SELECT u FROM UserAccount u INNER JOIN ProfessionalProfileUser p ON p.id = u.professionalProfileUser.id WHERE u.professionalProfileUser IS NOT NULL AND u.id = :id")
    UserAccount findProffesionalWithUserId(@Param("id") Long id);

}


