package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.domain.ImageCategory;
import com.novacoders.homebuilding.repository.ImageCategoryRepository;
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
 * REST controller for managing {@link com.novacoders.homebuilding.domain.ImageCategory}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ImageCategoryResource {

    private final Logger log = LoggerFactory.getLogger(ImageCategoryResource.class);

    private static final String ENTITY_NAME = "imageCategory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ImageCategoryRepository imageCategoryRepository;

    public ImageCategoryResource(ImageCategoryRepository imageCategoryRepository) {
        this.imageCategoryRepository = imageCategoryRepository;
    }

    /**
     * {@code POST  /image-categories} : Create a new imageCategory.
     *
     * @param imageCategory the imageCategory to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new imageCategory, or with status {@code 400 (Bad Request)} if the imageCategory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/image-categories")
    public ResponseEntity<ImageCategory> createImageCategory(@RequestBody ImageCategory imageCategory) throws URISyntaxException {
        log.debug("REST request to save ImageCategory : {}", imageCategory);
        if (imageCategory.getId() != null) {
            throw new BadRequestAlertException("A new imageCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ImageCategory result = imageCategoryRepository.save(imageCategory);
        return ResponseEntity.created(new URI("/api/image-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /image-categories} : Updates an existing imageCategory.
     *
     * @param imageCategory the imageCategory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated imageCategory,
     * or with status {@code 400 (Bad Request)} if the imageCategory is not valid,
     * or with status {@code 500 (Internal Server Error)} if the imageCategory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/image-categories")
    public ResponseEntity<ImageCategory> updateImageCategory(@RequestBody ImageCategory imageCategory) throws URISyntaxException {
        log.debug("REST request to update ImageCategory : {}", imageCategory);
        if (imageCategory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ImageCategory result = imageCategoryRepository.save(imageCategory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, imageCategory.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /image-categories} : get all the imageCategories.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of imageCategories in body.
     */
    @GetMapping("/image-categories")
    public List<ImageCategory> getAllImageCategories() {
        log.debug("REST request to get all ImageCategories");
        return imageCategoryRepository.findAll();
    }

    /**
     * {@code GET  /image-categories/:id} : get the "id" imageCategory.
     *
     * @param id the id of the imageCategory to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the imageCategory, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/image-categories/{id}")
    public ResponseEntity<ImageCategory> getImageCategory(@PathVariable Long id) {
        log.debug("REST request to get ImageCategory : {}", id);
        Optional<ImageCategory> imageCategory = imageCategoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(imageCategory);
    }

    /**
     * {@code DELETE  /image-categories/:id} : delete the "id" imageCategory.
     *
     * @param id the id of the imageCategory to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/image-categories/{id}")
    public ResponseEntity<Void> deleteImageCategory(@PathVariable Long id) {
        log.debug("REST request to delete ImageCategory : {}", id);
        imageCategoryRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
