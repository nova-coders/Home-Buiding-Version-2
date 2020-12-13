package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.HomeBuildingApp;
import com.novacoders.homebuilding.domain.PropertyImage;
import com.novacoders.homebuilding.repository.PropertyImageRepository;

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
 * Integration tests for the {@link PropertyImageResource} REST controller.
 */
@SpringBootTest(classes = HomeBuildingApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PropertyImageResourceIT {

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CREATION_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATION_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Boolean DEFAULT_STATE = false;
    private static final Boolean UPDATED_STATE = true;

    @Autowired
    private PropertyImageRepository propertyImageRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPropertyImageMockMvc;

    private PropertyImage propertyImage;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PropertyImage createEntity(EntityManager em) {
        PropertyImage propertyImage = new PropertyImage()
            .url(DEFAULT_URL)
            .creationDate(DEFAULT_CREATION_DATE)
            .state(DEFAULT_STATE);
        return propertyImage;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PropertyImage createUpdatedEntity(EntityManager em) {
        PropertyImage propertyImage = new PropertyImage()
            .url(UPDATED_URL)
            .creationDate(UPDATED_CREATION_DATE)
            .state(UPDATED_STATE);
        return propertyImage;
    }

    @BeforeEach
    public void initTest() {
        propertyImage = createEntity(em);
    }


    @Transactional
    public void createPropertyImage() throws Exception {
        int databaseSizeBeforeCreate = propertyImageRepository.findAll().size();
        // Create the PropertyImage
        restPropertyImageMockMvc.perform(post("/api/property-images")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(propertyImage)))
            .andExpect(status().isCreated());

        // Validate the PropertyImage in the database
        List<PropertyImage> propertyImageList = propertyImageRepository.findAll();
        assertThat(propertyImageList).hasSize(databaseSizeBeforeCreate + 1);
        PropertyImage testPropertyImage = propertyImageList.get(propertyImageList.size() - 1);
        assertThat(testPropertyImage.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testPropertyImage.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
        assertThat(testPropertyImage.isState()).isEqualTo(DEFAULT_STATE);
    }


    @Transactional
    public void createPropertyImageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = propertyImageRepository.findAll().size();

        // Create the PropertyImage with an existing ID
        propertyImage.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPropertyImageMockMvc.perform(post("/api/property-images")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(propertyImage)))
            .andExpect(status().isBadRequest());

        // Validate the PropertyImage in the database
        List<PropertyImage> propertyImageList = propertyImageRepository.findAll();
        assertThat(propertyImageList).hasSize(databaseSizeBeforeCreate);
    }



    @Transactional
    public void getAllPropertyImages() throws Exception {
        // Initialize the database
        propertyImageRepository.saveAndFlush(propertyImage);

        // Get all the propertyImageList
        restPropertyImageMockMvc.perform(get("/api/property-images?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(propertyImage.getId().intValue())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL)))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(sameInstant(DEFAULT_CREATION_DATE))))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.booleanValue())));
    }


    @Transactional
    public void getPropertyImage() throws Exception {
        // Initialize the database
        propertyImageRepository.saveAndFlush(propertyImage);

        // Get the propertyImage
        restPropertyImageMockMvc.perform(get("/api/property-images/{id}", propertyImage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(propertyImage.getId().intValue()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL))
            .andExpect(jsonPath("$.creationDate").value(sameInstant(DEFAULT_CREATION_DATE)))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE.booleanValue()));
    }

    @Transactional
    public void getNonExistingPropertyImage() throws Exception {
        // Get the propertyImage
        restPropertyImageMockMvc.perform(get("/api/property-images/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }


    @Transactional
    public void updatePropertyImage() throws Exception {
        // Initialize the database
        propertyImageRepository.saveAndFlush(propertyImage);

        int databaseSizeBeforeUpdate = propertyImageRepository.findAll().size();

        // Update the propertyImage
        PropertyImage updatedPropertyImage = propertyImageRepository.findById(propertyImage.getId()).get();
        // Disconnect from session so that the updates on updatedPropertyImage are not directly saved in db
        em.detach(updatedPropertyImage);
        updatedPropertyImage
            .url(UPDATED_URL)
            .creationDate(UPDATED_CREATION_DATE)
            .state(UPDATED_STATE);

        restPropertyImageMockMvc.perform(put("/api/property-images")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPropertyImage)))
            .andExpect(status().isOk());

        // Validate the PropertyImage in the database
        List<PropertyImage> propertyImageList = propertyImageRepository.findAll();
        assertThat(propertyImageList).hasSize(databaseSizeBeforeUpdate);
        PropertyImage testPropertyImage = propertyImageList.get(propertyImageList.size() - 1);
        assertThat(testPropertyImage.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testPropertyImage.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
        assertThat(testPropertyImage.isState()).isEqualTo(UPDATED_STATE);
    }


    @Transactional
    public void updateNonExistingPropertyImage() throws Exception {
        int databaseSizeBeforeUpdate = propertyImageRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPropertyImageMockMvc.perform(put("/api/property-images")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(propertyImage)))
            .andExpect(status().isBadRequest());

        // Validate the PropertyImage in the database
        List<PropertyImage> propertyImageList = propertyImageRepository.findAll();
        assertThat(propertyImageList).hasSize(databaseSizeBeforeUpdate);
    }


    @Transactional
    public void deletePropertyImage() throws Exception {
        // Initialize the database
        propertyImageRepository.saveAndFlush(propertyImage);

        int databaseSizeBeforeDelete = propertyImageRepository.findAll().size();

        // Delete the propertyImage
        restPropertyImageMockMvc.perform(delete("/api/property-images/{id}", propertyImage.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PropertyImage> propertyImageList = propertyImageRepository.findAll();
        assertThat(propertyImageList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
