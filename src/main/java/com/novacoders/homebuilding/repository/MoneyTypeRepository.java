package com.novacoders.homebuilding.repository;

import com.novacoders.homebuilding.domain.MoneyType;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the MoneyType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MoneyTypeRepository extends JpaRepository<MoneyType, Long> {
}
