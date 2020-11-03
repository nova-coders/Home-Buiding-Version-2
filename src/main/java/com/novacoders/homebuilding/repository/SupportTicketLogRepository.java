package com.novacoders.homebuilding.repository;

import com.novacoders.homebuilding.domain.SupportTicketLog;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the SupportTicketLog entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SupportTicketLogRepository extends JpaRepository<SupportTicketLog, Long> {
}
