package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.domain.PublishingPackage;
import com.novacoders.homebuilding.repository.PublishingPackageRepository;
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
 * REST controller for managing {@link com.novacoders.homebuilding.domain.PublishingPackage}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PublishingPackageResource {

    private final Logger log = LoggerFactory.getLogger(PublishingPackageResource.class);

    private static final String ENTITY_NAME = "publishingPackage";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PublishingPackageRepository publishingPackageRepository;

    public PublishingPackageResource(PublishingPackageRepository publishingPackageRepository) {
        this.publishingPackageRepository = publishingPackageRepository;
    }

    /**
     * {@code POST  /publishing-packages} : Create a new publishingPackage.
     *
     * @param publishingPackage the publishingPackage to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new publishingPackage, or with status {@code 400 (Bad Request)} if the publishingPackage has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/publishing-packages")
    public ResponseEntity<PublishingPackage> createPublishingPackage(@RequestBody PublishingPackage publishingPackage) throws URISyntaxException {
        log.debug("REST request to save PublishingPackage : {}", publishingPackage);
        if (publishingPackage.getId() != null) {
            throw new BadRequestAlertException("A new publishingPackage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PublishingPackage result = publishingPackageRepository.save(publishingPackage);
        return ResponseEntity.created(new URI("/api/publishing-packages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /publishing-packages} : Updates an existing publishingPackage.
     *
     * @param publishingPackage the publishingPackage to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated publishingPackage,
     * or with status {@code 400 (Bad Request)} if the publishingPackage is not valid,
     * or with status {@code 500 (Internal Server Error)} if the publishingPackage couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/publishing-packages")
    public ResponseEntity<PublishingPackage> updatePublishingPackage(@RequestBody PublishingPackage publishingPackage) throws URISyntaxException {
        log.debug("REST request to update PublishingPackage : {}", publishingPackage);
        if (publishingPackage.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PublishingPackage result = publishingPackageRepository.save(publishingPackage);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, publishingPackage.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /publishing-packages} : get all the publishingPackages.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of publishingPackages in body.
     */
    @GetMapping("/publishing-packages")
    public List<PublishingPackage> getAllPublishingPackages() {
        log.debug("REST request to get all PublishingPackages");
        return publishingPackageRepository.findAll();
    }

    /**
     * {@code GET  /publishing-packages/:id} : get the "id" publishingPackage.
     *
     * @param id the id of the publishingPackage to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the publishingPackage, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/publishing-packages/{id}")
    public ResponseEntity<PublishingPackage> getPublishingPackage(@PathVariable Long id) {
        log.debug("REST request to get PublishingPackage : {}", id);
        Optional<PublishingPackage> publishingPackage = publishingPackageRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(publishingPackage);
    }

    /**
     * {@code DELETE  /publishing-packages/:id} : delete the "id" publishingPackage.
     *
     * @param id the id of the publishingPackage to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/publishing-packages/{id}")
    public ResponseEntity<Void> deletePublishingPackage(@PathVariable Long id) {
        log.debug("REST request to delete PublishingPackage : {}", id);
        publishingPackageRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
