package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.HomeBuildingApp;
import com.novacoders.homebuilding.domain.Score;
import com.novacoders.homebuilding.repository.ScoreRepository;

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
 * Integration tests for the {@link ScoreResource} REST controller.
 */
@SpringBootTest(classes = HomeBuildingApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ScoreResourceIT {

    private static final Integer DEFAULT_RATING = 1;
    private static final Integer UPDATED_RATING = 2;

    private static final String DEFAULT_COMMENTARY = "AAAAAAAAAA";
    private static final String UPDATED_COMMENTARY = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_CREATION_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATION_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final Boolean DEFAULT_STATE = false;
    private static final Boolean UPDATED_STATE = true;

    @Autowired
    private ScoreRepository scoreRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restScoreMockMvc;

    private Score score;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Score createEntity(EntityManager em) {
        Score score = new Score()
            .rating(DEFAULT_RATING)
            .commentary(DEFAULT_COMMENTARY)
            .creationDate(DEFAULT_CREATION_DATE)
            .state(DEFAULT_STATE);
        return score;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Score createUpdatedEntity(EntityManager em) {
        Score score = new Score()
            .rating(UPDATED_RATING)
            .commentary(UPDATED_COMMENTARY)
            .creationDate(UPDATED_CREATION_DATE)
            .state(UPDATED_STATE);
        return score;
    }

    @BeforeEach
    public void initTest() {
        score = createEntity(em);
    }


    @Transactional
    public void createScore() throws Exception {
        int databaseSizeBeforeCreate = scoreRepository.findAll().size();
        // Create the Score
        restScoreMockMvc.perform(post("/api/scores")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(score)))
            .andExpect(status().isCreated());

        // Validate the Score in the database
        List<Score> scoreList = scoreRepository.findAll();
        assertThat(scoreList).hasSize(databaseSizeBeforeCreate + 1);
        Score testScore = scoreList.get(scoreList.size() - 1);
        assertThat(testScore.getRating()).isEqualTo(DEFAULT_RATING);
        assertThat(testScore.getCommentary()).isEqualTo(DEFAULT_COMMENTARY);
        assertThat(testScore.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
        assertThat(testScore.isState()).isEqualTo(DEFAULT_STATE);
    }


    @Transactional
    public void createScoreWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = scoreRepository.findAll().size();

        // Create the Score with an existing ID
        score.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restScoreMockMvc.perform(post("/api/scores")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(score)))
            .andExpect(status().isBadRequest());

        // Validate the Score in the database
        List<Score> scoreList = scoreRepository.findAll();
        assertThat(scoreList).hasSize(databaseSizeBeforeCreate);
    }



    @Transactional
    public void getAllScores() throws Exception {
        // Initialize the database
        scoreRepository.saveAndFlush(score);

        // Get all the scoreList
        restScoreMockMvc.perform(get("/api/scores?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(score.getId().intValue())))
            .andExpect(jsonPath("$.[*].rating").value(hasItem(DEFAULT_RATING)))
            .andExpect(jsonPath("$.[*].commentary").value(hasItem(DEFAULT_COMMENTARY)))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(sameInstant(DEFAULT_CREATION_DATE))))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.booleanValue())));
    }


    @Transactional
    public void getScore() throws Exception {
        // Initialize the database
        scoreRepository.saveAndFlush(score);

        // Get the score
        restScoreMockMvc.perform(get("/api/scores/{id}", score.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(score.getId().intValue()))
            .andExpect(jsonPath("$.rating").value(DEFAULT_RATING))
            .andExpect(jsonPath("$.commentary").value(DEFAULT_COMMENTARY))
            .andExpect(jsonPath("$.creationDate").value(sameInstant(DEFAULT_CREATION_DATE)))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE.booleanValue()));
    }

    @Transactional
    public void getNonExistingScore() throws Exception {
        // Get the score
        restScoreMockMvc.perform(get("/api/scores/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }


    @Transactional
    public void updateScore() throws Exception {
        // Initialize the database
        scoreRepository.saveAndFlush(score);

        int databaseSizeBeforeUpdate = scoreRepository.findAll().size();

        // Update the score
        Score updatedScore = scoreRepository.findById(score.getId()).get();
        // Disconnect from session so that the updates on updatedScore are not directly saved in db
        em.detach(updatedScore);
        updatedScore
            .rating(UPDATED_RATING)
            .commentary(UPDATED_COMMENTARY)
            .creationDate(UPDATED_CREATION_DATE)
            .state(UPDATED_STATE);

        restScoreMockMvc.perform(put("/api/scores")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedScore)))
            .andExpect(status().isOk());

        // Validate the Score in the database
        List<Score> scoreList = scoreRepository.findAll();
        assertThat(scoreList).hasSize(databaseSizeBeforeUpdate);
        Score testScore = scoreList.get(scoreList.size() - 1);
        assertThat(testScore.getRating()).isEqualTo(UPDATED_RATING);
        assertThat(testScore.getCommentary()).isEqualTo(UPDATED_COMMENTARY);
        assertThat(testScore.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
        assertThat(testScore.isState()).isEqualTo(UPDATED_STATE);
    }


    @Transactional
    public void updateNonExistingScore() throws Exception {
        int databaseSizeBeforeUpdate = scoreRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restScoreMockMvc.perform(put("/api/scores")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(score)))
            .andExpect(status().isBadRequest());

        // Validate the Score in the database
        List<Score> scoreList = scoreRepository.findAll();
        assertThat(scoreList).hasSize(databaseSizeBeforeUpdate);
    }


    @Transactional
    public void deleteScore() throws Exception {
        // Initialize the database
        scoreRepository.saveAndFlush(score);

        int databaseSizeBeforeDelete = scoreRepository.findAll().size();

        // Delete the score
        restScoreMockMvc.perform(delete("/api/scores/{id}", score.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Score> scoreList = scoreRepository.findAll();
        assertThat(scoreList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
