package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.HomeBuildingApp;
import com.novacoders.homebuilding.domain.Rent;
import com.novacoders.homebuilding.repository.RentRepository;

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
 * Integration tests for the {@link RentResource} REST controller.
 */
@SpringBootTest(classes = HomeBuildingApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RentResourceIT {

    private static final Integer DEFAULT_DEPOSIT = 1;
    private static final Integer UPDATED_DEPOSIT = 2;

    @Autowired
    private RentRepository rentRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRentMockMvc;

    private Rent rent;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Rent createEntity(EntityManager em) {
        Rent rent = new Rent()
            .deposit(DEFAULT_DEPOSIT);
        return rent;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Rent createUpdatedEntity(EntityManager em) {
        Rent rent = new Rent()
            .deposit(UPDATED_DEPOSIT);
        return rent;
    }

    @BeforeEach
    public void initTest() {
        rent = createEntity(em);
    }


    @Transactional
    public void createRent() throws Exception {
        int databaseSizeBeforeCreate = rentRepository.findAll().size();
        // Create the Rent
        restRentMockMvc.perform(post("/api/rents")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(rent)))
            .andExpect(status().isCreated());

        // Validate the Rent in the database
        List<Rent> rentList = rentRepository.findAll();
        assertThat(rentList).hasSize(databaseSizeBeforeCreate + 1);
        Rent testRent = rentList.get(rentList.size() - 1);
        assertThat(testRent.getDeposit()).isEqualTo(DEFAULT_DEPOSIT);
    }


    @Transactional
    public void createRentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rentRepository.findAll().size();

        // Create the Rent with an existing ID
        rent.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRentMockMvc.perform(post("/api/rents")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(rent)))
            .andExpect(status().isBadRequest());

        // Validate the Rent in the database
        List<Rent> rentList = rentRepository.findAll();
        assertThat(rentList).hasSize(databaseSizeBeforeCreate);
    }



    @Transactional
    public void getAllRents() throws Exception {
        // Initialize the database
        rentRepository.saveAndFlush(rent);

        // Get all the rentList
        restRentMockMvc.perform(get("/api/rents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rent.getId().intValue())))
            .andExpect(jsonPath("$.[*].deposit").value(hasItem(DEFAULT_DEPOSIT)));
    }


    @Transactional
    public void getRent() throws Exception {
        // Initialize the database
        rentRepository.saveAndFlush(rent);

        // Get the rent
        restRentMockMvc.perform(get("/api/rents/{id}", rent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(rent.getId().intValue()))
            .andExpect(jsonPath("$.deposit").value(DEFAULT_DEPOSIT));
    }

    @Transactional
    public void getNonExistingRent() throws Exception {
        // Get the rent
        restRentMockMvc.perform(get("/api/rents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }


    @Transactional
    public void updateRent() throws Exception {
        // Initialize the database
        rentRepository.saveAndFlush(rent);

        int databaseSizeBeforeUpdate = rentRepository.findAll().size();

        // Update the rent
        Rent updatedRent = rentRepository.findById(rent.getId()).get();
        // Disconnect from session so that the updates on updatedRent are not directly saved in db
        em.detach(updatedRent);
        updatedRent
            .deposit(UPDATED_DEPOSIT);

        restRentMockMvc.perform(put("/api/rents")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRent)))
            .andExpect(status().isOk());

        // Validate the Rent in the database
        List<Rent> rentList = rentRepository.findAll();
        assertThat(rentList).hasSize(databaseSizeBeforeUpdate);
        Rent testRent = rentList.get(rentList.size() - 1);
        assertThat(testRent.getDeposit()).isEqualTo(UPDATED_DEPOSIT);
    }


    @Transactional
    public void updateNonExistingRent() throws Exception {
        int databaseSizeBeforeUpdate = rentRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRentMockMvc.perform(put("/api/rents")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(rent)))
            .andExpect(status().isBadRequest());

        // Validate the Rent in the database
        List<Rent> rentList = rentRepository.findAll();
        assertThat(rentList).hasSize(databaseSizeBeforeUpdate);
    }


    @Transactional
    public void deleteRent() throws Exception {
        // Initialize the database
        rentRepository.saveAndFlush(rent);

        int databaseSizeBeforeDelete = rentRepository.findAll().size();

        // Delete the rent
        restRentMockMvc.perform(delete("/api/rents/{id}", rent.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Rent> rentList = rentRepository.findAll();
        assertThat(rentList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
