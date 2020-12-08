package com.novacoders.homebuilding.service;

import com.novacoders.homebuilding.domain.Document;
import com.novacoders.homebuilding.domain.Property;
import com.novacoders.homebuilding.domain.User;

import com.novacoders.homebuilding.domain.UserAccount;
import io.github.jhipster.config.JHipsterProperties;

import java.nio.charset.StandardCharsets;
import java.util.Locale;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

/**
 * Service for sending emails.
 * <p>
 * We use the {@link Async} annotation to send emails asynchronously.
 */
@Service
public class MailAuctionService {

    private final Logger log = LoggerFactory.getLogger(MailService.class);

    private static final String USER = "user";

    private static final String DOCUMENT = "document";

    private static final String PROPERTY = "property";

    private static final String BASE_URL = "baseUrl";

    private final JHipsterProperties jHipsterProperties;

    private final JavaMailSender javaMailSender;

    private final MessageSource messageSource;

    private final SpringTemplateEngine templateEngine;

    public MailAuctionService(JHipsterProperties jHipsterProperties, JavaMailSender javaMailSender, MessageSource messageSource, SpringTemplateEngine templateEngine) {

        this.jHipsterProperties = jHipsterProperties;
        this.javaMailSender = javaMailSender;
        this.messageSource = messageSource;
        this.templateEngine = templateEngine;
    }
    @Async
    public void sendEmail(String to, String subject, String content, boolean isMultipart, boolean isHtml) {
        log.debug("Send email[multipart '{}' and html '{}'] to '{}' with subject '{}' and content={}",
            isMultipart, isHtml, to, subject, content);

        // Prepare message using a Spring helper
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper message = new MimeMessageHelper(mimeMessage, isMultipart, StandardCharsets.UTF_8.name());
            message.setTo(to);
            message.setFrom(jHipsterProperties.getMail().getFrom());
            message.setSubject(subject);
            message.setText(content, isHtml);
            javaMailSender.send(mimeMessage);
            log.debug("Sent email to User '{}'", to);
        }  catch (MailException | MessagingException e) {
            log.warn("Email could not be sent to user '{}'", to, e);
        }
    }
    @Async
    public void sendEmailFromTemplateByUser(User user, String templateName, String titleKey) {
        if (user.getEmail() == null) {
            log.debug("Email doesn't exist for user '{}'", user.getLogin());
            return;
        }
        Locale locale = Locale.forLanguageTag(user.getLangKey());
        Context context = new Context(locale);
        context.setVariable(USER, user);
        context.setVariable(BASE_URL, jHipsterProperties.getMail().getBaseUrl());
        String content = templateEngine.process(templateName, context);
        String subject = messageSource.getMessage(titleKey, null, locale);
        sendEmail(user.getEmail(), subject, content, false, true);
    }
    @Async
    public void sendEmailFromTemplateByProperty(Property property, String templateName, String title) {
        if (property.getUserAccount().getUser().getEmail() == null) {
            log.debug("Email doesn't exist for user '{}'", property.getUserAccount().getUser().getLogin());
            return;
        }
        Locale locale = Locale.forLanguageTag(property.getUserAccount().getUser().getLangKey());
        Context context = new Context(locale);
        context.setVariable(PROPERTY, property);
        context.setVariable(BASE_URL, jHipsterProperties.getMail().getBaseUrl());
        String content = templateEngine.process(templateName, context);
        String subject = title;
        sendEmail(property.getUserAccount().getUser().getEmail(), subject, content, false, true);
    }
    @Async
    public void sendEmailFromTemplateByBuyer(Document document,String templateName, String title) {
        if (document.getBuyer().getUser().getEmail() == null) {
            log.debug("Email doesn't exist for user '{}'", document.getBuyer().getUser().getLogin());
            return;
        }
        Locale locale = Locale.forLanguageTag(document.getBuyer().getUser().getLangKey());
        Context context = new Context(locale);
        context.setVariable(DOCUMENT,document);
        context.setVariable(BASE_URL, jHipsterProperties.getMail().getBaseUrl());
        String content = templateEngine.process(templateName, context);
        String subject = title;
        sendEmail(document.getBuyer().getUser().getEmail(), subject, content, false, true);
    }
    @Async
    public void sendEmailFromTemplateBySeller(Document document,String templateName, String title) {
        if (document.getBuyer().getUser().getEmail() == null) {
            log.debug("Email doesn't exist for user '{}'", document.getBuyer().getUser().getLogin());
            return;
        }
        Locale locale = Locale.forLanguageTag(document.getBuyer().getUser().getLangKey());
        Context context = new Context(locale);
        context.setVariable(DOCUMENT,document);
        context.setVariable(BASE_URL, jHipsterProperties.getMail().getBaseUrl());
        String content = templateEngine.process(templateName, context);
        String subject = title;
        sendEmail(document.getSeller().getUser().getEmail(), subject, content, false, true);
    }
    @Async
    public void sendEmailFromTemplateByBuyerDelete(UserAccount userAccount, Property property,String templateName, String title) {
        if (userAccount.getUser().getEmail() == null) {
            log.debug("Email doesn't exist for user '{}'", userAccount.getUser().getLogin());
            return;
        }
        Locale locale = Locale.forLanguageTag(userAccount.getUser().getLangKey());
        Context context = new Context(locale);
        context.setVariable(USER,userAccount);
        context.setVariable(PROPERTY,property);
        context.setVariable(BASE_URL, jHipsterProperties.getMail().getBaseUrl());
        String content = templateEngine.process(templateName, context);
        String subject = title;
        sendEmail(userAccount.getUser().getEmail(), subject, content, false, true);
    }
    @Async
    public void sendAuctionEmailToBuyerUser(Document document) {
        if(document.getBuyer() != null && document.getSeller() != null){
            sendEmailFromTemplateByBuyer(document, "mail/auctionBuyerUserEmail", "Oferta aceptada de la subasta " + document.getProperty().getTitle());
            sendEmailFromTemplateBySeller(document, "mail/auctionExpireSellerEmail", "Se ha cerrado la subasta " + document.getProperty().getTitle() + "  de su propiedad.");
        }
    }
    @Async
    public void sendAuctionEmailToBuyerUserDelete(UserAccount userAccount, Property property) {
        if(userAccount != null && property != null){
            sendEmailFromTemplateByBuyerDelete(userAccount, property, "mail/deleteAuctionBuyerUserEmail", "Subasta eliminada");
        }
    }
    @Async
    public void sendAuctionExpireEmailToSeller(Property property) {
        if(property!= null){
            this.sendEmailFromTemplateByProperty(property, "mail/auctionExpireEmail", "Se ha cerrado la subasta "+ property.getTitle());
        }
    }
}
