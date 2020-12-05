package com.novacoders.homebuilding.repository;

import com.novacoders.homebuilding.domain.Offer;

import com.novacoders.homebuilding.domain.UserAccount;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Offer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {
    List<Offer> findByUserAccount_IdOrderByDateDesc(long id);

    @Query("SELECT MAX(o.amount) FROM Offer o WHERE o.sale.id = :id")
    Double getMaxOfferBySale_Id(@Param("id") long id);
}
