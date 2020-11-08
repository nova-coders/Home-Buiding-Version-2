package com.novacoders.homebuilding.repository;


import com.novacoders.homebuilding.domain.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PublishingPackage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ServicePaymentRepository extends JpaRepository<UserAccount, Long> {
    @Query(value = "SELECT u FROM UserAccount u WHERE u.user.id = :userid")
    UserAccount findByUser(@Param("userid") long userid);
}
