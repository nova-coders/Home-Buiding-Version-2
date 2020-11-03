package com.novacoders.homebuilding.repository;

import com.novacoders.homebuilding.domain.SupportTicket;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the SupportTicket entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SupportTicketRepository extends JpaRepository<SupportTicket, Long> {
}
