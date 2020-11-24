package com.novacoders.homebuilding.web.websocket;

import com.novacoders.homebuilding.ResourceException.ResourceException;
import com.novacoders.homebuilding.domain.Notification;
import com.novacoders.homebuilding.domain.User;
import com.novacoders.homebuilding.domain.UserAccount;
import com.novacoders.homebuilding.repository.NotificationTwoRepositoy;
import com.novacoders.homebuilding.repository.UserAccountRepository;
import com.novacoders.homebuilding.repository.UserRepository;
import com.novacoders.homebuilding.security.SecurityUtils;
import com.novacoders.homebuilding.service.BellNotificationService;
import com.novacoders.homebuilding.service.ServicePaymentService;
import com.novacoders.homebuilding.web.websocket.dto.NotificationDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionConnectEvent;


import java.util.List;

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

