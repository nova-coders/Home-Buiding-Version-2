package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.HomeBuildingApp;
import com.novacoders.homebuilding.domain.SupportTicketLog;
import com.novacoders.homebuilding.repository.SupportTicketLogRepository;

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
 * Integration tests for the {@link SupportTicketLogResource} REST controller.
 */
@SpringBootTest(classes = HomeBuildingApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class SupportTicketLogResourceIT {

    private static final String DEFAULT_TROUBLESHOOTING_COMMENTARY = "AAAAAAAAAA";
    private static final String UPDATED_TROUBLESHOOTING_COMMENTARY = "BBBBBBBBBB";

    private static final String DEFAULT_NEXT_STEP_COMMENTARY = "AAAAAAAAAA";
    private static final String UPDATED_NEXT_STEP_COMMENTARY = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CREATION_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATION_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private SupportTicketLogRepository supportTicketLogRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSupportTicketLogMockMvc;

    private SupportTicketLog supportTicketLog;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SupportTicketLog createEntity(EntityManager em) {
        SupportTicketLog supportTicketLog = new SupportTicketLog()
            .troubleshootingCommentary(DEFAULT_TROUBLESHOOTING_COMMENTARY)
            .nextStepCommentary(DEFAULT_NEXT_STEP_COMMENTARY)
            .creationDate(DEFAULT_CREATION_DATE);
        return supportTicketLog;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SupportTicketLog createUpdatedEntity(EntityManager em) {
        SupportTicketLog supportTicketLog = new SupportTicketLog()
            .troubleshootingCommentary(UPDATED_TROUBLESHOOTING_COMMENTARY)
            .nextStepCommentary(UPDATED_NEXT_STEP_COMMENTARY)
            .creationDate(UPDATED_CREATION_DATE);
        return supportTicketLog;
    }

    @BeforeEach
    public void initTest() {
        supportTicketLog = createEntity(em);
    }


    @Transactional
    public void createSupportTicketLog() throws Exception {
        int databaseSizeBeforeCreate = supportTicketLogRepository.findAll().size();
        // Create the SupportTicketLog
        restSupportTicketLogMockMvc.perform(post("/api/support-ticket-logs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(supportTicketLog)))
            .andExpect(status().isCreated());

        // Validate the SupportTicketLog in the database
        List<SupportTicketLog> supportTicketLogList = supportTicketLogRepository.findAll();
        assertThat(supportTicketLogList).hasSize(databaseSizeBeforeCreate + 1);
        SupportTicketLog testSupportTicketLog = supportTicketLogList.get(supportTicketLogList.size() - 1);
        assertThat(testSupportTicketLog.getTroubleshootingCommentary()).isEqualTo(DEFAULT_TROUBLESHOOTING_COMMENTARY);
        assertThat(testSupportTicketLog.getNextStepCommentary()).isEqualTo(DEFAULT_NEXT_STEP_COMMENTARY);
        assertThat(testSupportTicketLog.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
    }


    @Transactional
    public void createSupportTicketLogWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = supportTicketLogRepository.findAll().size();

        // Create the SupportTicketLog with an existing ID
        supportTicketLog.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSupportTicketLogMockMvc.perform(post("/api/support-ticket-logs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(supportTicketLog)))
            .andExpect(status().isBadRequest());

        // Validate the SupportTicketLog in the database
        List<SupportTicketLog> supportTicketLogList = supportTicketLogRepository.findAll();
        assertThat(supportTicketLogList).hasSize(databaseSizeBeforeCreate);
    }



    @Transactional
    public void getAllSupportTicketLogs() throws Exception {
        // Initialize the database
        supportTicketLogRepository.saveAndFlush(supportTicketLog);

        // Get all the supportTicketLogList
        restSupportTicketLogMockMvc.perform(get("/api/support-ticket-logs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(supportTicketLog.getId().intValue())))
            .andExpect(jsonPath("$.[*].troubleshootingCommentary").value(hasItem(DEFAULT_TROUBLESHOOTING_COMMENTARY)))
            .andExpect(jsonPath("$.[*].nextStepCommentary").value(hasItem(DEFAULT_NEXT_STEP_COMMENTARY)))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(sameInstant(DEFAULT_CREATION_DATE))));
    }


    @Transactional
    public void getSupportTicketLog() throws Exception {
        // Initialize the database
        supportTicketLogRepository.saveAndFlush(supportTicketLog);

        // Get the supportTicketLog
        restSupportTicketLogMockMvc.perform(get("/api/support-ticket-logs/{id}", supportTicketLog.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(supportTicketLog.getId().intValue()))
            .andExpect(jsonPath("$.troubleshootingCommentary").value(DEFAULT_TROUBLESHOOTING_COMMENTARY))
            .andExpect(jsonPath("$.nextStepCommentary").value(DEFAULT_NEXT_STEP_COMMENTARY))
            .andExpect(jsonPath("$.creationDate").value(sameInstant(DEFAULT_CREATION_DATE)));
    }

    @Transactional
    public void getNonExistingSupportTicketLog() throws Exception {
        // Get the supportTicketLog
        restSupportTicketLogMockMvc.perform(get("/api/support-ticket-logs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }


    @Transactional
    public void updateSupportTicketLog() throws Exception {
        // Initialize the database
        supportTicketLogRepository.saveAndFlush(supportTicketLog);

        int databaseSizeBeforeUpdate = supportTicketLogRepository.findAll().size();

        // Update the supportTicketLog
        SupportTicketLog updatedSupportTicketLog = supportTicketLogRepository.findById(supportTicketLog.getId()).get();
        // Disconnect from session so that the updates on updatedSupportTicketLog are not directly saved in db
        em.detach(updatedSupportTicketLog);
        updatedSupportTicketLog
            .troubleshootingCommentary(UPDATED_TROUBLESHOOTING_COMMENTARY)
            .nextStepCommentary(UPDATED_NEXT_STEP_COMMENTARY)
            .creationDate(UPDATED_CREATION_DATE);

        restSupportTicketLogMockMvc.perform(put("/api/support-ticket-logs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSupportTicketLog)))
            .andExpect(status().isOk());

        // Validate the SupportTicketLog in the database
        List<SupportTicketLog> supportTicketLogList = supportTicketLogRepository.findAll();
        assertThat(supportTicketLogList).hasSize(databaseSizeBeforeUpdate);
        SupportTicketLog testSupportTicketLog = supportTicketLogList.get(supportTicketLogList.size() - 1);
        assertThat(testSupportTicketLog.getTroubleshootingCommentary()).isEqualTo(UPDATED_TROUBLESHOOTING_COMMENTARY);
        assertThat(testSupportTicketLog.getNextStepCommentary()).isEqualTo(UPDATED_NEXT_STEP_COMMENTARY);
        assertThat(testSupportTicketLog.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
    }


    @Transactional
    public void updateNonExistingSupportTicketLog() throws Exception {
        int databaseSizeBeforeUpdate = supportTicketLogRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSupportTicketLogMockMvc.perform(put("/api/support-ticket-logs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(supportTicketLog)))
            .andExpect(status().isBadRequest());

        // Validate the SupportTicketLog in the database
        List<SupportTicketLog> supportTicketLogList = supportTicketLogRepository.findAll();
        assertThat(supportTicketLogList).hasSize(databaseSizeBeforeUpdate);
    }


    @Transactional
    public void deleteSupportTicketLog() throws Exception {
        // Initialize the database
        supportTicketLogRepository.saveAndFlush(supportTicketLog);

        int databaseSizeBeforeDelete = supportTicketLogRepository.findAll().size();

        // Delete the supportTicketLog
        restSupportTicketLogMockMvc.perform(delete("/api/support-ticket-logs/{id}", supportTicketLog.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SupportTicketLog> supportTicketLogList = supportTicketLogRepository.findAll();
        assertThat(supportTicketLogList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
