package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.HomeBuildingApp;
import com.novacoders.homebuilding.domain.MoneyType;
import com.novacoders.homebuilding.repository.MoneyTypeRepository;

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
 * Integration tests for the {@link MoneyTypeResource} REST controller.
 */
@SpringBootTest(classes = HomeBuildingApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class MoneyTypeResourceIT {

    private static final String DEFAULT_ICON = "AAAAAAAAAA";
    private static final String UPDATED_ICON = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_STATE = false;
    private static final Boolean UPDATED_STATE = true;

    @Autowired
    private MoneyTypeRepository moneyTypeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMoneyTypeMockMvc;

    private MoneyType moneyType;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MoneyType createEntity(EntityManager em) {
        MoneyType moneyType = new MoneyType()
            .icon(DEFAULT_ICON)
            .name(DEFAULT_NAME)
            .state(DEFAULT_STATE);
        return moneyType;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MoneyType createUpdatedEntity(EntityManager em) {
        MoneyType moneyType = new MoneyType()
            .icon(UPDATED_ICON)
            .name(UPDATED_NAME)
            .state(UPDATED_STATE);
        return moneyType;
    }

    @BeforeEach
    public void initTest() {
        moneyType = createEntity(em);
    }


    @Transactional
    public void createMoneyType() throws Exception {
        int databaseSizeBeforeCreate = moneyTypeRepository.findAll().size();
        // Create the MoneyType
        restMoneyTypeMockMvc.perform(post("/api/money-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(moneyType)))
            .andExpect(status().isCreated());

        // Validate the MoneyType in the database
        List<MoneyType> moneyTypeList = moneyTypeRepository.findAll();
        assertThat(moneyTypeList).hasSize(databaseSizeBeforeCreate + 1);
        MoneyType testMoneyType = moneyTypeList.get(moneyTypeList.size() - 1);
        assertThat(testMoneyType.getIcon()).isEqualTo(DEFAULT_ICON);
        assertThat(testMoneyType.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testMoneyType.isState()).isEqualTo(DEFAULT_STATE);
    }


    @Transactional
    public void createMoneyTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = moneyTypeRepository.findAll().size();

        // Create the MoneyType with an existing ID
        moneyType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMoneyTypeMockMvc.perform(post("/api/money-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(moneyType)))
            .andExpect(status().isBadRequest());

        // Validate the MoneyType in the database
        List<MoneyType> moneyTypeList = moneyTypeRepository.findAll();
        assertThat(moneyTypeList).hasSize(databaseSizeBeforeCreate);
    }



    @Transactional
    public void getAllMoneyTypes() throws Exception {
        // Initialize the database
        moneyTypeRepository.saveAndFlush(moneyType);

        // Get all the moneyTypeList
        restMoneyTypeMockMvc.perform(get("/api/money-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(moneyType.getId().intValue())))
            .andExpect(jsonPath("$.[*].icon").value(hasItem(DEFAULT_ICON)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.booleanValue())));
    }


    @Transactional
    public void getMoneyType() throws Exception {
        // Initialize the database
        moneyTypeRepository.saveAndFlush(moneyType);

        // Get the moneyType
        restMoneyTypeMockMvc.perform(get("/api/money-types/{id}", moneyType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(moneyType.getId().intValue()))
            .andExpect(jsonPath("$.icon").value(DEFAULT_ICON))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE.booleanValue()));
    }

    @Transactional
    public void getNonExistingMoneyType() throws Exception {
        // Get the moneyType
        restMoneyTypeMockMvc.perform(get("/api/money-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }


    @Transactional
    public void updateMoneyType() throws Exception {
        // Initialize the database
        moneyTypeRepository.saveAndFlush(moneyType);

        int databaseSizeBeforeUpdate = moneyTypeRepository.findAll().size();

        // Update the moneyType
        MoneyType updatedMoneyType = moneyTypeRepository.findById(moneyType.getId()).get();
        // Disconnect from session so that the updates on updatedMoneyType are not directly saved in db
        em.detach(updatedMoneyType);
        updatedMoneyType
            .icon(UPDATED_ICON)
            .name(UPDATED_NAME)
            .state(UPDATED_STATE);

        restMoneyTypeMockMvc.perform(put("/api/money-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMoneyType)))
            .andExpect(status().isOk());

        // Validate the MoneyType in the database
        List<MoneyType> moneyTypeList = moneyTypeRepository.findAll();
        assertThat(moneyTypeList).hasSize(databaseSizeBeforeUpdate);
        MoneyType testMoneyType = moneyTypeList.get(moneyTypeList.size() - 1);
        assertThat(testMoneyType.getIcon()).isEqualTo(UPDATED_ICON);
        assertThat(testMoneyType.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testMoneyType.isState()).isEqualTo(UPDATED_STATE);
    }


    @Transactional
    public void updateNonExistingMoneyType() throws Exception {
        int databaseSizeBeforeUpdate = moneyTypeRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMoneyTypeMockMvc.perform(put("/api/money-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(moneyType)))
            .andExpect(status().isBadRequest());

        // Validate the MoneyType in the database
        List<MoneyType> moneyTypeList = moneyTypeRepository.findAll();
        assertThat(moneyTypeList).hasSize(databaseSizeBeforeUpdate);
    }


    @Transactional
    public void deleteMoneyType() throws Exception {
        // Initialize the database
        moneyTypeRepository.saveAndFlush(moneyType);

        int databaseSizeBeforeDelete = moneyTypeRepository.findAll().size();

        // Delete the moneyType
        restMoneyTypeMockMvc.perform(delete("/api/money-types/{id}", moneyType.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MoneyType> moneyTypeList = moneyTypeRepository.findAll();
        assertThat(moneyTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
