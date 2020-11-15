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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SeeAuctionService {
    public final SeeAuctionRepository seeAuctionRepository;
    public final PropertyRepository propertyRepository;
    public final DocumentRepository documentRepository;
    private final UserRepository userRepository;
    private final ServicePaymentRepository servicePaymentRepository;
    private static final Logger log = LoggerFactory.getLogger(ActivityService.class);
    public SeeAuctionService(SeeAuctionRepository seeAuctionRepository, PropertyRepository propertyRepository, UserRepository userRepository,ServicePaymentRepository servicePaymentRepository,DocumentRepository documentRepository){
        this.seeAuctionRepository = seeAuctionRepository;
        this.propertyRepository = propertyRepository;
        this.userRepository = userRepository;
        this.servicePaymentRepository = servicePaymentRepository;
        this.documentRepository = documentRepository;

    }
    public List<Offer> findOfferBySale(long saleId) {
        Optional<User> user = SecurityUtils.getCurrentUserLogin().flatMap( userRepository::findOneByLogin);
        if(user.isPresent()) {
            return this.seeAuctionRepository.findBySale(saleId);
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
                    return "" + document.getId();
                }
            }
        }
        throw new ResourceException("Action Invalid Data");
    }
}
