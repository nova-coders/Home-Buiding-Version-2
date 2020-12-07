package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.domain.Document;
import com.novacoders.homebuilding.repository.DocumentRepository;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

/**
 * CustomDocumentResource controller
 */
@RestController
@RequestMapping("/api/custom-document-resource")
public class CustomDocumentResource {

    private final Logger log = LoggerFactory.getLogger(CustomDocumentResource.class);

    private final DocumentRepository documentRepository;

    public CustomDocumentResource(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }


    /**
     * Get document of a property
     * @param id
     * @return
     */
    @GetMapping("/get-document-by-property-id")
    public ResponseEntity<Document> getDocumentByPropertyId(@PathVariable long id) {
        log.debug("REST request to get Document by Property Id : {}", id);
        Optional<Document> document = documentRepository.findByPropertyId(id);
        return ResponseUtil.wrapOrNotFound(document);
    }

    /**
    * GET getDocumentIdByUserIdAndPropertyId
    */
    @GetMapping("/get-document-id-by-user-id-and-property-id/{userAccountId}&{propertyId}")
    public long getDocumentIdByUserIdAndPropertyId(@PathVariable long userAccountId, @PathVariable long propertyId) throws Exception {
        Optional<Document> optionalDocument = documentRepository.findByPropertyId(propertyId);
        long documentId = 0;

        if(optionalDocument.isPresent()){
            Document document = optionalDocument.get();

            if(document.getSeller().getId() == userAccountId || document.getBuyer().getId() == userAccountId){
                documentId = document.getId();
            }
        }

        return documentId;
    }

}
