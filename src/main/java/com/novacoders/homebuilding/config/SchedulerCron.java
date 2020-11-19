package com.novacoders.homebuilding.config;

import java.text.SimpleDateFormat;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;

import com.novacoders.homebuilding.domain.Offer;
import com.novacoders.homebuilding.domain.Property;
import com.novacoders.homebuilding.repository.AuctionRepository;
import com.novacoders.homebuilding.service.AuctionService;
import com.novacoders.homebuilding.service.MailAuctionService;
import com.novacoders.homebuilding.service.PropertyService;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
@Component
public class SchedulerCron {
    private SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
    public PropertyService propertyService;
    public AuctionRepository auctionRepository;
    public MailAuctionService mailAuctionService;
    public AuctionService auctionService;

    SchedulerCron(PropertyService propertyService,MailAuctionService mailAuctionService,AuctionRepository auctionRepository, AuctionService auctionService){
        this.propertyService = propertyService;
        this.mailAuctionService = mailAuctionService;
        this.auctionRepository = auctionRepository;
        this.auctionService = auctionService;
    }
    @Async
    @Scheduled(fixedRate  = 5000,initialDelay = 180000)
    public void task() {
        List<Property> propertyList = this.propertyService.getAllProperty();
        propertyList.forEach(property -> {
            if(property.getSale() != null){
                ZonedDateTime zonedDatetimeCurrent = ZonedDateTime.now();
                long difference = zonedDatetimeCurrent.compareTo(property.getSale().getFinalDate());
                 if((difference > 0 || difference == 0) && (property.getState() == 1)) {
                     if(property.getSale() != null) {
                        long cantOffer =  this.auctionRepository.getCantOffer(property.getSale().getId());
                         if(cantOffer == 0) {
                             property.setState(3);
                             property = this.propertyService.seveProperty(property);
                             this.mailAuctionService.sendAuctionExpireEmailToSeller(property);
                        } else {
                            this.auctionService.closeAuctionExpire(property.getId());
                        }
                     }
                } else if(difference < 0 ) {
                     System.out.println("zonedDatetimeCurrent < FinalDate. No ha vencido");
                 }
            }
        });

        System.out.println("Scheduler (cron expression) task with duration : " + sdf.format(new Date()));
    }
}
