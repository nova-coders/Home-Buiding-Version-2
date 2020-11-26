package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.HomeBuildingApp;
import com.novacoders.homebuilding.repository.SaleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
/**
 * Test class for the CustomSaleResource REST controller.
 *
 * @see CustomSaleResource
 */
@SpringBootTest(classes = HomeBuildingApp.class)
public class CustomSaleResourceIT {

    private MockMvc restMockMvc;

    private final SaleRepository saleRepository;

    public CustomSaleResourceIT(SaleRepository saleRepository){
        this.saleRepository = saleRepository;
    }

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);

        CustomSaleResource customSaleResource = new CustomSaleResource(saleRepository);
        restMockMvc = MockMvcBuilders
            .standaloneSetup(customSaleResource)
            .build();
    }

    /**
     * Test isPropertySale
     */
    @Test
    public void testIsPropertySale() throws Exception {
        restMockMvc.perform(get("/api/custom-sale-resource/is-property-sale"))
            .andExpect(status().isOk());
    }
}
