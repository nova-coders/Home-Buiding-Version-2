package com.novacoders.homebuilding.repository;

import com.novacoders.homebuilding.domain.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAccountTwoRepository extends JpaRepository<UserAccount,Long> {
}
