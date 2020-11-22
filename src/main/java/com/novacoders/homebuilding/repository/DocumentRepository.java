package com.novacoders.homebuilding.repository;

import com.novacoders.homebuilding.domain.Document;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data  repository for the Document entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {

    Optional<Document> findByPropertyId(long propertyId);
}
