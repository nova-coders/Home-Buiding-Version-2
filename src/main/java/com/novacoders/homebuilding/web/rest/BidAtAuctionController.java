package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.domain.Offer;
import com.novacoders.homebuilding.service.BidAtAuctionService;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@Transactional
public class BidAtAuctionController {
    public BidAtAuctionService bidAtAuctionService;
    public BidAtAuctionController(BidAtAuctionService bidAtAuctionService){
        this.bidAtAuctionService = bidAtAuctionService;
    }
    @PostMapping("/saveBidAuction")
    public int saveBidAuction(@RequestBody Offer offer) {
        return bidAtAuctionService.saveBidAuction(offer);
    }
}
