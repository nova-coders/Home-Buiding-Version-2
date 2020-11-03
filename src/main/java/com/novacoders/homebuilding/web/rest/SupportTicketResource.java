package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.domain.SupportTicket;
import com.novacoders.homebuilding.repository.SupportTicketRepository;
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
 * REST controller for managing {@link com.novacoders.homebuilding.domain.SupportTicket}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SupportTicketResource {

    private final Logger log = LoggerFactory.getLogger(SupportTicketResource.class);

    private static final String ENTITY_NAME = "supportTicket";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SupportTicketRepository supportTicketRepository;

    public SupportTicketResource(SupportTicketRepository supportTicketRepository) {
        this.supportTicketRepository = supportTicketRepository;
    }

    /**
     * {@code POST  /support-tickets} : Create a new supportTicket.
     *
     * @param supportTicket the supportTicket to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new supportTicket, or with status {@code 400 (Bad Request)} if the supportTicket has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/support-tickets")
    public ResponseEntity<SupportTicket> createSupportTicket(@RequestBody SupportTicket supportTicket) throws URISyntaxException {
        log.debug("REST request to save SupportTicket : {}", supportTicket);
        if (supportTicket.getId() != null) {
            throw new BadRequestAlertException("A new supportTicket cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SupportTicket result = supportTicketRepository.save(supportTicket);
        return ResponseEntity.created(new URI("/api/support-tickets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /support-tickets} : Updates an existing supportTicket.
     *
     * @param supportTicket the supportTicket to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated supportTicket,
     * or with status {@code 400 (Bad Request)} if the supportTicket is not valid,
     * or with status {@code 500 (Internal Server Error)} if the supportTicket couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/support-tickets")
    public ResponseEntity<SupportTicket> updateSupportTicket(@RequestBody SupportTicket supportTicket) throws URISyntaxException {
        log.debug("REST request to update SupportTicket : {}", supportTicket);
        if (supportTicket.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SupportTicket result = supportTicketRepository.save(supportTicket);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, supportTicket.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /support-tickets} : get all the supportTickets.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of supportTickets in body.
     */
    @GetMapping("/support-tickets")
    public List<SupportTicket> getAllSupportTickets() {
        log.debug("REST request to get all SupportTickets");
        return supportTicketRepository.findAll();
    }

    /**
     * {@code GET  /support-tickets/:id} : get the "id" supportTicket.
     *
     * @param id the id of the supportTicket to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the supportTicket, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/support-tickets/{id}")
    public ResponseEntity<SupportTicket> getSupportTicket(@PathVariable Long id) {
        log.debug("REST request to get SupportTicket : {}", id);
        Optional<SupportTicket> supportTicket = supportTicketRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(supportTicket);
    }

    /**
     * {@code DELETE  /support-tickets/:id} : delete the "id" supportTicket.
     *
     * @param id the id of the supportTicket to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/support-tickets/{id}")
    public ResponseEntity<Void> deleteSupportTicket(@PathVariable Long id) {
        log.debug("REST request to delete SupportTicket : {}", id);
        supportTicketRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
