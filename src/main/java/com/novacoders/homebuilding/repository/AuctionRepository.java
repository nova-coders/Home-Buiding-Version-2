package com.novacoders.homebuilding.repository;
import com.novacoders.homebuilding.domain.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the offer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AuctionRepository extends JpaRepository<Offer, Long> {
    @Query(value = "SELECT o FROM Offer o WHERE o.sale.id = :saleid ORDER BY o.amount DESC")
    List<Offer> findBySale(@Param("saleid") long saleid);

    @Query(value = "SELECT COUNT(o) FROM Offer o WHERE o.sale.id = :saleid")
    long getCantOffer(@Param("saleid") long saleid);
}
