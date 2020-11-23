package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.domain.Offer;
import com.novacoders.homebuilding.domain.Property;
import com.novacoders.homebuilding.repository.OfferRepository;
import com.novacoders.homebuilding.repository.PropertyRepository;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

/**
 * CustomOfferResource controller
 */
@RestController
@RequestMapping("/api/custom-offer-resource")
public class CustomOfferResource {

    private final Logger log = LoggerFactory.getLogger(CustomOfferResource.class);

    private final OfferRepository offerRepository;

    public CustomOfferResource(OfferRepository offerRepository){
        this.offerRepository = offerRepository;
    }

    /**
    * GET getOfferByUser
    */
    @GetMapping("/get-offer-by-user/{id}")
    public List<Offer> getOfferByUser(@PathVariable long id) {
        return offerRepository.findByUserAccount_Id(id);
    }

    /**
     * Get the best offer in a sale.
     * @param id
     * @return
     */
    @GetMapping("/get-max-offer-by-sale/{id}")
    public Double getMaxOfferBySale(@PathVariable long id){
        return offerRepository.getMaxOfferBySale_Id(id);
    }

}