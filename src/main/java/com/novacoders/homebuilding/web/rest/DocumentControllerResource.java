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
 * DocumentControllerResource controller
 */
@RestController
@RequestMapping("/api/document-controller")
public class DocumentControllerResource {

    private final Logger log = LoggerFactory.getLogger(DocumentControllerResource.class);

    private final DocumentRepository documentRepository;

    public DocumentControllerResource(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    /**
     * {@code GET  /get-document-by-property-id/:id} : get the document by "id" property.
     *
     * @param id the id of the property.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the document, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/get-document-by-property-id/{id}")
    public ResponseEntity<Document> getDocumentByPropertyId(@PathVariable long id) {
        log.debug("REST request to get Document by Property Id : {}", id);
        Optional<Document> document = documentRepository.findByPropertyId(id);
        return ResponseUtil.wrapOrNotFound(document);
    }

}
