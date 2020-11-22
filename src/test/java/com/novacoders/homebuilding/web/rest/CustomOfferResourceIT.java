package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.HomeBuildingApp;
import com.novacoders.homebuilding.domain.Property;
import com.novacoders.homebuilding.repository.OfferRepository;
import com.novacoders.homebuilding.repository.PropertyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
/**
 * Test class for the CustomOfferResource REST controller.
 *
 * @see CustomOfferResource
 */
@SpringBootTest(classes = HomeBuildingApp.class)
public class CustomOfferResourceIT {

    private MockMvc restMockMvc;

    private final OfferRepository offerRepository;

    public CustomOfferResourceIT(OfferRepository offerRepository, PropertyRepository propertyRepository){
        this.offerRepository = offerRepository;
    }

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);

        CustomOfferResource customOfferResource = new CustomOfferResource(offerRepository);
        restMockMvc = MockMvcBuilders
            .standaloneSetup(customOfferResource)
            .build();
    }

    /**
     * Test getOfferByUser
     */
    @Test
    public void testGetOfferByUser() throws Exception {
        restMockMvc.perform(get("/api/custom-offer-resource/get-offer-by-user"))
            .andExpect(status().isOk());
    }
}
