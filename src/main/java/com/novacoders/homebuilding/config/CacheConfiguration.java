package com.novacoders.homebuilding.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.boot.info.BuildProperties;
import org.springframework.boot.info.GitProperties;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import io.github.jhipster.config.cache.PrefixedKeyGenerator;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {
    private GitProperties gitProperties;
    private BuildProperties buildProperties;
    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.novacoders.homebuilding.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.novacoders.homebuilding.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.novacoders.homebuilding.domain.User.class.getName());
            createCache(cm, com.novacoders.homebuilding.domain.Authority.class.getName());
            createCache(cm, com.novacoders.homebuilding.domain.User.class.getName() + ".authorities");
            createCache(cm, com.novacoders.homebuilding.domain.MoneyType.class.getName());
            createCache(cm, com.novacoders.homebuilding.domain.MoneyType.class.getName() + ".properties");
            createCache(cm, com.novacoders.homebuilding.domain.UserAccount.class.getName());
            createCache(cm, com.novacoders.homebuilding.domain.UserAccount.class.getName() + ".properties");
            createCache(cm, com.novacoders.homebuilding.domain.UserAccount.class.getName() + ".offers");
            createCache(cm, com.novacoders.homebuilding.domain.UserAccount.class.getName() + ".scores");
            createCache(cm, com.novacoders.homebuilding.domain.UserAccount.class.getName() + ".ownedTickets");
            createCache(cm, com.novacoders.homebuilding.domain.UserAccount.class.getName() + ".clientTickets");
            createCache(cm, com.novacoders.homebuilding.domain.UserAccount.class.getName() + ".ownedDocuments");
            createCache(cm, com.novacoders.homebuilding.domain.UserAccount.class.getName() + ".purchasedDocuments");
            createCache(cm, com.novacoders.homebuilding.domain.ProfessionalProfileUser.class.getName());
            createCache(cm, com.novacoders.homebuilding.domain.SupportTicket.class.getName());
            createCache(cm, com.novacoders.homebuilding.domain.SupportTicket.class.getName() + ".supportTicketLogs");
            createCache(cm, com.novacoders.homebuilding.domain.SupportTicketLog.class.getName());
            createCache(cm, com.novacoders.homebuilding.domain.Canton.class.getName());
            createCache(cm, com.novacoders.homebuilding.domain.Canton.class.getName() + ".properties");
            createCache(cm, com.novacoders.homebuilding.domain.Province.class.getName());
            createCache(cm, com.novacoders.homebuilding.domain.Province.class.getName() + ".cantons");
            createCache(cm, com.novacoders.homebuilding.domain.Document.class.getName());
            createCache(cm, com.novacoders.homebuilding.domain.Property.class.getName());
            createCache(cm, com.novacoders.homebuilding.domain.Property.class.getName() + ".propertyImages");
            createCache(cm, com.novacoders.homebuilding.domain.Property.class.getName() + ".documents");
            createCache(cm, com.novacoders.homebuilding.domain.PropertyCategory.class.getName());
            createCache(cm, com.novacoders.homebuilding.domain.PropertyCategory.class.getName() + ".properties");
            createCache(cm, com.novacoders.homebuilding.domain.PublishingPackage.class.getName());
            createCache(cm, com.novacoders.homebuilding.domain.PublishingPackage.class.getName() + ".userAccounts");
            createCache(cm, com.novacoders.homebuilding.domain.Score.class.getName());
            createCache(cm, com.novacoders.homebuilding.domain.PropertyImage.class.getName());
            createCache(cm, com.novacoders.homebuilding.domain.ImageCategory.class.getName());
            createCache(cm, com.novacoders.homebuilding.domain.ImageCategory.class.getName() + ".propertyImages");
            createCache(cm, com.novacoders.homebuilding.domain.Sale.class.getName());
            createCache(cm, com.novacoders.homebuilding.domain.Sale.class.getName() + ".offers");
            createCache(cm, com.novacoders.homebuilding.domain.Rent.class.getName());
            createCache(cm, com.novacoders.homebuilding.domain.Rent.class.getName() + ".scores");
            createCache(cm, com.novacoders.homebuilding.domain.Offer.class.getName());
            createCache(cm, com.novacoders.homebuilding.domain.Role.class.getName());
            createCache(cm, com.novacoders.homebuilding.domain.Role.class.getName() + ".userAccounts");
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache == null) {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

    @Autowired(required = false)
    public void setGitProperties(GitProperties gitProperties) {
        this.gitProperties = gitProperties;
    }

    @Autowired(required = false)
    public void setBuildProperties(BuildProperties buildProperties) {
        this.buildProperties = buildProperties;
    }

    @Bean
    public KeyGenerator keyGenerator() {
        return new PrefixedKeyGenerator(this.gitProperties, this.buildProperties);
    }
}
