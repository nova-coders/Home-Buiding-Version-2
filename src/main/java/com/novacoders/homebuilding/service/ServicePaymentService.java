package com.novacoders.homebuilding.service;

import com.novacoders.homebuilding.ResourceException.ResourceException;
import com.novacoders.homebuilding.domain.PublishingPackage;
import com.novacoders.homebuilding.domain.User;
import com.novacoders.homebuilding.domain.UserAccount;

import com.novacoders.homebuilding.repository.PublishingPackageRepository;
import com.novacoders.homebuilding.repository.ServicePaymentRepository;
import com.novacoders.homebuilding.repository.UserAccountRepository;
import com.novacoders.homebuilding.repository.UserRepository;
import com.novacoders.homebuilding.security.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;


@Service
@Transactional
public class ServicePaymentService {
    private final Logger log = LoggerFactory.getLogger(UserService.class);
    private final ServicePaymentRepository servicePaymentRepository;
    private final PublishingPackageRepository publishingPackageRepository;
    private final UserRepository userRepository;
    private final UserAccountRepository userAccountRepository;

    public ServicePaymentService(ServicePaymentRepository servicePaymentRepository,UserRepository userRepository,UserAccountRepository userAccountRepository, PublishingPackageRepository publishingPackageRepository) {
        this.servicePaymentRepository = servicePaymentRepository;
        this.userRepository = userRepository;
        this.userAccountRepository = userAccountRepository;
        this.publishingPackageRepository  = publishingPackageRepository;

    }
    public UserAccount findByUser() {
        User user = SecurityUtils.getCurrentUserLogin().flatMap( userRepository::findOneByLogin).get();
        if (user != null)
        {
            UserAccount userAccount = this.servicePaymentRepository.findByUser(user.getId());
            return userAccount;
        } else {
            throw new ResourceException("Invalid authentication");
        }
    }
    public UserAccount assignPackageToUser(long packageid,long userid){
        Optional<UserAccount> optionalUserAccount = this.userAccountRepository.findById(userid);
        if(optionalUserAccount.isPresent()) {
            User user = SecurityUtils.getCurrentUserLogin().flatMap( userRepository::findOneByLogin).get();
            UserAccount userAccount = optionalUserAccount.get();
            Optional<PublishingPackage> optionalPublishingPackage = this.publishingPackageRepository.findById(packageid);
            if(optionalPublishingPackage.isPresent() && (user.getId() == userAccount.getUser().getId())) {
                PublishingPackage publishingPackage = optionalPublishingPackage.get();
                userAccount.setPublishingPackage(publishingPackage);
                return  userAccountRepository.save(userAccount);
            } else {
                throw new ResourceException("Invalid action");
            }
        } else {
            throw new ResourceException("Invalid action");
        }
    }
}
