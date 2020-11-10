package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.HomeBuildingApp;
import com.novacoders.homebuilding.domain.UserAccount;
import com.novacoders.homebuilding.repository.UserAccountRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
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

import com.novacoders.homebuilding.domain.enumeration.IdentificationType;
/**
 * Integration tests for the {@link UserAccountResource} REST controller.
 */
@SpringBootTest(classes = HomeBuildingApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class UserAccountResourceIT {

    private static final String DEFAULT_IDENTIFICATION = "AAAAAAAAAA";
    private static final String UPDATED_IDENTIFICATION = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_BIRTHDATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_BIRTHDATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_PROFILE_PICTURE = "AAAAAAAAAA";
    private static final String UPDATED_PROFILE_PICTURE = "BBBBBBBBBB";

    private static final String DEFAULT_SIGNATURE_PICTURE = "AAAAAAAAAA";
    private static final String UPDATED_SIGNATURE_PICTURE = "BBBBBBBBBB";

    private static final String DEFAULT_SIGNATURE_CODE = "AAAAAAAAAA";
    private static final String UPDATED_SIGNATURE_CODE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_STATE = false;
    private static final Boolean UPDATED_STATE = true;

    private static final ZonedDateTime DEFAULT_CREATION_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATION_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    private static final IdentificationType DEFAULT_IDENTIFICATION_TYPE = IdentificationType.Nacional;
    private static final IdentificationType UPDATED_IDENTIFICATION_TYPE = IdentificationType.Extranjera;

    @Autowired
    private UserAccountRepository userAccountRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUserAccountMockMvc;

    private UserAccount userAccount;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserAccount createEntity(EntityManager em) {
        UserAccount userAccount = new UserAccount()
            .identification(DEFAULT_IDENTIFICATION)
            .birthdate(DEFAULT_BIRTHDATE)
            .profilePicture(DEFAULT_PROFILE_PICTURE)
            .signaturePicture(DEFAULT_SIGNATURE_PICTURE)
            .signatureCode(DEFAULT_SIGNATURE_CODE)
            .state(DEFAULT_STATE)
            .creationDate(DEFAULT_CREATION_DATE)
            .phone(DEFAULT_PHONE)
            .identificationType(DEFAULT_IDENTIFICATION_TYPE);
        return userAccount;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserAccount createUpdatedEntity(EntityManager em) {
        UserAccount userAccount = new UserAccount()
            .identification(UPDATED_IDENTIFICATION)
            .birthdate(UPDATED_BIRTHDATE)
            .profilePicture(UPDATED_PROFILE_PICTURE)
            .signaturePicture(UPDATED_SIGNATURE_PICTURE)
            .signatureCode(UPDATED_SIGNATURE_CODE)
            .state(UPDATED_STATE)
            .creationDate(UPDATED_CREATION_DATE)
            .phone(UPDATED_PHONE)
            .identificationType(UPDATED_IDENTIFICATION_TYPE);
        return userAccount;
    }

    @BeforeEach
    public void initTest() {
        userAccount = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserAccount() throws Exception {
        int databaseSizeBeforeCreate = userAccountRepository.findAll().size();
        // Create the UserAccount
        restUserAccountMockMvc.perform(post("/api/user-accounts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userAccount)))
            .andExpect(status().isCreated());

        // Validate the UserAccount in the database
        List<UserAccount> userAccountList = userAccountRepository.findAll();
        assertThat(userAccountList).hasSize(databaseSizeBeforeCreate + 1);
        UserAccount testUserAccount = userAccountList.get(userAccountList.size() - 1);
        assertThat(testUserAccount.getIdentification()).isEqualTo(DEFAULT_IDENTIFICATION);
        assertThat(testUserAccount.getBirthdate()).isEqualTo(DEFAULT_BIRTHDATE);
        assertThat(testUserAccount.getProfilePicture()).isEqualTo(DEFAULT_PROFILE_PICTURE);
        assertThat(testUserAccount.getSignaturePicture()).isEqualTo(DEFAULT_SIGNATURE_PICTURE);
        assertThat(testUserAccount.getSignatureCode()).isEqualTo(DEFAULT_SIGNATURE_CODE);
        assertThat(testUserAccount.isState()).isEqualTo(DEFAULT_STATE);
        assertThat(testUserAccount.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
        assertThat(testUserAccount.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testUserAccount.getIdentificationType()).isEqualTo(DEFAULT_IDENTIFICATION_TYPE);
    }

    @Test
    @Transactional
    public void createUserAccountWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userAccountRepository.findAll().size();

        // Create the UserAccount with an existing ID
        userAccount.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserAccountMockMvc.perform(post("/api/user-accounts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userAccount)))
            .andExpect(status().isBadRequest());

        // Validate the UserAccount in the database
        List<UserAccount> userAccountList = userAccountRepository.findAll();
        assertThat(userAccountList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllUserAccounts() throws Exception {
        // Initialize the database
        userAccountRepository.saveAndFlush(userAccount);

        // Get all the userAccountList
        restUserAccountMockMvc.perform(get("/api/user-accounts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userAccount.getId().intValue())))
            .andExpect(jsonPath("$.[*].identification").value(hasItem(DEFAULT_IDENTIFICATION)))
            .andExpect(jsonPath("$.[*].birthdate").value(hasItem(sameInstant(DEFAULT_BIRTHDATE))))
            .andExpect(jsonPath("$.[*].profilePicture").value(hasItem(DEFAULT_PROFILE_PICTURE)))
            .andExpect(jsonPath("$.[*].signaturePicture").value(hasItem(DEFAULT_SIGNATURE_PICTURE.toString())))
            .andExpect(jsonPath("$.[*].signatureCode").value(hasItem(DEFAULT_SIGNATURE_CODE.toString())))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.booleanValue())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(sameInstant(DEFAULT_CREATION_DATE))))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE)))
            .andExpect(jsonPath("$.[*].identificationType").value(hasItem(DEFAULT_IDENTIFICATION_TYPE.toString())));
    }
    
    @Test
    @Transactional
    public void getUserAccount() throws Exception {
        // Initialize the database
        userAccountRepository.saveAndFlush(userAccount);

        // Get the userAccount
        restUserAccountMockMvc.perform(get("/api/user-accounts/{id}", userAccount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(userAccount.getId().intValue()))
            .andExpect(jsonPath("$.identification").value(DEFAULT_IDENTIFICATION))
            .andExpect(jsonPath("$.birthdate").value(sameInstant(DEFAULT_BIRTHDATE)))
            .andExpect(jsonPath("$.profilePicture").value(DEFAULT_PROFILE_PICTURE))
            .andExpect(jsonPath("$.signaturePicture").value(DEFAULT_SIGNATURE_PICTURE.toString()))
            .andExpect(jsonPath("$.signatureCode").value(DEFAULT_SIGNATURE_CODE.toString()))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE.booleanValue()))
            .andExpect(jsonPath("$.creationDate").value(sameInstant(DEFAULT_CREATION_DATE)))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE))
            .andExpect(jsonPath("$.identificationType").value(DEFAULT_IDENTIFICATION_TYPE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingUserAccount() throws Exception {
        // Get the userAccount
        restUserAccountMockMvc.perform(get("/api/user-accounts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserAccount() throws Exception {
        // Initialize the database
        userAccountRepository.saveAndFlush(userAccount);

        int databaseSizeBeforeUpdate = userAccountRepository.findAll().size();

        // Update the userAccount
        UserAccount updatedUserAccount = userAccountRepository.findById(userAccount.getId()).get();
        // Disconnect from session so that the updates on updatedUserAccount are not directly saved in db
        em.detach(updatedUserAccount);
        updatedUserAccount
            .identification(UPDATED_IDENTIFICATION)
            .birthdate(UPDATED_BIRTHDATE)
            .profilePicture(UPDATED_PROFILE_PICTURE)
            .signaturePicture(UPDATED_SIGNATURE_PICTURE)
            .signatureCode(UPDATED_SIGNATURE_CODE)
            .state(UPDATED_STATE)
            .creationDate(UPDATED_CREATION_DATE)
            .phone(UPDATED_PHONE)
            .identificationType(UPDATED_IDENTIFICATION_TYPE);

        restUserAccountMockMvc.perform(put("/api/user-accounts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserAccount)))
            .andExpect(status().isOk());

        // Validate the UserAccount in the database
        List<UserAccount> userAccountList = userAccountRepository.findAll();
        assertThat(userAccountList).hasSize(databaseSizeBeforeUpdate);
        UserAccount testUserAccount = userAccountList.get(userAccountList.size() - 1);
        assertThat(testUserAccount.getIdentification()).isEqualTo(UPDATED_IDENTIFICATION);
        assertThat(testUserAccount.getBirthdate()).isEqualTo(UPDATED_BIRTHDATE);
        assertThat(testUserAccount.getProfilePicture()).isEqualTo(UPDATED_PROFILE_PICTURE);
        assertThat(testUserAccount.getSignaturePicture()).isEqualTo(UPDATED_SIGNATURE_PICTURE);
        assertThat(testUserAccount.getSignatureCode()).isEqualTo(UPDATED_SIGNATURE_CODE);
        assertThat(testUserAccount.isState()).isEqualTo(UPDATED_STATE);
        assertThat(testUserAccount.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
        assertThat(testUserAccount.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testUserAccount.getIdentificationType()).isEqualTo(UPDATED_IDENTIFICATION_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingUserAccount() throws Exception {
        int databaseSizeBeforeUpdate = userAccountRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserAccountMockMvc.perform(put("/api/user-accounts")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userAccount)))
            .andExpect(status().isBadRequest());

        // Validate the UserAccount in the database
        List<UserAccount> userAccountList = userAccountRepository.findAll();
        assertThat(userAccountList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUserAccount() throws Exception {
        // Initialize the database
        userAccountRepository.saveAndFlush(userAccount);

        int databaseSizeBeforeDelete = userAccountRepository.findAll().size();

        // Delete the userAccount
        restUserAccountMockMvc.perform(delete("/api/user-accounts/{id}", userAccount.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UserAccount> userAccountList = userAccountRepository.findAll();
        assertThat(userAccountList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
