package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.HomeBuildingApp;
import com.novacoders.homebuilding.repository.DocumentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
/**
 * Test class for the CustomDocumentResource REST controller.
 *
 * @see CustomDocumentResource
 */
@SpringBootTest(classes = HomeBuildingApp.class)
public class CustomDocumentResourceIT {

    private MockMvc restMockMvc;

    private final DocumentRepository documentRepository;

    public CustomDocumentResourceIT(DocumentRepository documentRepository){
        this.documentRepository = documentRepository;
    }

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);

        CustomDocumentResource customDocumentResource = new CustomDocumentResource(documentRepository);
        restMockMvc = MockMvcBuilders
            .standaloneSetup(customDocumentResource)
            .build();
    }

    /**
     * Test getDocumentByPropertyId
     */
    @Test
    public void testGetDocumentByPropertyId() throws Exception {
        restMockMvc.perform(get("/api/custom-document-resource/get-document-by-property-id"))
            .andExpect(status().isOk());
    }

    /**
     * Test getDocumentIdByUserIdAndPropertyId
     */
    @Test
    public void testGetDocumentIdByUserIdAndPropertyId() throws Exception {
        restMockMvc.perform(get("/api/custom-document-resource/get-document-id-by-user-id-and-property-id"))
            .andExpect(status().isOk());
    }
}
