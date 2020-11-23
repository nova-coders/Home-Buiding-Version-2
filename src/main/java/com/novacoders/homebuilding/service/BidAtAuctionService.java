package com.novacoders.homebuilding.service;

import com.novacoders.homebuilding.domain.Offer;
import com.novacoders.homebuilding.domain.Property;
import com.novacoders.homebuilding.repository.BidAtAuctionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class BidAtAuctionService {
    public BidAtAuctionRepository bidAtAuctionRepository;
    public PropertyService propertyService;
    public BidAtAuctionService( BidAtAuctionRepository bidAtAuctionRepository, PropertyService propertyService){
        this.bidAtAuctionRepository = bidAtAuctionRepository;
        this.propertyService = propertyService;
    }
    public int saveBidAuction(Offer offer){
        int status = 0;
        List<Offer> offerList = this.bidAtAuctionRepository.getMaxOffer(offer.getId());
            if(offerList.size() > 0) {
                if(offerList.get(0).getUserAccount().getId() == offer.getUserAccount().getId()) {
                    Optional <Property> property = this.propertyService.findPropertyBySale(offerList.get(0).getSale().getId());
                    if(property.isPresent()) {
                        if(property.get().getState() == 1) {
                            if(offerList.get(0).getAmount() < offer.getAmount()) {
                                this.bidAtAuctionRepository.save(offer);
                                status = 1;
                            } else {
                                status = 5;
                            }
                        } else {
                            status = 3;
                        }
                    } else {
                        status = 4;
                    }
                } else {
                    status = 2;
                }
            }
        return status;
    }
}
