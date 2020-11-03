package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.domain.MoneyType;
import com.novacoders.homebuilding.repository.MoneyTypeRepository;
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
 * REST controller for managing {@link com.novacoders.homebuilding.domain.MoneyType}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MoneyTypeResource {

    private final Logger log = LoggerFactory.getLogger(MoneyTypeResource.class);

    private static final String ENTITY_NAME = "moneyType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MoneyTypeRepository moneyTypeRepository;

    public MoneyTypeResource(MoneyTypeRepository moneyTypeRepository) {
        this.moneyTypeRepository = moneyTypeRepository;
    }

    /**
     * {@code POST  /money-types} : Create a new moneyType.
     *
     * @param moneyType the moneyType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new moneyType, or with status {@code 400 (Bad Request)} if the moneyType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/money-types")
    public ResponseEntity<MoneyType> createMoneyType(@RequestBody MoneyType moneyType) throws URISyntaxException {
        log.debug("REST request to save MoneyType : {}", moneyType);
        if (moneyType.getId() != null) {
            throw new BadRequestAlertException("A new moneyType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MoneyType result = moneyTypeRepository.save(moneyType);
        return ResponseEntity.created(new URI("/api/money-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /money-types} : Updates an existing moneyType.
     *
     * @param moneyType the moneyType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated moneyType,
     * or with status {@code 400 (Bad Request)} if the moneyType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the moneyType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/money-types")
    public ResponseEntity<MoneyType> updateMoneyType(@RequestBody MoneyType moneyType) throws URISyntaxException {
        log.debug("REST request to update MoneyType : {}", moneyType);
        if (moneyType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MoneyType result = moneyTypeRepository.save(moneyType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, moneyType.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /money-types} : get all the moneyTypes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of moneyTypes in body.
     */
    @GetMapping("/money-types")
    public List<MoneyType> getAllMoneyTypes() {
        log.debug("REST request to get all MoneyTypes");
        return moneyTypeRepository.findAll();
    }

    /**
     * {@code GET  /money-types/:id} : get the "id" moneyType.
     *
     * @param id the id of the moneyType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the moneyType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/money-types/{id}")
    public ResponseEntity<MoneyType> getMoneyType(@PathVariable Long id) {
        log.debug("REST request to get MoneyType : {}", id);
        Optional<MoneyType> moneyType = moneyTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(moneyType);
    }

    /**
     * {@code DELETE  /money-types/:id} : delete the "id" moneyType.
     *
     * @param id the id of the moneyType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/money-types/{id}")
    public ResponseEntity<Void> deleteMoneyType(@PathVariable Long id) {
        log.debug("REST request to delete MoneyType : {}", id);
        moneyTypeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
