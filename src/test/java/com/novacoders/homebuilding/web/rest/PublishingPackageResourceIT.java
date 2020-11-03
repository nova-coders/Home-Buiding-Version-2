package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.HomeBuildingApp;
import com.novacoders.homebuilding.domain.PublishingPackage;
import com.novacoders.homebuilding.repository.PublishingPackageRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
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
 * Integration tests for the {@link PublishingPackageResource} REST controller.
 */
@SpringBootTest(classes = HomeBuildingApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PublishingPackageResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Double DEFAULT_PRICE = 1D;
    private static final Double UPDATED_PRICE = 2D;

    private static final Integer DEFAULT_CANT_PROPERTY_SALE = 1;
    private static final Integer UPDATED_CANT_PROPERTY_SALE = 2;

    private static final Integer DEFAULT_CANT_PROPERTY_RENT = 1;
    private static final Integer UPDATED_CANT_PROPERTY_RENT = 2;

    private static final Integer DEFAULT_CANT_DAYS = 1;
    private static final Integer UPDATED_CANT_DAYS = 2;

    private static final Boolean DEFAULT_PROFESSIONAL = false;
    private static final Boolean UPDATED_PROFESSIONAL = true;

    private static final ZonedDateTime DEFAULT_CREATION_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATION_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Integer DEFAULT_TYPE = 1;
    private static final Integer UPDATED_TYPE = 2;

    private static final Boolean DEFAULT_STATE = false;
    private static final Boolean UPDATED_STATE = true;

    @Autowired
    private PublishingPackageRepository publishingPackageRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPublishingPackageMockMvc;

    private PublishingPackage publishingPackage;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PublishingPackage createEntity(EntityManager em) {
        PublishingPackage publishingPackage = new PublishingPackage()
            .name(DEFAULT_NAME)
            .price(DEFAULT_PRICE)
            .cantPropertySale(DEFAULT_CANT_PROPERTY_SALE)
            .cantPropertyRent(DEFAULT_CANT_PROPERTY_RENT)
            .cantDays(DEFAULT_CANT_DAYS)
            .professional(DEFAULT_PROFESSIONAL)
            .creationDate(DEFAULT_CREATION_DATE)
            .type(DEFAULT_TYPE)
            .state(DEFAULT_STATE);
        return publishingPackage;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PublishingPackage createUpdatedEntity(EntityManager em) {
        PublishingPackage publishingPackage = new PublishingPackage()
            .name(UPDATED_NAME)
            .price(UPDATED_PRICE)
            .cantPropertySale(UPDATED_CANT_PROPERTY_SALE)
            .cantPropertyRent(UPDATED_CANT_PROPERTY_RENT)
            .cantDays(UPDATED_CANT_DAYS)
            .professional(UPDATED_PROFESSIONAL)
            .creationDate(UPDATED_CREATION_DATE)
            .type(UPDATED_TYPE)
            .state(UPDATED_STATE);
        return publishingPackage;
    }

    @BeforeEach
    public void initTest() {
        publishingPackage = createEntity(em);
    }

    @Test
    @Transactional
    public void createPublishingPackage() throws Exception {
        int databaseSizeBeforeCreate = publishingPackageRepository.findAll().size();
        // Create the PublishingPackage
        restPublishingPackageMockMvc.perform(post("/api/publishing-packages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(publishingPackage)))
            .andExpect(status().isCreated());

        // Validate the PublishingPackage in the database
        List<PublishingPackage> publishingPackageList = publishingPackageRepository.findAll();
        assertThat(publishingPackageList).hasSize(databaseSizeBeforeCreate + 1);
        PublishingPackage testPublishingPackage = publishingPackageList.get(publishingPackageList.size() - 1);
        assertThat(testPublishingPackage.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPublishingPackage.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testPublishingPackage.getCantPropertySale()).isEqualTo(DEFAULT_CANT_PROPERTY_SALE);
        assertThat(testPublishingPackage.getCantPropertyRent()).isEqualTo(DEFAULT_CANT_PROPERTY_RENT);
        assertThat(testPublishingPackage.getCantDays()).isEqualTo(DEFAULT_CANT_DAYS);
        assertThat(testPublishingPackage.isProfessional()).isEqualTo(DEFAULT_PROFESSIONAL);
        assertThat(testPublishingPackage.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
        assertThat(testPublishingPackage.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testPublishingPackage.isState()).isEqualTo(DEFAULT_STATE);
    }

    @Test
    @Transactional
    public void createPublishingPackageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = publishingPackageRepository.findAll().size();

        // Create the PublishingPackage with an existing ID
        publishingPackage.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPublishingPackageMockMvc.perform(post("/api/publishing-packages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(publishingPackage)))
            .andExpect(status().isBadRequest());

        // Validate the PublishingPackage in the database
        List<PublishingPackage> publishingPackageList = publishingPackageRepository.findAll();
        assertThat(publishingPackageList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPublishingPackages() throws Exception {
        // Initialize the database
        publishingPackageRepository.saveAndFlush(publishingPackage);

        // Get all the publishingPackageList
        restPublishingPackageMockMvc.perform(get("/api/publishing-packages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(publishingPackage.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].cantPropertySale").value(hasItem(DEFAULT_CANT_PROPERTY_SALE)))
            .andExpect(jsonPath("$.[*].cantPropertyRent").value(hasItem(DEFAULT_CANT_PROPERTY_RENT)))
            .andExpect(jsonPath("$.[*].cantDays").value(hasItem(DEFAULT_CANT_DAYS)))
            .andExpect(jsonPath("$.[*].professional").value(hasItem(DEFAULT_PROFESSIONAL.booleanValue())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(sameInstant(DEFAULT_CREATION_DATE))))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getPublishingPackage() throws Exception {
        // Initialize the database
        publishingPackageRepository.saveAndFlush(publishingPackage);

        // Get the publishingPackage
        restPublishingPackageMockMvc.perform(get("/api/publishing-packages/{id}", publishingPackage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(publishingPackage.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()))
            .andExpect(jsonPath("$.cantPropertySale").value(DEFAULT_CANT_PROPERTY_SALE))
            .andExpect(jsonPath("$.cantPropertyRent").value(DEFAULT_CANT_PROPERTY_RENT))
            .andExpect(jsonPath("$.cantDays").value(DEFAULT_CANT_DAYS))
            .andExpect(jsonPath("$.professional").value(DEFAULT_PROFESSIONAL.booleanValue()))
            .andExpect(jsonPath("$.creationDate").value(sameInstant(DEFAULT_CREATION_DATE)))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingPublishingPackage() throws Exception {
        // Get the publishingPackage
        restPublishingPackageMockMvc.perform(get("/api/publishing-packages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePublishingPackage() throws Exception {
        // Initialize the database
        publishingPackageRepository.saveAndFlush(publishingPackage);

        int databaseSizeBeforeUpdate = publishingPackageRepository.findAll().size();

        // Update the publishingPackage
        PublishingPackage updatedPublishingPackage = publishingPackageRepository.findById(publishingPackage.getId()).get();
        // Disconnect from session so that the updates on updatedPublishingPackage are not directly saved in db
        em.detach(updatedPublishingPackage);
        updatedPublishingPackage
            .name(UPDATED_NAME)
            .price(UPDATED_PRICE)
            .cantPropertySale(UPDATED_CANT_PROPERTY_SALE)
            .cantPropertyRent(UPDATED_CANT_PROPERTY_RENT)
            .cantDays(UPDATED_CANT_DAYS)
            .professional(UPDATED_PROFESSIONAL)
            .creationDate(UPDATED_CREATION_DATE)
            .type(UPDATED_TYPE)
            .state(UPDATED_STATE);

        restPublishingPackageMockMvc.perform(put("/api/publishing-packages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPublishingPackage)))
            .andExpect(status().isOk());

        // Validate the PublishingPackage in the database
        List<PublishingPackage> publishingPackageList = publishingPackageRepository.findAll();
        assertThat(publishingPackageList).hasSize(databaseSizeBeforeUpdate);
        PublishingPackage testPublishingPackage = publishingPackageList.get(publishingPackageList.size() - 1);
        assertThat(testPublishingPackage.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPublishingPackage.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testPublishingPackage.getCantPropertySale()).isEqualTo(UPDATED_CANT_PROPERTY_SALE);
        assertThat(testPublishingPackage.getCantPropertyRent()).isEqualTo(UPDATED_CANT_PROPERTY_RENT);
        assertThat(testPublishingPackage.getCantDays()).isEqualTo(UPDATED_CANT_DAYS);
        assertThat(testPublishingPackage.isProfessional()).isEqualTo(UPDATED_PROFESSIONAL);
        assertThat(testPublishingPackage.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
        assertThat(testPublishingPackage.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testPublishingPackage.isState()).isEqualTo(UPDATED_STATE);
    }

    @Test
    @Transactional
    public void updateNonExistingPublishingPackage() throws Exception {
        int databaseSizeBeforeUpdate = publishingPackageRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPublishingPackageMockMvc.perform(put("/api/publishing-packages")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(publishingPackage)))
            .andExpect(status().isBadRequest());

        // Validate the PublishingPackage in the database
        List<PublishingPackage> publishingPackageList = publishingPackageRepository.findAll();
        assertThat(publishingPackageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePublishingPackage() throws Exception {
        // Initialize the database
        publishingPackageRepository.saveAndFlush(publishingPackage);

        int databaseSizeBeforeDelete = publishingPackageRepository.findAll().size();

        // Delete the publishingPackage
        restPublishingPackageMockMvc.perform(delete("/api/publishing-packages/{id}", publishingPackage.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PublishingPackage> publishingPackageList = publishingPackageRepository.findAll();
        assertThat(publishingPackageList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
