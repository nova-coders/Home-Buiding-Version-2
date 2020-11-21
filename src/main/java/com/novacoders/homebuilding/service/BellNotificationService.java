package com.novacoders.homebuilding.service;

import com.novacoders.homebuilding.domain.Notification;
import com.novacoders.homebuilding.domain.UserAccount;
import com.novacoders.homebuilding.repository.BellNotificationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class BellNotificationService {
    public BellNotificationRepository bellNotificationRepository;
    public ServicePaymentService paymentService;
    public BellNotificationService(BellNotificationRepository bellNotificationRepository,
                                   ServicePaymentService servicePaymentService){
        this.bellNotificationRepository = bellNotificationRepository;
        this.paymentService = servicePaymentService;
    }

    public List<Notification> getNotificationByUserReceptor(){
        UserAccount userAccount = this.paymentService.findByUser();
        return this.bellNotificationRepository.findByUserReceptor(userAccount.getId());
    }
}
