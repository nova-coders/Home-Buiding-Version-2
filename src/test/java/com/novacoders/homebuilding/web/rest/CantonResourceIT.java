package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.HomeBuildingApp;
import com.novacoders.homebuilding.domain.Canton;
import com.novacoders.homebuilding.repository.CantonRepository;

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
 * Integration tests for the {@link CantonResource} REST controller.
 */
@SpringBootTest(classes = HomeBuildingApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CantonResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_STATE = false;
    private static final Boolean UPDATED_STATE = true;

    private static final ZonedDateTime DEFAULT_CREATION_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATION_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private CantonRepository cantonRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCantonMockMvc;

    private Canton canton;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Canton createEntity(EntityManager em) {
        Canton canton = new Canton()
            .name(DEFAULT_NAME)
            .state(DEFAULT_STATE)
            .creationDate(DEFAULT_CREATION_DATE);
        return canton;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Canton createUpdatedEntity(EntityManager em) {
        Canton canton = new Canton()
            .name(UPDATED_NAME)
            .state(UPDATED_STATE)
            .creationDate(UPDATED_CREATION_DATE);
        return canton;
    }

    @BeforeEach
    public void initTest() {
        canton = createEntity(em);
    }

    @Test
    @Transactional
    public void createCanton() throws Exception {
        int databaseSizeBeforeCreate = cantonRepository.findAll().size();
        // Create the Canton
        restCantonMockMvc.perform(post("/api/cantons")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(canton)))
            .andExpect(status().isCreated());

        // Validate the Canton in the database
        List<Canton> cantonList = cantonRepository.findAll();
        assertThat(cantonList).hasSize(databaseSizeBeforeCreate + 1);
        Canton testCanton = cantonList.get(cantonList.size() - 1);
        assertThat(testCanton.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCanton.isState()).isEqualTo(DEFAULT_STATE);
        assertThat(testCanton.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
    }

    @Test
    @Transactional
    public void createCantonWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cantonRepository.findAll().size();

        // Create the Canton with an existing ID
        canton.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCantonMockMvc.perform(post("/api/cantons")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(canton)))
            .andExpect(status().isBadRequest());

        // Validate the Canton in the database
        List<Canton> cantonList = cantonRepository.findAll();
        assertThat(cantonList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCantons() throws Exception {
        // Initialize the database
        cantonRepository.saveAndFlush(canton);

        // Get all the cantonList
        restCantonMockMvc.perform(get("/api/cantons?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(canton.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.booleanValue())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(sameInstant(DEFAULT_CREATION_DATE))));
    }
    
    @Test
    @Transactional
    public void getCanton() throws Exception {
        // Initialize the database
        cantonRepository.saveAndFlush(canton);

        // Get the canton
        restCantonMockMvc.perform(get("/api/cantons/{id}", canton.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(canton.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE.booleanValue()))
            .andExpect(jsonPath("$.creationDate").value(sameInstant(DEFAULT_CREATION_DATE)));
    }
    @Test
    @Transactional
    public void getNonExistingCanton() throws Exception {
        // Get the canton
        restCantonMockMvc.perform(get("/api/cantons/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCanton() throws Exception {
        // Initialize the database
        cantonRepository.saveAndFlush(canton);

        int databaseSizeBeforeUpdate = cantonRepository.findAll().size();

        // Update the canton
        Canton updatedCanton = cantonRepository.findById(canton.getId()).get();
        // Disconnect from session so that the updates on updatedCanton are not directly saved in db
        em.detach(updatedCanton);
        updatedCanton
            .name(UPDATED_NAME)
            .state(UPDATED_STATE)
            .creationDate(UPDATED_CREATION_DATE);

        restCantonMockMvc.perform(put("/api/cantons")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCanton)))
            .andExpect(status().isOk());

        // Validate the Canton in the database
        List<Canton> cantonList = cantonRepository.findAll();
        assertThat(cantonList).hasSize(databaseSizeBeforeUpdate);
        Canton testCanton = cantonList.get(cantonList.size() - 1);
        assertThat(testCanton.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCanton.isState()).isEqualTo(UPDATED_STATE);
        assertThat(testCanton.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingCanton() throws Exception {
        int databaseSizeBeforeUpdate = cantonRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCantonMockMvc.perform(put("/api/cantons")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(canton)))
            .andExpect(status().isBadRequest());

        // Validate the Canton in the database
        List<Canton> cantonList = cantonRepository.findAll();
        assertThat(cantonList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCanton() throws Exception {
        // Initialize the database
        cantonRepository.saveAndFlush(canton);

        int databaseSizeBeforeDelete = cantonRepository.findAll().size();

        // Delete the canton
        restCantonMockMvc.perform(delete("/api/cantons/{id}", canton.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Canton> cantonList = cantonRepository.findAll();
        assertThat(cantonList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
