package com.novacoders.homebuilding.web.websocket;

import com.novacoders.homebuilding.domain.Offer;
import com.novacoders.homebuilding.service.OfferService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class OfferServiceSocket {
    public OfferService offerService;
    public OfferServiceSocket(OfferService offerService){
        this.offerService = offerService;
    }
    @MessageMapping("/topic/offer")
    @SendTo("/topic/new-offer")
    public Offer sedOffer(String offerId){
        return this.offerService.getOfferById(Integer.parseInt(offerId));
    }
}
