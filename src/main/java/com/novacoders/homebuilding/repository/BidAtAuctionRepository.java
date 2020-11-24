package com.novacoders.homebuilding.repository;

import com.novacoders.homebuilding.domain.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BidAtAuctionRepository extends JpaRepository<Offer, Long> {
    @Query(value = "SELECT * FROM offer WHERE sale_id = :saleid ORDER BY amount DESC LIMIT 1", nativeQuery = true)
    List<Offer> getMaxOffer(@Param("saleid") long saleid);
}
