package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.HomeBuildingApp;
import com.novacoders.homebuilding.domain.PropertyCategory;
import com.novacoders.homebuilding.repository.PropertyCategoryRepository;

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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PropertyCategoryResource} REST controller.
 */
@SpringBootTest(classes = HomeBuildingApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PropertyCategoryResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PROPERTY_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_PROPERTY_TYPE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_STATE = false;
    private static final Boolean UPDATED_STATE = true;

    @Autowired
    private PropertyCategoryRepository propertyCategoryRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPropertyCategoryMockMvc;

    private PropertyCategory propertyCategory;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PropertyCategory createEntity(EntityManager em) {
        PropertyCategory propertyCategory = new PropertyCategory()
            .name(DEFAULT_NAME)
            .propertyType(DEFAULT_PROPERTY_TYPE)
            .state(DEFAULT_STATE);
        return propertyCategory;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PropertyCategory createUpdatedEntity(EntityManager em) {
        PropertyCategory propertyCategory = new PropertyCategory()
            .name(UPDATED_NAME)
            .propertyType(UPDATED_PROPERTY_TYPE)
            .state(UPDATED_STATE);
        return propertyCategory;
    }

    @BeforeEach
    public void initTest() {
        propertyCategory = createEntity(em);
    }

    @Test
    @Transactional
    public void createPropertyCategory() throws Exception {
        int databaseSizeBeforeCreate = propertyCategoryRepository.findAll().size();
        // Create the PropertyCategory
        restPropertyCategoryMockMvc.perform(post("/api/property-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(propertyCategory)))
            .andExpect(status().isCreated());

        // Validate the PropertyCategory in the database
        List<PropertyCategory> propertyCategoryList = propertyCategoryRepository.findAll();
        assertThat(propertyCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        PropertyCategory testPropertyCategory = propertyCategoryList.get(propertyCategoryList.size() - 1);
        assertThat(testPropertyCategory.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPropertyCategory.getPropertyType()).isEqualTo(DEFAULT_PROPERTY_TYPE);
        assertThat(testPropertyCategory.isState()).isEqualTo(DEFAULT_STATE);
    }

    @Test
    @Transactional
    public void createPropertyCategoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = propertyCategoryRepository.findAll().size();

        // Create the PropertyCategory with an existing ID
        propertyCategory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPropertyCategoryMockMvc.perform(post("/api/property-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(propertyCategory)))
            .andExpect(status().isBadRequest());

        // Validate the PropertyCategory in the database
        List<PropertyCategory> propertyCategoryList = propertyCategoryRepository.findAll();
        assertThat(propertyCategoryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPropertyCategories() throws Exception {
        // Initialize the database
        propertyCategoryRepository.saveAndFlush(propertyCategory);

        // Get all the propertyCategoryList
        restPropertyCategoryMockMvc.perform(get("/api/property-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(propertyCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].propertyType").value(hasItem(DEFAULT_PROPERTY_TYPE)))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getPropertyCategory() throws Exception {
        // Initialize the database
        propertyCategoryRepository.saveAndFlush(propertyCategory);

        // Get the propertyCategory
        restPropertyCategoryMockMvc.perform(get("/api/property-categories/{id}", propertyCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(propertyCategory.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.propertyType").value(DEFAULT_PROPERTY_TYPE))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingPropertyCategory() throws Exception {
        // Get the propertyCategory
        restPropertyCategoryMockMvc.perform(get("/api/property-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePropertyCategory() throws Exception {
        // Initialize the database
        propertyCategoryRepository.saveAndFlush(propertyCategory);

        int databaseSizeBeforeUpdate = propertyCategoryRepository.findAll().size();

        // Update the propertyCategory
        PropertyCategory updatedPropertyCategory = propertyCategoryRepository.findById(propertyCategory.getId()).get();
        // Disconnect from session so that the updates on updatedPropertyCategory are not directly saved in db
        em.detach(updatedPropertyCategory);
        updatedPropertyCategory
            .name(UPDATED_NAME)
            .propertyType(UPDATED_PROPERTY_TYPE)
            .state(UPDATED_STATE);

        restPropertyCategoryMockMvc.perform(put("/api/property-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPropertyCategory)))
            .andExpect(status().isOk());

        // Validate the PropertyCategory in the database
        List<PropertyCategory> propertyCategoryList = propertyCategoryRepository.findAll();
        assertThat(propertyCategoryList).hasSize(databaseSizeBeforeUpdate);
        PropertyCategory testPropertyCategory = propertyCategoryList.get(propertyCategoryList.size() - 1);
        assertThat(testPropertyCategory.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPropertyCategory.getPropertyType()).isEqualTo(UPDATED_PROPERTY_TYPE);
        assertThat(testPropertyCategory.isState()).isEqualTo(UPDATED_STATE);
    }

    @Test
    @Transactional
    public void updateNonExistingPropertyCategory() throws Exception {
        int databaseSizeBeforeUpdate = propertyCategoryRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPropertyCategoryMockMvc.perform(put("/api/property-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(propertyCategory)))
            .andExpect(status().isBadRequest());

        // Validate the PropertyCategory in the database
        List<PropertyCategory> propertyCategoryList = propertyCategoryRepository.findAll();
        assertThat(propertyCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePropertyCategory() throws Exception {
        // Initialize the database
        propertyCategoryRepository.saveAndFlush(propertyCategory);

        int databaseSizeBeforeDelete = propertyCategoryRepository.findAll().size();

        // Delete the propertyCategory
        restPropertyCategoryMockMvc.perform(delete("/api/property-categories/{id}", propertyCategory.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PropertyCategory> propertyCategoryList = propertyCategoryRepository.findAll();
        assertThat(propertyCategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
