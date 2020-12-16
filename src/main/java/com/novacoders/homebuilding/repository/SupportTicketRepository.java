package com.novacoders.homebuilding.repository;

import com.novacoders.homebuilding.domain.SupportTicket;

import com.novacoders.homebuilding.domain.SupportTicketLog;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the SupportTicket entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SupportTicketRepository extends JpaRepository<SupportTicket, Long> {

    @Query(value = "SELECT s FROM SupportTicket s WHERE s.client.id = :id")
    List<SupportTicket> findTicketsByClientID(@Param("id") long id);

}
