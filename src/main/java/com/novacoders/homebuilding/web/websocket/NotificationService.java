package com.novacoders.homebuilding.web.websocket;

import com.novacoders.homebuilding.domain.Notification;
import com.novacoders.homebuilding.service.BellNotificationService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class NotificationService {
    public BellNotificationService bellNotificationService;
    public NotificationService(BellNotificationService bellNotificationService) {
        this.bellNotificationService = bellNotificationService;
    }
    @MessageMapping("/topic/notification")
    @SendTo("/topic/inbox")
    public Notification sendActivity(String notificationId) {
        return this.bellNotificationService.getNotificationById(Integer.parseInt(notificationId));
    }
}

