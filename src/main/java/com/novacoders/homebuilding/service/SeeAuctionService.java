package com.novacoders.homebuilding.service;

import com.novacoders.homebuilding.ResourceException.ResourceException;
import com.novacoders.homebuilding.domain.Offer;
import com.novacoders.homebuilding.domain.Property;
import com.novacoders.homebuilding.domain.User;
import com.novacoders.homebuilding.repository.PropertyRepository;
import com.novacoders.homebuilding.repository.SeeAuctionRepository;
import com.novacoders.homebuilding.repository.UserRepository;
import com.novacoders.homebuilding.security.SecurityUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SeeAuctionService {
    public final SeeAuctionRepository seeAuctionRepository;
    public final PropertyRepository propertyRepository;
    private final UserRepository userRepository;

    public SeeAuctionService(SeeAuctionRepository seeAuctionRepository, PropertyRepository propertyRepository, UserRepository userRepository){
        this.seeAuctionRepository = seeAuctionRepository;
        this.propertyRepository = propertyRepository;
        this.userRepository = userRepository;

    }
    public List<Offer> findBySale(long saleId) {
        Optional<User> user = SecurityUtils.getCurrentUserLogin().flatMap( userRepository::findOneByLogin);
        if(user.isPresent()) {
            return this.seeAuctionRepository.findBySale(saleId);
        } else {
            throw new ResourceException("Invalid action");
        }
    }
    public Property closeAuction(long propertyId) {
        Optional<Property> oProperty = this.propertyRepository.findById(propertyId);
        Optional<User> user = SecurityUtils.getCurrentUserLogin().flatMap( userRepository::findOneByLogin);
        if(oProperty.isPresent() && user.isPresent()) {
                Property property = oProperty.get();
                property.setState(0);
                return this.propertyRepository.save(property);
        } else {
            throw new ResourceException("Invalid action");
        }
    }
}
