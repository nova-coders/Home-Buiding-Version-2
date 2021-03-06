package com.novacoders.homebuilding.service;

import com.novacoders.homebuilding.ResourceException.ResourceException;
import com.novacoders.homebuilding.domain.*;
import com.novacoders.homebuilding.repository.*;
import com.novacoders.homebuilding.security.SecurityUtils;
import com.novacoders.homebuilding.web.websocket.ActivityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AuctionService {
    public final AuctionRepository auctionRepository;
    public final PropertyRepository propertyRepository;
    public final DocumentRepository documentRepository;
    public final ImagePropertyRepository imagePropertyRepository;
    private final UserRepository userRepository;
    private final MailAuctionService mailAuctionService;
    private static final Logger log = LoggerFactory.getLogger(ActivityService.class);
    public AuctionService(AuctionRepository auctionRepository, PropertyRepository propertyRepository, UserRepository userRepository,  MailAuctionService mailAuctionService, DocumentRepository documentRepository, ImagePropertyRepository imagePropertyRepository){
        this.auctionRepository = auctionRepository;
        this.propertyRepository = propertyRepository;
        this.userRepository = userRepository;
        this.mailAuctionService = mailAuctionService;
        this.documentRepository = documentRepository;
        this.imagePropertyRepository = imagePropertyRepository;

    }
    public List<Offer> findOfferBySale(long saleId) {
        Optional<User> user = SecurityUtils.getCurrentUserLogin().flatMap( userRepository::findOneByLogin);
        if(user.isPresent()) {
            return this.auctionRepository.findBySale(saleId);
        } else {
            throw new ResourceException("Invalid action");
        }
    }
    public String closeAuction(long propertyId) {
        Optional<Property> oProperty = this.propertyRepository.findById(propertyId);
        Optional<User> user = SecurityUtils.getCurrentUserLogin().flatMap( userRepository::findOneByLogin);
        if (user.isPresent()) {
            if (oProperty.isPresent()) {
                Property property = oProperty.get();
                List<Offer> offerList = this.findOfferBySale(property.getSale().getId());
                if (offerList.size() > 0) {
                    Document document = new Document();
                    property.setState(3);
                    this.propertyRepository.save(property);
                    document.setProperty(property);
                    document.setBuyer(offerList.get(0).getUserAccount());
                    document.setSeller(property.getUserAccount());
                    document.setState(true);
                    document.setCreationDate(ZonedDateTime.now());
                    document = this.documentRepository.save(document);
                    this.mailAuctionService.sendAuctionEmailToBuyerUser(document);
                    return "" + document.getId();
                } else {
                    property.setState(3);
                    this.propertyRepository.save(property);
                    return "-1";
                }
            }
        }
        throw new ResourceException("Action Invalid Data");
    }
    public String deleteAuction(long propertyId) {
        Optional<Property> oProperty = this.propertyRepository.findById(propertyId);
        Optional<User> user = SecurityUtils.getCurrentUserLogin().flatMap( userRepository::findOneByLogin);
        if (user.isPresent()) {
            if (oProperty.isPresent()) {
                Property property = oProperty.get();
                List<Offer> offerList = this.findOfferBySale(property.getSale().getId());
                if (offerList.size() > 0) {
                    property.setState(0);
                    this.propertyRepository.save(property);
                    this.mailAuctionService.sendAuctionEmailToBuyerUserDelete(offerList.get(0).getUserAccount(),property);
                    return "1";
                } else {
                    property.setState(0);
                    this.propertyRepository.save(property);
                    return "1";
                }
            }
        }
        throw new ResourceException("Action Invalid Data");
    }
    public String closeAuctionExpire(long propertyId) {
        Optional<Property> oProperty = this.propertyRepository.findById(propertyId);
        if (oProperty.isPresent()) {
            Property property = oProperty.get();
            List<Offer> offerList = this.auctionRepository.findBySale(property.getSale().getId());
            if (offerList.size() > 0) {
                Document document = new Document();
                property.setState(3);
                this.propertyRepository.save(property);
                document.setProperty(property);
                document.setBuyer(offerList.get(0).getUserAccount());
                document.setSeller(property.getUserAccount());
                document.setState(true);
                document.setCreationDate(ZonedDateTime.now());
                document = this.documentRepository.save(document);
                this.mailAuctionService.sendAuctionEmailToBuyerUser(document);
                return "" + document.getId();
            }
        }
        throw new ResourceException("Action Invalid Data");
    }
    public List<PropertyImage> getImageAuction(long propertyId){
        return this.imagePropertyRepository.findByProperty(propertyId);
    }
}
