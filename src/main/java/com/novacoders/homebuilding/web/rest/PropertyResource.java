package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.domain.Property;
import com.novacoders.homebuilding.domain.PropertyImage;
import com.novacoders.homebuilding.domain.Sale;
import com.novacoders.homebuilding.repository.PropertyImageRepository;
import com.novacoders.homebuilding.repository.PropertyRepository;
import com.novacoders.homebuilding.repository.SaleRepository;
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
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * REST controller for managing {@link com.novacoders.homebuilding.domain.Property}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PropertyResource {

    private final Logger log = LoggerFactory.getLogger(PropertyResource.class);

    private static final String ENTITY_NAME = "property";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PropertyRepository propertyRepository;
    private final SaleRepository saleRepository;
    private final PropertyImageRepository propertyImageRepository;
    public PropertyResource(PropertyRepository propertyRepository,SaleRepository saleRepository,PropertyImageRepository propertyImageRepository) {
        this.propertyRepository = propertyRepository;
        this.saleRepository= saleRepository;
        this.propertyImageRepository=propertyImageRepository;
    }

    /**
     * {@code POST  /properties} : Create a new property.
     *
     * @param property the property to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new property, or with status {@code 400 (Bad Request)} if the property has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/properties")
    public ResponseEntity<Property> createProperty(@RequestBody Property property) throws URISyntaxException {
        log.debug("REST request to save Property : {}", property);
        if (property.getId() != null) {
            throw new BadRequestAlertException("A new property cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Sale mySale=property.getSale();
        if(mySale == null) {
            throw new BadRequestAlertException("Null object", ENTITY_NAME, "required");
        }else {
            property.setSale(saleRepository.save(mySale));
        }

        Property result = propertyRepository.save(property);
        if(property.getPropertyImages()==null){
            throw new BadRequestAlertException("Null object", ENTITY_NAME, "required");
        }else{
            List <PropertyImage> mylistImages= new ArrayList(property.getPropertyImages());
            for(int i=0;i<mylistImages.size();i++) {
                mylistImages.get(i).setProperty(result);
            }
            propertyImageRepository.saveAll(mylistImages);
        }
        return ResponseEntity.created(new URI("/api/properties/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /properties} : Updates an existing property.
     *
     * @param property the property to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated property,
     * or with status {@code 400 (Bad Request)} if the property is not valid,
     * or with status {@code 500 (Internal Server Error)} if the property couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/properties")
        public ResponseEntity<Property> updateProperty(@RequestBody Property property) throws URISyntaxException {
            log.debug("REST request to save Property : {}", property);
            if (property.getId() == null) {
                throw new BadRequestAlertException("Something is bad.There is not id", ENTITY_NAME, "");
            }
            Sale mySale=property.getSale();
            if(mySale == null) {
                throw new BadRequestAlertException("Null object", ENTITY_NAME, "required");
            }else {
                property.setSale(saleRepository.save(mySale));
            }

            Property result = propertyRepository.save(property);
            if(property.getPropertyImages()==null){
                throw new BadRequestAlertException("Null object", ENTITY_NAME, "required");
            }else{
                propertyImageRepository.deletePropertyImageByPropertyId(property.getId());
                List <PropertyImage> mylistImages= new ArrayList(property.getPropertyImages());
                for(int i=0;i<mylistImages.size();i++) {
                    mylistImages.get(i).setProperty(result);
                }
                propertyImageRepository.saveAll(mylistImages);
            }
            return ResponseEntity.created(new URI("/api/properties/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);
        }

    /**
     * {@code GET  /properties} : get all the properties.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of properties in body.
     */
    @GetMapping("/properties")
    public List<Property> getAllProperties() {
        log.debug("REST request to get all Properties");
        return propertyRepository.findAll();
    }
    @GetMapping("/properties/getPropertiesOnSale")
    public List<Property> getPropertiesOnSale() {
        log.debug("REST request to get all Properties");
        return propertyRepository.findAllPropertiesOnSale(ZonedDateTime.now());
    }
    @GetMapping("/properties/getPropertiesOnSale/{cantonId}")
    public List<Property> getPropertiesOnSale(@PathVariable Long cantonId) {
        log.debug("REST request to get all Properties");
        return propertyRepository.findAllPropertiesOnSaleByCanton(ZonedDateTime.now(), cantonId);
    }

    @GetMapping("/properties/sale")
    public List<Property> getAllPropertiesBySale() {
        log.debug("REST request to get all Properties");
        return propertyRepository.findBySaleNotNull();
    }
    /**
     * {@code GET  /properties/:id} : get the "id" property.
     *
     * @param id the id of the property to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the property, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/properties/{id}")
    public ResponseEntity<Property> getProperty(@PathVariable Long id) {
        log.debug("REST request to get Property : {}", id);
        Optional<Property> property = propertyRepository.findById(id);
        property.get().setPropertyImages(propertyImageRepository.findAllById(id));
        return ResponseUtil.wrapOrNotFound(property);
    }

    /**
     * {@code DELETE  /properties/:id} : delete the "id" property.
     *
     * @param id the id of the property to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/properties/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {
        log.debug("REST request to delete Property : {}", id);
        propertyRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
