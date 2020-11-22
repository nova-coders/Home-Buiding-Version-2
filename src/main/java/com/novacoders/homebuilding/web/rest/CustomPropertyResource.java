package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.domain.Property;
import com.novacoders.homebuilding.repository.PropertyRepository;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

/**
 * CustomPropertyResource controller
 */
@RestController
@RequestMapping("/api/custom-property-resource")
public class CustomPropertyResource {

    private final Logger log = LoggerFactory.getLogger(CustomPropertyResource.class);

    private final PropertyRepository propertyRepository;

    public CustomPropertyResource(PropertyRepository propertyRepository){
        this.propertyRepository = propertyRepository;
    }

    /**
    * GET getPropertyBySaleId
    */
    @GetMapping("/get-property-by-sale-id/{id}")
    public ResponseEntity<Property> getPropertyBySaleId(@PathVariable long id) {
        log.debug("REST request to get Property by sale id: {}", id);
        Optional<Property> optionalProperty = propertyRepository.findBySale_Id(id);
        return ResponseUtil.wrapOrNotFound(optionalProperty);
    }

}
