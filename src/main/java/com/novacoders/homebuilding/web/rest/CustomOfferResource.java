package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.domain.Offer;
import com.novacoders.homebuilding.repository.OfferRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
        List<Offer> offerList = offerRepository.findByUserAccount_Id(id);
        Map<Long, Offer> offerMap = new HashMap<>();

        for(Offer offer: offerList){
            long saleId = offer.getSale().getId();

            if(!offerMap.containsKey(saleId)){
                offerMap.put(saleId, offer);
            }
            else{
                Offer actualOffer = offerMap.get(saleId);

                if(actualOffer.getAmount() < offer.getAmount()){
                    offerMap.replace(saleId, offer);
                }
            }
        }

        offerList.clear();
        offerList.addAll(offerMap.values());
        return offerList;
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
