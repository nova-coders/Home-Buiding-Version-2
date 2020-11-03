package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.domain.ProfessionalProfileUser;
import com.novacoders.homebuilding.repository.ProfessionalProfileUserRepository;
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
 * REST controller for managing {@link com.novacoders.homebuilding.domain.ProfessionalProfileUser}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProfessionalProfileUserResource {

    private final Logger log = LoggerFactory.getLogger(ProfessionalProfileUserResource.class);

    private static final String ENTITY_NAME = "professionalProfileUser";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProfessionalProfileUserRepository professionalProfileUserRepository;

    public ProfessionalProfileUserResource(ProfessionalProfileUserRepository professionalProfileUserRepository) {
        this.professionalProfileUserRepository = professionalProfileUserRepository;
    }

    /**
     * {@code POST  /professional-profile-users} : Create a new professionalProfileUser.
     *
     * @param professionalProfileUser the professionalProfileUser to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new professionalProfileUser, or with status {@code 400 (Bad Request)} if the professionalProfileUser has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/professional-profile-users")
    public ResponseEntity<ProfessionalProfileUser> createProfessionalProfileUser(@RequestBody ProfessionalProfileUser professionalProfileUser) throws URISyntaxException {
        log.debug("REST request to save ProfessionalProfileUser : {}", professionalProfileUser);
        if (professionalProfileUser.getId() != null) {
            throw new BadRequestAlertException("A new professionalProfileUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProfessionalProfileUser result = professionalProfileUserRepository.save(professionalProfileUser);
        return ResponseEntity.created(new URI("/api/professional-profile-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /professional-profile-users} : Updates an existing professionalProfileUser.
     *
     * @param professionalProfileUser the professionalProfileUser to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated professionalProfileUser,
     * or with status {@code 400 (Bad Request)} if the professionalProfileUser is not valid,
     * or with status {@code 500 (Internal Server Error)} if the professionalProfileUser couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/professional-profile-users")
    public ResponseEntity<ProfessionalProfileUser> updateProfessionalProfileUser(@RequestBody ProfessionalProfileUser professionalProfileUser) throws URISyntaxException {
        log.debug("REST request to update ProfessionalProfileUser : {}", professionalProfileUser);
        if (professionalProfileUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProfessionalProfileUser result = professionalProfileUserRepository.save(professionalProfileUser);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, professionalProfileUser.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /professional-profile-users} : get all the professionalProfileUsers.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of professionalProfileUsers in body.
     */
    @GetMapping("/professional-profile-users")
    public List<ProfessionalProfileUser> getAllProfessionalProfileUsers(@RequestParam(required = false) String filter) {
        if ("useraccount-is-null".equals(filter)) {
            log.debug("REST request to get all ProfessionalProfileUsers where userAccount is null");
            return StreamSupport
                .stream(professionalProfileUserRepository.findAll().spliterator(), false)
                .filter(professionalProfileUser -> professionalProfileUser.getUserAccount() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all ProfessionalProfileUsers");
        return professionalProfileUserRepository.findAll();
    }

    /**
     * {@code GET  /professional-profile-users/:id} : get the "id" professionalProfileUser.
     *
     * @param id the id of the professionalProfileUser to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the professionalProfileUser, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/professional-profile-users/{id}")
    public ResponseEntity<ProfessionalProfileUser> getProfessionalProfileUser(@PathVariable Long id) {
        log.debug("REST request to get ProfessionalProfileUser : {}", id);
        Optional<ProfessionalProfileUser> professionalProfileUser = professionalProfileUserRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(professionalProfileUser);
    }

    /**
     * {@code DELETE  /professional-profile-users/:id} : delete the "id" professionalProfileUser.
     *
     * @param id the id of the professionalProfileUser to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/professional-profile-users/{id}")
    public ResponseEntity<Void> deleteProfessionalProfileUser(@PathVariable Long id) {
        log.debug("REST request to delete ProfessionalProfileUser : {}", id);
        professionalProfileUserRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
