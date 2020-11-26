package com.novacoders.homebuilding.repository;

import com.novacoders.homebuilding.domain.Property;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Property entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {

    //Query that returns the properties that are in sales for one specific owner(userAccount)
    @Query(value = "SELECT p FROM Property p WHERE p.sale is not null and p.state > 0 and p.userAccount.id = :id")
    List<Property> findSalesByUserId(@Param("id") long id);

    @Query(value = "SELECT p FROM Property p WHERE p.sale is not null and p.state > 0")
    List<Property> findBySaleNotNull();

    @Query("SELECT p FROM Property p WHERE p.sale.finalDate <= :expireDateTime AND p.state = 1")
    List<Property> findAllWithCreationDateTimeBefore(@Param("expireDateTime") ZonedDateTime expireDateTime);

    Optional<Property> findBySale_Id(long id);
	  
	@Query("SELECT p FROM Property p WHERE p.sale is not null and p.sale.finalDate <=:currentDate")
	List<Property> findAllPropertiesOnSale(@Param("currentDate") ZonedDateTime currentDate);
}
