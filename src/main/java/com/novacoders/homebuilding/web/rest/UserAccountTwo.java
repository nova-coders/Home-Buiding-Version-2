package com.novacoders.homebuilding.web.rest;

import com.novacoders.homebuilding.domain.User;
import com.novacoders.homebuilding.domain.UserAccount;
import com.novacoders.homebuilding.repository.UserAccountRepository;
import com.novacoders.homebuilding.service.UserAccountTwoService;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Transactional
public class UserAccountTwo {

    private UserAccountTwoService userService;

    UserAccountTwo(UserAccountTwoService userAccountService){
        this.userService = userAccountService;
    }

    @PutMapping("UserAccountToUpdate")
    public ResponseEntity<UserAccount> ActualizarUserAccount(@RequestBody UserAccount puserAccount){
        return ResponseEntity.ok().body(this.userService.updateUserAccount(puserAccount));
    }


}
