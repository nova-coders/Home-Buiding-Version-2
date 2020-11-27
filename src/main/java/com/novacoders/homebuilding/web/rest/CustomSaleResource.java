package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.domain.Sale;
import com.novacoders.homebuilding.repository.SaleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * CustomSaleResource controller
 */
@RestController
@RequestMapping("/api/custom-sale-resource")
public class CustomSaleResource {

    private final Logger log = LoggerFactory.getLogger(CustomSaleResource.class);

    private final SaleRepository saleRepository;

    public CustomSaleResource(SaleRepository saleRepository){
        this.saleRepository = saleRepository;
    }

    /**
     *
     * @param propertyId
     * @return a boolean represent if the property is a sale or not
     */
    @GetMapping("/is-property-sale/{propertyId}")
    public boolean isPropertySale(@PathVariable long propertyId) {
        return saleRepository.existsSaleByProperty_Id(propertyId);
    }

}
