package com.novacoders.homebuilding.repository;

import com.novacoders.homebuilding.domain.Offer;

import com.novacoders.homebuilding.domain.UserAccount;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Offer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {
    List<Offer> findByUserAccount_Id(long id);
}
