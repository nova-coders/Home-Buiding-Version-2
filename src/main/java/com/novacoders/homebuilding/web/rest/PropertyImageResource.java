package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.domain.PropertyImage;
import com.novacoders.homebuilding.repository.PropertyImageRepository;
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
 * REST controller for managing {@link com.novacoders.homebuilding.domain.PropertyImage}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PropertyImageResource {

    private final Logger log = LoggerFactory.getLogger(PropertyImageResource.class);

    private static final String ENTITY_NAME = "propertyImage";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PropertyImageRepository propertyImageRepository;

    public PropertyImageResource(PropertyImageRepository propertyImageRepository) {
        this.propertyImageRepository = propertyImageRepository;
    }

    /**
     * {@code POST  /property-images} : Create a new propertyImage.
     *
     * @param propertyImage the propertyImage to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new propertyImage, or with status {@code 400 (Bad Request)} if the propertyImage has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/property-images")
    public ResponseEntity<PropertyImage> createPropertyImage(@RequestBody PropertyImage propertyImage) throws URISyntaxException {
        log.debug("REST request to save PropertyImage : {}", propertyImage);
        if (propertyImage.getId() != null) {
            throw new BadRequestAlertException("A new propertyImage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PropertyImage result = propertyImageRepository.save(propertyImage);
        return ResponseEntity.created(new URI("/api/property-images/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /property-images} : Updates an existing propertyImage.
     *
     * @param propertyImage the propertyImage to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated propertyImage,
     * or with status {@code 400 (Bad Request)} if the propertyImage is not valid,
     * or with status {@code 500 (Internal Server Error)} if the propertyImage couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/property-images")
    public ResponseEntity<PropertyImage> updatePropertyImage(@RequestBody PropertyImage propertyImage) throws URISyntaxException {
        log.debug("REST request to update PropertyImage : {}", propertyImage);
        if (propertyImage.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PropertyImage result = propertyImageRepository.save(propertyImage);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, propertyImage.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /property-images} : get all the propertyImages.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of propertyImages in body.
     */
    @GetMapping("/property-images")
    public List<PropertyImage> getAllPropertyImages() {
        log.debug("REST request to get all PropertyImages");
        return propertyImageRepository.findAll();
    }

    /**
     * {@code GET  /property-images/:id} : get the "id" propertyImage.
     *
     * @param id the id of the propertyImage to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the propertyImage, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/property-images/{id}")
    public ResponseEntity<PropertyImage> getPropertyImage(@PathVariable Long id) {
        log.debug("REST request to get PropertyImage : {}", id);
        Optional<PropertyImage> propertyImage = propertyImageRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(propertyImage);
    }

    /**
     * {@code DELETE  /property-images/:id} : delete the "id" propertyImage.
     *
     * @param id the id of the propertyImage to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/property-images/{id}")
    public ResponseEntity<Void> deletePropertyImage(@PathVariable Long id) {
        log.debug("REST request to delete PropertyImage : {}", id);
        propertyImageRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
