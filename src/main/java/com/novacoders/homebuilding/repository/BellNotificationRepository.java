package com.novacoders.homebuilding.repository;

import com.novacoders.homebuilding.domain.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BellNotificationRepository extends JpaRepository<Notification, Long> {
    @Query(value = "SELECT n FROM Notification n WHERE n.receptor.id = :userid AND n.state = true ORDER BY n.creationDate DESC")
    List<Notification> findByUserReceptor(@Param("userid") long userid);
}
