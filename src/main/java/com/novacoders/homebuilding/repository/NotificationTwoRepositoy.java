package com.novacoders.homebuilding.repository;

import com.novacoders.homebuilding.domain.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationTwoRepositoy  extends JpaRepository<Notification, Long> {
    @Query(value = "SELECT n FROM Notification n WHERE n.receptor.id = :receptorid")
    List<Notification> getByReceptor(@Param("receptorid") long receptorid);
}
