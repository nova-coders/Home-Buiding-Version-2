package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.HomeBuildingApp;
import com.novacoders.homebuilding.domain.Sale;
import com.novacoders.homebuilding.repository.SaleRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.novacoders.homebuilding.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link SaleResource} REST controller.
 */
@SpringBootTest(classes = HomeBuildingApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class SaleResourceIT {

    private static final ZonedDateTime DEFAULT_FINAL_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FINAL_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_CADASTRAL_PLAN = "AAAAAAAAAA";
    private static final String UPDATED_CADASTRAL_PLAN = "BBBBBBBBBB";

    private static final String DEFAULT_REGISTRY_STUDY = "AAAAAAAAAA";
    private static final String UPDATED_REGISTRY_STUDY = "BBBBBBBBBB";

    private static final Integer DEFAULT_PROPERTY_ID = 1;
    private static final Integer UPDATED_PROPERTY_ID = 2;

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSaleMockMvc;

    private Sale sale;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Sale createEntity(EntityManager em) {
        Sale sale = new Sale()
            .finalDate(DEFAULT_FINAL_DATE)
            .cadastralPlan(DEFAULT_CADASTRAL_PLAN)
            .registryStudy(DEFAULT_REGISTRY_STUDY)
            .propertyId(DEFAULT_PROPERTY_ID);
        return sale;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Sale createUpdatedEntity(EntityManager em) {
        Sale sale = new Sale()
            .finalDate(UPDATED_FINAL_DATE)
            .cadastralPlan(UPDATED_CADASTRAL_PLAN)
            .registryStudy(UPDATED_REGISTRY_STUDY)
            .propertyId(UPDATED_PROPERTY_ID);
        return sale;
    }

    @BeforeEach
    public void initTest() {
        sale = createEntity(em);
    }


    @Transactional
    public void createSale() throws Exception {
        int databaseSizeBeforeCreate = saleRepository.findAll().size();
        // Create the Sale
        restSaleMockMvc.perform(post("/api/sales")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sale)))
            .andExpect(status().isCreated());

        // Validate the Sale in the database
        List<Sale> saleList = saleRepository.findAll();
        assertThat(saleList).hasSize(databaseSizeBeforeCreate + 1);
        Sale testSale = saleList.get(saleList.size() - 1);
        assertThat(testSale.getFinalDate()).isEqualTo(DEFAULT_FINAL_DATE);
        assertThat(testSale.getCadastralPlan()).isEqualTo(DEFAULT_CADASTRAL_PLAN);
        assertThat(testSale.getRegistryStudy()).isEqualTo(DEFAULT_REGISTRY_STUDY);
        assertThat(testSale.getPropertyId()).isEqualTo(DEFAULT_PROPERTY_ID);
    }


    @Transactional
    public void createSaleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = saleRepository.findAll().size();

        // Create the Sale with an existing ID
        sale.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSaleMockMvc.perform(post("/api/sales")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sale)))
            .andExpect(status().isBadRequest());

        // Validate the Sale in the database
        List<Sale> saleList = saleRepository.findAll();
        assertThat(saleList).hasSize(databaseSizeBeforeCreate);
    }



    @Transactional
    public void getAllSales() throws Exception {
        // Initialize the database
        saleRepository.saveAndFlush(sale);

        // Get all the saleList
        restSaleMockMvc.perform(get("/api/sales?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sale.getId().intValue())))
            .andExpect(jsonPath("$.[*].finalDate").value(hasItem(sameInstant(DEFAULT_FINAL_DATE))))
            .andExpect(jsonPath("$.[*].cadastralPlan").value(hasItem(DEFAULT_CADASTRAL_PLAN.toString())))
            .andExpect(jsonPath("$.[*].registryStudy").value(hasItem(DEFAULT_REGISTRY_STUDY.toString())))
            .andExpect(jsonPath("$.[*].propertyId").value(hasItem(DEFAULT_PROPERTY_ID)));
    }


    @Transactional
    public void getSale() throws Exception {
        // Initialize the database
        saleRepository.saveAndFlush(sale);

        // Get the sale
        restSaleMockMvc.perform(get("/api/sales/{id}", sale.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(sale.getId().intValue()))
            .andExpect(jsonPath("$.finalDate").value(sameInstant(DEFAULT_FINAL_DATE)))
            .andExpect(jsonPath("$.cadastralPlan").value(DEFAULT_CADASTRAL_PLAN.toString()))
            .andExpect(jsonPath("$.registryStudy").value(DEFAULT_REGISTRY_STUDY.toString()))
            .andExpect(jsonPath("$.propertyId").value(DEFAULT_PROPERTY_ID));
    }

    @Transactional
    public void getNonExistingSale() throws Exception {
        // Get the sale
        restSaleMockMvc.perform(get("/api/sales/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }


    @Transactional
    public void updateSale() throws Exception {
        // Initialize the database
        saleRepository.saveAndFlush(sale);

        int databaseSizeBeforeUpdate = saleRepository.findAll().size();

        // Update the sale
        Sale updatedSale = saleRepository.findById(sale.getId()).get();
        // Disconnect from session so that the updates on updatedSale are not directly saved in db
        em.detach(updatedSale);
        updatedSale
            .finalDate(UPDATED_FINAL_DATE)
            .cadastralPlan(UPDATED_CADASTRAL_PLAN)
            .registryStudy(UPDATED_REGISTRY_STUDY)
            .propertyId(UPDATED_PROPERTY_ID);

        restSaleMockMvc.perform(put("/api/sales")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSale)))
            .andExpect(status().isOk());

        // Validate the Sale in the database
        List<Sale> saleList = saleRepository.findAll();
        assertThat(saleList).hasSize(databaseSizeBeforeUpdate);
        Sale testSale = saleList.get(saleList.size() - 1);
        assertThat(testSale.getFinalDate()).isEqualTo(UPDATED_FINAL_DATE);
        assertThat(testSale.getCadastralPlan()).isEqualTo(UPDATED_CADASTRAL_PLAN);
        assertThat(testSale.getRegistryStudy()).isEqualTo(UPDATED_REGISTRY_STUDY);
        assertThat(testSale.getPropertyId()).isEqualTo(UPDATED_PROPERTY_ID);
    }


    @Transactional
    public void updateNonExistingSale() throws Exception {
        int databaseSizeBeforeUpdate = saleRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSaleMockMvc.perform(put("/api/sales")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sale)))
            .andExpect(status().isBadRequest());

        // Validate the Sale in the database
        List<Sale> saleList = saleRepository.findAll();
        assertThat(saleList).hasSize(databaseSizeBeforeUpdate);
    }


    @Transactional
    public void deleteSale() throws Exception {
        // Initialize the database
        saleRepository.saveAndFlush(sale);

        int databaseSizeBeforeDelete = saleRepository.findAll().size();

        // Delete the sale
        restSaleMockMvc.perform(delete("/api/sales/{id}", sale.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Sale> saleList = saleRepository.findAll();
        assertThat(saleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
