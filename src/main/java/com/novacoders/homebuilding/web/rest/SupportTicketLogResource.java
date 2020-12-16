package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.domain.SupportTicketLog;
import com.novacoders.homebuilding.repository.SupportTicketLogRepository;
import com.novacoders.homebuilding.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.novacoders.homebuilding.domain.SupportTicketLog}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SupportTicketLogResource {

    private final Logger log = LoggerFactory.getLogger(SupportTicketLogResource.class);

    private static final String ENTITY_NAME = "supportTicketLog";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SupportTicketLogRepository supportTicketLogRepository;

    public SupportTicketLogResource(SupportTicketLogRepository supportTicketLogRepository) {
        this.supportTicketLogRepository = supportTicketLogRepository;
    }

    /**
     * {@code POST  /support-ticket-logs} : Create a new supportTicketLog.
     *
     * @param supportTicketLog the supportTicketLog to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new supportTicketLog, or with status {@code 400 (Bad Request)} if the supportTicketLog has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/support-ticket-logs")
    public ResponseEntity<SupportTicketLog> createSupportTicketLog(@RequestBody SupportTicketLog supportTicketLog) throws URISyntaxException {
        log.debug("REST request to save SupportTicketLog : {}", supportTicketLog);
        if (supportTicketLog.getId() != null) {
            throw new BadRequestAlertException("A new supportTicketLog cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SupportTicketLog result = supportTicketLogRepository.save(supportTicketLog);
        return ResponseEntity.created(new URI("/api/support-ticket-logs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /support-ticket-logs} : Updates an existing supportTicketLog.
     *
     * @param supportTicketLog the supportTicketLog to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated supportTicketLog,
     * or with status {@code 400 (Bad Request)} if the supportTicketLog is not valid,
     * or with status {@code 500 (Internal Server Error)} if the supportTicketLog couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/support-ticket-logs")
    public ResponseEntity<SupportTicketLog> updateSupportTicketLog(@RequestBody SupportTicketLog supportTicketLog) throws URISyntaxException {
        log.debug("REST request to update SupportTicketLog : {}", supportTicketLog);
        if (supportTicketLog.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SupportTicketLog result = supportTicketLogRepository.save(supportTicketLog);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, supportTicketLog.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /support-ticket-logs} : get all the supportTicketLogs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of supportTicketLogs in body.
     */
    @GetMapping("/support-ticket-logs")
    public List<SupportTicketLog> getAllSupportTicketLogs() {
        log.debug("REST request to get all SupportTicketLogs");
        return supportTicketLogRepository.findAll();
    }

    @GetMapping("/support-ticket-logs/byTicketID/{id}")
    public List<SupportTicketLog> getAllSupportTicketLogsByTicketID(@PathVariable Long id) {
        log.debug("REST request to get all SupportTicketLogs");
        return supportTicketLogRepository.findLogsByTicketId(id);
    }

    /**
     * {@code GET  /support-ticket-logs/:id} : get the "id" supportTicketLog.
     *
     * @param id the id of the supportTicketLog to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the supportTicketLog, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/support-ticket-logs/{id}")
    public ResponseEntity<SupportTicketLog> getSupportTicketLog(@PathVariable Long id) {
        log.debug("REST request to get SupportTicketLog : {}", id);
        Optional<SupportTicketLog> supportTicketLog = supportTicketLogRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(supportTicketLog);
    }

    /**
     * {@code DELETE  /support-ticket-logs/:id} : delete the "id" supportTicketLog.
     *
     * @param id the id of the supportTicketLog to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/support-ticket-logs/{id}")
    public ResponseEntity<Void> deleteSupportTicketLog(@PathVariable Long id) {
        log.debug("REST request to delete SupportTicketLog : {}", id);
        supportTicketLogRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
