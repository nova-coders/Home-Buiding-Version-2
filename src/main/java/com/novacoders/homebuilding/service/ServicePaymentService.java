package com.novacoders.homebuilding.service;

import com.novacoders.homebuilding.domain.User;
import com.novacoders.homebuilding.domain.UserAccount;

import com.novacoders.homebuilding.repository.ServicePaymentRepository;
import com.novacoders.homebuilding.repository.UserAccountRepository;
import com.novacoders.homebuilding.repository.UserRepository;
import com.novacoders.homebuilding.security.SecurityUtils;
import io.github.jhipster.web.util.ResponseUtil;
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
    private final UserRepository userRepository;
    private final UserAccountRepository userAccountRepository;

    public ServicePaymentService(ServicePaymentRepository servicePaymentRepository,UserRepository userRepository,UserAccountRepository userAccountRepository) {
        this.servicePaymentRepository = servicePaymentRepository;
        this.userRepository = userRepository;
        this.userAccountRepository = userAccountRepository;

    }
    public UserAccount findByUser() {
        User user = SecurityUtils.getCurrentUserLogin().flatMap( userRepository::findOneByLogin).get();
        UserAccount userAccount = this.servicePaymentRepository.findByUser(user.getId());
        return userAccount;
    }
}
