package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.domain.Offer;
import com.novacoders.homebuilding.service.SeeAuctionService;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api")
@Transactional
public class SeeAuctionController {
    private SeeAuctionService seeAuctionService;
    public SeeAuctionController(SeeAuctionService seeAuctionService){
        this.seeAuctionService = seeAuctionService;
    }
    /**
     * {@code GET  /by-sale/saleid} : get  userAccount.
     *
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the List<Offer>, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/by-sale/{saleid}")
    public List<Offer> getBySale(@PathVariable int saleid) {
        return this.seeAuctionService.findBySale(saleid);
    }
}
