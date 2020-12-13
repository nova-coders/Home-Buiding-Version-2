package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.HomeBuildingApp;
import com.novacoders.homebuilding.domain.SupportTicket;
import com.novacoders.homebuilding.repository.SupportTicketRepository;

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
 * Integration tests for the {@link SupportTicketResource} REST controller.
 */
@SpringBootTest(classes = HomeBuildingApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class SupportTicketResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_MESSAGE = "AAAAAAAAAA";
    private static final String UPDATED_MESSAGE = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CREATION_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATION_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Boolean DEFAULT_STATE = false;
    private static final Boolean UPDATED_STATE = true;

    @Autowired
    private SupportTicketRepository supportTicketRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSupportTicketMockMvc;

    private SupportTicket supportTicket;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SupportTicket createEntity(EntityManager em) {
        SupportTicket supportTicket = new SupportTicket()
            .title(DEFAULT_TITLE)
            .message(DEFAULT_MESSAGE)
            .creationDate(DEFAULT_CREATION_DATE)
            .state(DEFAULT_STATE);
        return supportTicket;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SupportTicket createUpdatedEntity(EntityManager em) {
        SupportTicket supportTicket = new SupportTicket()
            .title(UPDATED_TITLE)
            .message(UPDATED_MESSAGE)
            .creationDate(UPDATED_CREATION_DATE)
            .state(UPDATED_STATE);
        return supportTicket;
    }

    @BeforeEach
    public void initTest() {
        supportTicket = createEntity(em);
    }


    @Transactional
    public void createSupportTicket() throws Exception {
        int databaseSizeBeforeCreate = supportTicketRepository.findAll().size();
        // Create the SupportTicket
        restSupportTicketMockMvc.perform(post("/api/support-tickets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(supportTicket)))
            .andExpect(status().isCreated());

        // Validate the SupportTicket in the database
        List<SupportTicket> supportTicketList = supportTicketRepository.findAll();
        assertThat(supportTicketList).hasSize(databaseSizeBeforeCreate + 1);
        SupportTicket testSupportTicket = supportTicketList.get(supportTicketList.size() - 1);
        assertThat(testSupportTicket.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testSupportTicket.getMessage()).isEqualTo(DEFAULT_MESSAGE);
        assertThat(testSupportTicket.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
        assertThat(testSupportTicket.isState()).isEqualTo(DEFAULT_STATE);
    }


    @Transactional
    public void createSupportTicketWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = supportTicketRepository.findAll().size();

        // Create the SupportTicket with an existing ID
        supportTicket.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSupportTicketMockMvc.perform(post("/api/support-tickets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(supportTicket)))
            .andExpect(status().isBadRequest());

        // Validate the SupportTicket in the database
        List<SupportTicket> supportTicketList = supportTicketRepository.findAll();
        assertThat(supportTicketList).hasSize(databaseSizeBeforeCreate);
    }



    @Transactional
    public void getAllSupportTickets() throws Exception {
        // Initialize the database
        supportTicketRepository.saveAndFlush(supportTicket);

        // Get all the supportTicketList
        restSupportTicketMockMvc.perform(get("/api/support-tickets?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(supportTicket.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].message").value(hasItem(DEFAULT_MESSAGE)))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(sameInstant(DEFAULT_CREATION_DATE))))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.booleanValue())));
    }


    @Transactional
    public void getSupportTicket() throws Exception {
        // Initialize the database
        supportTicketRepository.saveAndFlush(supportTicket);

        // Get the supportTicket
        restSupportTicketMockMvc.perform(get("/api/support-tickets/{id}", supportTicket.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(supportTicket.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.message").value(DEFAULT_MESSAGE))
            .andExpect(jsonPath("$.creationDate").value(sameInstant(DEFAULT_CREATION_DATE)))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE.booleanValue()));
    }

    @Transactional
    public void getNonExistingSupportTicket() throws Exception {
        // Get the supportTicket
        restSupportTicketMockMvc.perform(get("/api/support-tickets/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }


    @Transactional
    public void updateSupportTicket() throws Exception {
        // Initialize the database
        supportTicketRepository.saveAndFlush(supportTicket);

        int databaseSizeBeforeUpdate = supportTicketRepository.findAll().size();

        // Update the supportTicket
        SupportTicket updatedSupportTicket = supportTicketRepository.findById(supportTicket.getId()).get();
        // Disconnect from session so that the updates on updatedSupportTicket are not directly saved in db
        em.detach(updatedSupportTicket);
        updatedSupportTicket
            .title(UPDATED_TITLE)
            .message(UPDATED_MESSAGE)
            .creationDate(UPDATED_CREATION_DATE)
            .state(UPDATED_STATE);

        restSupportTicketMockMvc.perform(put("/api/support-tickets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSupportTicket)))
            .andExpect(status().isOk());

        // Validate the SupportTicket in the database
        List<SupportTicket> supportTicketList = supportTicketRepository.findAll();
        assertThat(supportTicketList).hasSize(databaseSizeBeforeUpdate);
        SupportTicket testSupportTicket = supportTicketList.get(supportTicketList.size() - 1);
        assertThat(testSupportTicket.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testSupportTicket.getMessage()).isEqualTo(UPDATED_MESSAGE);
        assertThat(testSupportTicket.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
        assertThat(testSupportTicket.isState()).isEqualTo(UPDATED_STATE);
    }


    @Transactional
    public void updateNonExistingSupportTicket() throws Exception {
        int databaseSizeBeforeUpdate = supportTicketRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSupportTicketMockMvc.perform(put("/api/support-tickets")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(supportTicket)))
            .andExpect(status().isBadRequest());

        // Validate the SupportTicket in the database
        List<SupportTicket> supportTicketList = supportTicketRepository.findAll();
        assertThat(supportTicketList).hasSize(databaseSizeBeforeUpdate);
    }


    @Transactional
    public void deleteSupportTicket() throws Exception {
        // Initialize the database
        supportTicketRepository.saveAndFlush(supportTicket);

        int databaseSizeBeforeDelete = supportTicketRepository.findAll().size();

        // Delete the supportTicket
        restSupportTicketMockMvc.perform(delete("/api/support-tickets/{id}", supportTicket.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SupportTicket> supportTicketList = supportTicketRepository.findAll();
        assertThat(supportTicketList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
