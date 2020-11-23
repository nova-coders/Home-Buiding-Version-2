package com.novacoders.homebuilding.service;

import com.novacoders.homebuilding.ResourceException.ResourceException;
import com.novacoders.homebuilding.domain.Offer;
import com.novacoders.homebuilding.repository.OfferRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class OfferService {
    public OfferRepository offerRepository;
    public OfferService(OfferRepository offerRepository){
        this.offerRepository = offerRepository;
    }
    public Offer getOfferById(long offerId){
       Optional <Offer> offer = this.offerRepository.findById(offerId);
       if(offer.isPresent()){
           return offer.get();
       }
       throw new ResourceException("Error");
    }
}
