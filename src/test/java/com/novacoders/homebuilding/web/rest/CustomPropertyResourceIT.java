package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.HomeBuildingApp;
import com.novacoders.homebuilding.repository.PropertyImageRepository;
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
 * Test class for the CustomPropertyResource REST controller.
 *
 * @see CustomPropertyResource
 */
@SpringBootTest(classes = HomeBuildingApp.class)
public class CustomPropertyResourceIT {

    private MockMvc restMockMvc;

    private final PropertyRepository propertyRepository;

    private final PropertyImageRepository propertyImageRepository;

    public CustomPropertyResourceIT(PropertyRepository propertyRepository, PropertyImageRepository propertyImageRepository){
        this.propertyRepository = propertyRepository;
        this.propertyImageRepository = propertyImageRepository;
    }

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);

        CustomPropertyResource customPropertyResource = new CustomPropertyResource(propertyRepository, propertyImageRepository);
        restMockMvc = MockMvcBuilders
            .standaloneSetup(customPropertyResource)
            .build();
    }

    /**
     * Test getPropertyBySaleId
     */
    @Test
    public void testGetPropertyBySaleId() throws Exception {
        restMockMvc.perform(get("/api/custom-property-resource/get-property-by-sale-id"))
            .andExpect(status().isOk());
    }
}
