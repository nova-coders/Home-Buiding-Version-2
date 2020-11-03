package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.domain.PropertyCategory;
import com.novacoders.homebuilding.repository.PropertyCategoryRepository;
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
 * REST controller for managing {@link com.novacoders.homebuilding.domain.PropertyCategory}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PropertyCategoryResource {

    private final Logger log = LoggerFactory.getLogger(PropertyCategoryResource.class);

    private static final String ENTITY_NAME = "propertyCategory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PropertyCategoryRepository propertyCategoryRepository;

    public PropertyCategoryResource(PropertyCategoryRepository propertyCategoryRepository) {
        this.propertyCategoryRepository = propertyCategoryRepository;
    }

    /**
     * {@code POST  /property-categories} : Create a new propertyCategory.
     *
     * @param propertyCategory the propertyCategory to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new propertyCategory, or with status {@code 400 (Bad Request)} if the propertyCategory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/property-categories")
    public ResponseEntity<PropertyCategory> createPropertyCategory(@RequestBody PropertyCategory propertyCategory) throws URISyntaxException {
        log.debug("REST request to save PropertyCategory : {}", propertyCategory);
        if (propertyCategory.getId() != null) {
            throw new BadRequestAlertException("A new propertyCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PropertyCategory result = propertyCategoryRepository.save(propertyCategory);
        return ResponseEntity.created(new URI("/api/property-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /property-categories} : Updates an existing propertyCategory.
     *
     * @param propertyCategory the propertyCategory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated propertyCategory,
     * or with status {@code 400 (Bad Request)} if the propertyCategory is not valid,
     * or with status {@code 500 (Internal Server Error)} if the propertyCategory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/property-categories")
    public ResponseEntity<PropertyCategory> updatePropertyCategory(@RequestBody PropertyCategory propertyCategory) throws URISyntaxException {
        log.debug("REST request to update PropertyCategory : {}", propertyCategory);
        if (propertyCategory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PropertyCategory result = propertyCategoryRepository.save(propertyCategory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, propertyCategory.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /property-categories} : get all the propertyCategories.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of propertyCategories in body.
     */
    @GetMapping("/property-categories")
    public List<PropertyCategory> getAllPropertyCategories() {
        log.debug("REST request to get all PropertyCategories");
        return propertyCategoryRepository.findAll();
    }

    /**
     * {@code GET  /property-categories/:id} : get the "id" propertyCategory.
     *
     * @param id the id of the propertyCategory to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the propertyCategory, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/property-categories/{id}")
    public ResponseEntity<PropertyCategory> getPropertyCategory(@PathVariable Long id) {
        log.debug("REST request to get PropertyCategory : {}", id);
        Optional<PropertyCategory> propertyCategory = propertyCategoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(propertyCategory);
    }

    /**
     * {@code DELETE  /property-categories/:id} : delete the "id" propertyCategory.
     *
     * @param id the id of the propertyCategory to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/property-categories/{id}")
    public ResponseEntity<Void> deletePropertyCategory(@PathVariable Long id) {
        log.debug("REST request to delete PropertyCategory : {}", id);
        propertyCategoryRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
