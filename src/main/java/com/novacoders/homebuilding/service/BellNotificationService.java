package com.novacoders.homebuilding.service;

import com.novacoders.homebuilding.ResourceException.ResourceException;
import com.novacoders.homebuilding.domain.Notification;
import com.novacoders.homebuilding.domain.UserAccount;
import com.novacoders.homebuilding.repository.BellNotificationRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

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

    public Notification saveNotification(Notification notification){
        return this.bellNotificationRepository.save(notification);
    }
    public Notification getNotificationById(long notificationId) {
        Optional<Notification> notificationOptional = this.bellNotificationRepository.findById(notificationId);
        if(notificationOptional.isPresent()){
            return notificationOptional.get();
        } else {
            throw  new ResourceException("Objeto no encontrado");
        }
    }
}
