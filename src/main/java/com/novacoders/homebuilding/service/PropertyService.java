package com.novacoders.homebuilding.service;


import com.novacoders.homebuilding.domain.Property;
import com.novacoders.homebuilding.repository.PropertyRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.List;

@Service
@Transactional
public class PropertyService {
    public PropertyRepository propertyRepository;
    public PropertyService(PropertyRepository propertyRepository){
        this.propertyRepository = propertyRepository;
    }
    public List<Property> getAllProperty(){
        ZonedDateTime zonedDatetimeCurrent = ZonedDateTime.now();
        return this.propertyRepository.findAllWithCreationDateTimeBefore(zonedDatetimeCurrent);
    }

    public Property  seveProperty(Property property){
        return this.propertyRepository.save(property);
    }
}
