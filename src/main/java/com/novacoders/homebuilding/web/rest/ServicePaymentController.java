package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.domain.User;
import com.novacoders.homebuilding.domain.UserAccount;
import com.novacoders.homebuilding.repository.UserAccountRepository;
import com.novacoders.homebuilding.repository.UserRepository;
import com.novacoders.homebuilding.security.SecurityUtils;
import com.novacoders.homebuilding.service.ServicePaymentService;
import io.github.jhipster.web.util.ResponseUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@Transactional
public class ServicePaymentController {
    private final ServicePaymentService servicePaymentService;
    public ServicePaymentController(ServicePaymentService servicePaymentService) {
        this.servicePaymentService = servicePaymentService;
    }
    /**
     * {@code GET  /payment-user-account} : get  userAccount.
     *
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userAccount, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/payment-user-account")
    public UserAccount getUserAccount() {
      return this.servicePaymentService.findByUser();
    }
}
