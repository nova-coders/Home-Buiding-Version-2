package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.domain.Offer;
import com.novacoders.homebuilding.domain.PropertyImage;
import com.novacoders.homebuilding.service.AuctionService;
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
public class AuctionController {
    private AuctionService auctionService;
    public AuctionController(AuctionService auctionService){
        this.auctionService = auctionService;
    }
    /**
     * {@code GET  /by-sale/saleid} : get  userAccount.
     *
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the List<Offer>, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/offerby-sale/{saleid}")
    public List<Offer> findOfferBySale(@PathVariable int saleid) {
        return this.auctionService.findOfferBySale(saleid);
    }
    @GetMapping("/getauctionimg/{propertyid}")
    public List<PropertyImage> getAuctionImage(@PathVariable int propertyid) {
        return this.auctionService.getImageAuction(propertyid);
    }
    /**
     * {@code GET  /closeauction/{propertyid : get  userAccount.
     *
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the string, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/closeauction/{propertyid}")
    public String closeAuction(@PathVariable int propertyid) {
        String idDocument = this.auctionService.closeAuction(propertyid);
        return idDocument;
    }
    /**
     * {@code GET  /closeauction/{propertyid : get  userAccount.
     *
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the string, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/deleteauction/{propertyid}")
    public String deleteAuction(@PathVariable int propertyid) {
        String status = this.auctionService.deleteAuction(propertyid);
        return status;
    }
}
