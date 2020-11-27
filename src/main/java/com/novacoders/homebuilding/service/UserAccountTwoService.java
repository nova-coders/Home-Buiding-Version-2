package com.novacoders.homebuilding.service;

import com.novacoders.homebuilding.domain.User;
import com.novacoders.homebuilding.domain.UserAccount;
import com.novacoders.homebuilding.repository.UserAccountRepository;
import com.novacoders.homebuilding.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserAccountTwoService {

    public UserAccountRepository userAccountTwoRepository;
    public UserRepository userRepository;

    UserAccountTwoService(UserAccountRepository userAccountTwoRepository, UserRepository userRepository){
        this.userAccountTwoRepository = userAccountTwoRepository;
        this.userRepository = userRepository;
    }

    public UserAccount updateUserAccount(UserAccount userAccount) {
        Optional<UserAccount> userAccountTemp =this.userAccountTwoRepository.findById(userAccount.getId());
        Optional<User> userTemp = this.userRepository.findById(userAccount.getUser().getId());
        UserAccount userAccount1 = null;
        if(userAccountTemp.isPresent() && userTemp.isPresent()){
            userAccount.getUser().setPassword(userTemp.get().getPassword());
            this.userRepository.save(userAccount.getUser());
            userAccount1 = this.userAccountTwoRepository.save(userAccount);
        }
        return userAccount1;
    }

}
