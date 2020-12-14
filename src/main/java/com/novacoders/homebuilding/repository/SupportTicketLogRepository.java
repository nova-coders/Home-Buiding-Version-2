package com.novacoders.homebuilding.repository;

import com.novacoders.homebuilding.domain.Property;
import com.novacoders.homebuilding.domain.SupportTicketLog;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the SupportTicketLog entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SupportTicketLogRepository extends JpaRepository<SupportTicketLog, Long> {

    @Query(value = "SELECT s FROM SupportTicketLog s WHERE s.supportTicket.id = :id")
    List<SupportTicketLog> findLogsByTicketId(@Param("id") long id);
}
