package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.domain.Canton;
import com.novacoders.homebuilding.repository.CantonRepository;
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
 * REST controller for managing {@link com.novacoders.homebuilding.domain.Canton}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CantonResource {

    private final Logger log = LoggerFactory.getLogger(CantonResource.class);

    private static final String ENTITY_NAME = "canton";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CantonRepository cantonRepository;

    public CantonResource(CantonRepository cantonRepository) {
        this.cantonRepository = cantonRepository;
    }

    /**
     * {@code POST  /cantons} : Create a new canton.
     *
     * @param canton the canton to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new canton, or with status {@code 400 (Bad Request)} if the canton has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cantons")
    public ResponseEntity<Canton> createCanton(@RequestBody Canton canton) throws URISyntaxException {
        log.debug("REST request to save Canton : {}", canton);
        if (canton.getId() != null) {
            throw new BadRequestAlertException("A new canton cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Canton result = cantonRepository.save(canton);
        return ResponseEntity.created(new URI("/api/cantons/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cantons} : Updates an existing canton.
     *
     * @param canton the canton to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated canton,
     * or with status {@code 400 (Bad Request)} if the canton is not valid,
     * or with status {@code 500 (Internal Server Error)} if the canton couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cantons")
    public ResponseEntity<Canton> updateCanton(@RequestBody Canton canton) throws URISyntaxException {
        log.debug("REST request to update Canton : {}", canton);
        if (canton.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Canton result = cantonRepository.save(canton);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, canton.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /cantons} : get all the cantons.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cantons in body.
     */
    @GetMapping("/cantons")
    public List<Canton> getAllCantons() {
        log.debug("REST request to get all Cantons");
        return cantonRepository.findAll();
    }

    /**
     * {@code GET  /cantons/:id} : get the "id" canton.
     *
     * @param id the id of the canton to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the canton, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cantons/{id}")
    public ResponseEntity<Canton> getCanton(@PathVariable Long id) {
        log.debug("REST request to get Canton : {}", id);
        Optional<Canton> canton = cantonRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(canton);
    }
    @GetMapping("/cantons/province/{idProvince}")
    public List<Canton> getAllCantonsByProvince(@PathVariable Long idProvince) {
        log.debug("REST request to get all Cantons by province");
        return cantonRepository.findByProvinceId(idProvince);
    }
    /**
     * {@code DELETE  /cantons/:id} : delete the "id" canton.
     *
     * @param id the id of the canton to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cantons/{id}")
    public ResponseEntity<Void> deleteCanton(@PathVariable Long id) {
        log.debug("REST request to delete Canton : {}", id);
        cantonRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
