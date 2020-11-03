package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.HomeBuildingApp;
import com.novacoders.homebuilding.domain.ProfessionalProfileUser;
import com.novacoders.homebuilding.repository.ProfessionalProfileUserRepository;

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
 * Integration tests for the {@link ProfessionalProfileUserResource} REST controller.
 */
@SpringBootTest(classes = HomeBuildingApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ProfessionalProfileUserResourceIT {

    private static final Integer DEFAULT_PROFESIONAL_TYPE = 1;
    private static final Integer UPDATED_PROFESIONAL_TYPE = 2;

    private static final Double DEFAULT_PRICE_PER_HOUR = 1D;
    private static final Double UPDATED_PRICE_PER_HOUR = 2D;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CREATION_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATION_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Boolean DEFAULT_STATE = false;
    private static final Boolean UPDATED_STATE = true;

    @Autowired
    private ProfessionalProfileUserRepository professionalProfileUserRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProfessionalProfileUserMockMvc;

    private ProfessionalProfileUser professionalProfileUser;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProfessionalProfileUser createEntity(EntityManager em) {
        ProfessionalProfileUser professionalProfileUser = new ProfessionalProfileUser()
            .profesionalType(DEFAULT_PROFESIONAL_TYPE)
            .pricePerHour(DEFAULT_PRICE_PER_HOUR)
            .description(DEFAULT_DESCRIPTION)
            .creationDate(DEFAULT_CREATION_DATE)
            .state(DEFAULT_STATE);
        return professionalProfileUser;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProfessionalProfileUser createUpdatedEntity(EntityManager em) {
        ProfessionalProfileUser professionalProfileUser = new ProfessionalProfileUser()
            .profesionalType(UPDATED_PROFESIONAL_TYPE)
            .pricePerHour(UPDATED_PRICE_PER_HOUR)
            .description(UPDATED_DESCRIPTION)
            .creationDate(UPDATED_CREATION_DATE)
            .state(UPDATED_STATE);
        return professionalProfileUser;
    }

    @BeforeEach
    public void initTest() {
        professionalProfileUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createProfessionalProfileUser() throws Exception {
        int databaseSizeBeforeCreate = professionalProfileUserRepository.findAll().size();
        // Create the ProfessionalProfileUser
        restProfessionalProfileUserMockMvc.perform(post("/api/professional-profile-users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(professionalProfileUser)))
            .andExpect(status().isCreated());

        // Validate the ProfessionalProfileUser in the database
        List<ProfessionalProfileUser> professionalProfileUserList = professionalProfileUserRepository.findAll();
        assertThat(professionalProfileUserList).hasSize(databaseSizeBeforeCreate + 1);
        ProfessionalProfileUser testProfessionalProfileUser = professionalProfileUserList.get(professionalProfileUserList.size() - 1);
        assertThat(testProfessionalProfileUser.getProfesionalType()).isEqualTo(DEFAULT_PROFESIONAL_TYPE);
        assertThat(testProfessionalProfileUser.getPricePerHour()).isEqualTo(DEFAULT_PRICE_PER_HOUR);
        assertThat(testProfessionalProfileUser.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testProfessionalProfileUser.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
        assertThat(testProfessionalProfileUser.isState()).isEqualTo(DEFAULT_STATE);
    }

    @Test
    @Transactional
    public void createProfessionalProfileUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = professionalProfileUserRepository.findAll().size();

        // Create the ProfessionalProfileUser with an existing ID
        professionalProfileUser.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProfessionalProfileUserMockMvc.perform(post("/api/professional-profile-users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(professionalProfileUser)))
            .andExpect(status().isBadRequest());

        // Validate the ProfessionalProfileUser in the database
        List<ProfessionalProfileUser> professionalProfileUserList = professionalProfileUserRepository.findAll();
        assertThat(professionalProfileUserList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProfessionalProfileUsers() throws Exception {
        // Initialize the database
        professionalProfileUserRepository.saveAndFlush(professionalProfileUser);

        // Get all the professionalProfileUserList
        restProfessionalProfileUserMockMvc.perform(get("/api/professional-profile-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(professionalProfileUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].profesionalType").value(hasItem(DEFAULT_PROFESIONAL_TYPE)))
            .andExpect(jsonPath("$.[*].pricePerHour").value(hasItem(DEFAULT_PRICE_PER_HOUR.doubleValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(sameInstant(DEFAULT_CREATION_DATE))))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getProfessionalProfileUser() throws Exception {
        // Initialize the database
        professionalProfileUserRepository.saveAndFlush(professionalProfileUser);

        // Get the professionalProfileUser
        restProfessionalProfileUserMockMvc.perform(get("/api/professional-profile-users/{id}", professionalProfileUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(professionalProfileUser.getId().intValue()))
            .andExpect(jsonPath("$.profesionalType").value(DEFAULT_PROFESIONAL_TYPE))
            .andExpect(jsonPath("$.pricePerHour").value(DEFAULT_PRICE_PER_HOUR.doubleValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.creationDate").value(sameInstant(DEFAULT_CREATION_DATE)))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingProfessionalProfileUser() throws Exception {
        // Get the professionalProfileUser
        restProfessionalProfileUserMockMvc.perform(get("/api/professional-profile-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProfessionalProfileUser() throws Exception {
        // Initialize the database
        professionalProfileUserRepository.saveAndFlush(professionalProfileUser);

        int databaseSizeBeforeUpdate = professionalProfileUserRepository.findAll().size();

        // Update the professionalProfileUser
        ProfessionalProfileUser updatedProfessionalProfileUser = professionalProfileUserRepository.findById(professionalProfileUser.getId()).get();
        // Disconnect from session so that the updates on updatedProfessionalProfileUser are not directly saved in db
        em.detach(updatedProfessionalProfileUser);
        updatedProfessionalProfileUser
            .profesionalType(UPDATED_PROFESIONAL_TYPE)
            .pricePerHour(UPDATED_PRICE_PER_HOUR)
            .description(UPDATED_DESCRIPTION)
            .creationDate(UPDATED_CREATION_DATE)
            .state(UPDATED_STATE);

        restProfessionalProfileUserMockMvc.perform(put("/api/professional-profile-users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProfessionalProfileUser)))
            .andExpect(status().isOk());

        // Validate the ProfessionalProfileUser in the database
        List<ProfessionalProfileUser> professionalProfileUserList = professionalProfileUserRepository.findAll();
        assertThat(professionalProfileUserList).hasSize(databaseSizeBeforeUpdate);
        ProfessionalProfileUser testProfessionalProfileUser = professionalProfileUserList.get(professionalProfileUserList.size() - 1);
        assertThat(testProfessionalProfileUser.getProfesionalType()).isEqualTo(UPDATED_PROFESIONAL_TYPE);
        assertThat(testProfessionalProfileUser.getPricePerHour()).isEqualTo(UPDATED_PRICE_PER_HOUR);
        assertThat(testProfessionalProfileUser.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testProfessionalProfileUser.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
        assertThat(testProfessionalProfileUser.isState()).isEqualTo(UPDATED_STATE);
    }

    @Test
    @Transactional
    public void updateNonExistingProfessionalProfileUser() throws Exception {
        int databaseSizeBeforeUpdate = professionalProfileUserRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProfessionalProfileUserMockMvc.perform(put("/api/professional-profile-users")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(professionalProfileUser)))
            .andExpect(status().isBadRequest());

        // Validate the ProfessionalProfileUser in the database
        List<ProfessionalProfileUser> professionalProfileUserList = professionalProfileUserRepository.findAll();
        assertThat(professionalProfileUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProfessionalProfileUser() throws Exception {
        // Initialize the database
        professionalProfileUserRepository.saveAndFlush(professionalProfileUser);

        int databaseSizeBeforeDelete = professionalProfileUserRepository.findAll().size();

        // Delete the professionalProfileUser
        restProfessionalProfileUserMockMvc.perform(delete("/api/professional-profile-users/{id}", professionalProfileUser.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProfessionalProfileUser> professionalProfileUserList = professionalProfileUserRepository.findAll();
        assertThat(professionalProfileUserList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
