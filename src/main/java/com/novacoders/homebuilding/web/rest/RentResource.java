package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.domain.Rent;
import com.novacoders.homebuilding.repository.RentRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link com.novacoders.homebuilding.domain.Rent}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class RentResource {

    private final Logger log = LoggerFactory.getLogger(RentResource.class);

    private static final String ENTITY_NAME = "rent";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RentRepository rentRepository;

    public RentResource(RentRepository rentRepository) {
        this.rentRepository = rentRepository;
    }

    /**
     * {@code POST  /rents} : Create a new rent.
     *
     * @param rent the rent to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new rent, or with status {@code 400 (Bad Request)} if the rent has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/rents")
    public ResponseEntity<Rent> createRent(@RequestBody Rent rent) throws URISyntaxException {
        log.debug("REST request to save Rent : {}", rent);
        if (rent.getId() != null) {
            throw new BadRequestAlertException("A new rent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Rent result = rentRepository.save(rent);
        return ResponseEntity.created(new URI("/api/rents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /rents} : Updates an existing rent.
     *
     * @param rent the rent to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated rent,
     * or with status {@code 400 (Bad Request)} if the rent is not valid,
     * or with status {@code 500 (Internal Server Error)} if the rent couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/rents")
    public ResponseEntity<Rent> updateRent(@RequestBody Rent rent) throws URISyntaxException {
        log.debug("REST request to update Rent : {}", rent);
        if (rent.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Rent result = rentRepository.save(rent);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, rent.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /rents} : get all the rents.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of rents in body.
     */
    @GetMapping("/rents")
    public List<Rent> getAllRents(@RequestParam(required = false) String filter) {
        if ("property-is-null".equals(filter)) {
            log.debug("REST request to get all Rents where property is null");
            return StreamSupport
                .stream(rentRepository.findAll().spliterator(), false)
                .filter(rent -> rent.getProperty() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Rents");
        return rentRepository.findAll();
    }

    /**
     * {@code GET  /rents/:id} : get the "id" rent.
     *
     * @param id the id of the rent to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the rent, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/rents/{id}")
    public ResponseEntity<Rent> getRent(@PathVariable Long id) {
        log.debug("REST request to get Rent : {}", id);
        Optional<Rent> rent = rentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(rent);
    }

    /**
     * {@code DELETE  /rents/:id} : delete the "id" rent.
     *
     * @param id the id of the rent to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/rents/{id}")
    public ResponseEntity<Void> deleteRent(@PathVariable Long id) {
        log.debug("REST request to delete Rent : {}", id);
        rentRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
