package com.novacoders.homebuilding.service;

import com.novacoders.homebuilding.domain.Offer;
import com.novacoders.homebuilding.repository.SeeAuctionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class SeeAuctionService {
    public final SeeAuctionRepository seeAuctionRepository;
    public SeeAuctionService(SeeAuctionRepository seeAuctionRepository){
        this.seeAuctionRepository = seeAuctionRepository;
    }
    public List<Offer> findBySale(long saleId){
        return this.seeAuctionRepository.findBySale(saleId);
    }
}
