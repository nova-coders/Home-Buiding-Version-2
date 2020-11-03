package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.HomeBuildingApp;
import com.novacoders.homebuilding.domain.ImageCategory;
import com.novacoders.homebuilding.repository.ImageCategoryRepository;

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
 * Integration tests for the {@link ImageCategoryResource} REST controller.
 */
@SpringBootTest(classes = HomeBuildingApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ImageCategoryResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ImageCategoryRepository imageCategoryRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restImageCategoryMockMvc;

    private ImageCategory imageCategory;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ImageCategory createEntity(EntityManager em) {
        ImageCategory imageCategory = new ImageCategory()
            .name(DEFAULT_NAME);
        return imageCategory;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ImageCategory createUpdatedEntity(EntityManager em) {
        ImageCategory imageCategory = new ImageCategory()
            .name(UPDATED_NAME);
        return imageCategory;
    }

    @BeforeEach
    public void initTest() {
        imageCategory = createEntity(em);
    }

    @Test
    @Transactional
    public void createImageCategory() throws Exception {
        int databaseSizeBeforeCreate = imageCategoryRepository.findAll().size();
        // Create the ImageCategory
        restImageCategoryMockMvc.perform(post("/api/image-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(imageCategory)))
            .andExpect(status().isCreated());

        // Validate the ImageCategory in the database
        List<ImageCategory> imageCategoryList = imageCategoryRepository.findAll();
        assertThat(imageCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        ImageCategory testImageCategory = imageCategoryList.get(imageCategoryList.size() - 1);
        assertThat(testImageCategory.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createImageCategoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = imageCategoryRepository.findAll().size();

        // Create the ImageCategory with an existing ID
        imageCategory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restImageCategoryMockMvc.perform(post("/api/image-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(imageCategory)))
            .andExpect(status().isBadRequest());

        // Validate the ImageCategory in the database
        List<ImageCategory> imageCategoryList = imageCategoryRepository.findAll();
        assertThat(imageCategoryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllImageCategories() throws Exception {
        // Initialize the database
        imageCategoryRepository.saveAndFlush(imageCategory);

        // Get all the imageCategoryList
        restImageCategoryMockMvc.perform(get("/api/image-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(imageCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getImageCategory() throws Exception {
        // Initialize the database
        imageCategoryRepository.saveAndFlush(imageCategory);

        // Get the imageCategory
        restImageCategoryMockMvc.perform(get("/api/image-categories/{id}", imageCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(imageCategory.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingImageCategory() throws Exception {
        // Get the imageCategory
        restImageCategoryMockMvc.perform(get("/api/image-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateImageCategory() throws Exception {
        // Initialize the database
        imageCategoryRepository.saveAndFlush(imageCategory);

        int databaseSizeBeforeUpdate = imageCategoryRepository.findAll().size();

        // Update the imageCategory
        ImageCategory updatedImageCategory = imageCategoryRepository.findById(imageCategory.getId()).get();
        // Disconnect from session so that the updates on updatedImageCategory are not directly saved in db
        em.detach(updatedImageCategory);
        updatedImageCategory
            .name(UPDATED_NAME);

        restImageCategoryMockMvc.perform(put("/api/image-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedImageCategory)))
            .andExpect(status().isOk());

        // Validate the ImageCategory in the database
        List<ImageCategory> imageCategoryList = imageCategoryRepository.findAll();
        assertThat(imageCategoryList).hasSize(databaseSizeBeforeUpdate);
        ImageCategory testImageCategory = imageCategoryList.get(imageCategoryList.size() - 1);
        assertThat(testImageCategory.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingImageCategory() throws Exception {
        int databaseSizeBeforeUpdate = imageCategoryRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restImageCategoryMockMvc.perform(put("/api/image-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(imageCategory)))
            .andExpect(status().isBadRequest());

        // Validate the ImageCategory in the database
        List<ImageCategory> imageCategoryList = imageCategoryRepository.findAll();
        assertThat(imageCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteImageCategory() throws Exception {
        // Initialize the database
        imageCategoryRepository.saveAndFlush(imageCategory);

        int databaseSizeBeforeDelete = imageCategoryRepository.findAll().size();

        // Delete the imageCategory
        restImageCategoryMockMvc.perform(delete("/api/image-categories/{id}", imageCategory.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ImageCategory> imageCategoryList = imageCategoryRepository.findAll();
        assertThat(imageCategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
