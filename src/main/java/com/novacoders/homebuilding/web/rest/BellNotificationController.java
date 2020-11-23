package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.domain.Notification;
import com.novacoders.homebuilding.service.BellNotificationService;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@Transactional
public class BellNotificationController {
    private BellNotificationService bellNotificationService;
    BellNotificationController(BellNotificationService bellNotificationService){
        this.bellNotificationService = bellNotificationService;
    }
    @GetMapping("/usernotifications")
    public List<Notification> getNotificationsByUserReceptor(){
        return bellNotificationService.getNotificationByUserReceptor();
    }

    @GetMapping("/getnotification/{notificationId}")
    public Notification saveNotification(@PathVariable int notificationId){
        return bellNotificationService.getNotificationById(notificationId);
    }
}
