package com.novacoders.homebuilding.web.websocket.dto;

import com.novacoders.homebuilding.domain.enumeration.NotificationType;

import java.time.ZonedDateTime;

public class NotificationDTO {
    private String title;
    private String message;
    private Boolean state;
    private NotificationType type;
    private ZonedDateTime creationDate;
    private long idTransmitter;
    private long idReceptor;

    public String getTitle() {
        return title;
    }

    public String getMessage() {
        return message;
    }

    public Boolean getState() {
        return state;
    }

    public NotificationType getType() {
        return type;
    }

    public ZonedDateTime getCreationDate() {
        return creationDate;
    }

    public long getIdTransmitter() {
        return idTransmitter;
    }

    public long getIdReceptor() {
        return idReceptor;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setState(Boolean state) {
        this.state = state;
    }

    public void setType(NotificationType type) {
        this.type = type;
    }

    public void setCreationDate(ZonedDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public void setIdTransmitter(long idTransmitter) {
        this.idTransmitter = idTransmitter;
    }

    public void setIdReceptor(long idReceptor) {
        this.idReceptor = idReceptor;
    }
}
