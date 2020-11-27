package com.novacoders.homebuilding.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

import com.novacoders.homebuilding.domain.enumeration.NotificationType;

/**
 * A Notification.
 */
@Entity
@Table(name = "notification")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Notification implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "message")
    private String message;

    @Column(name = "state")
    private Boolean state;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private NotificationType type;

    @Column(name = "creation_date")
    private ZonedDateTime creationDate;

    @ManyToOne
    @JsonIgnoreProperties(value = "sentNotifications", allowSetters = true)
    private UserAccount transmitter;

    @ManyToOne
    @JsonIgnoreProperties(value = "receivedNotifications", allowSetters = true)
    private UserAccount receptor;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Notification title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public Notification message(String message) {
        this.message = message;
        return this;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Boolean isState() {
        return state;
    }

    public Notification state(Boolean state) {
        this.state = state;
        return this;
    }

    public void setState(Boolean state) {
        this.state = state;
    }

    public NotificationType getType() {
        return type;
    }

    public Notification type(NotificationType type) {
        this.type = type;
        return this;
    }

    public void setType(NotificationType type) {
        this.type = type;
    }

    public ZonedDateTime getCreationDate() {
        return creationDate;
    }

    public Notification creationDate(ZonedDateTime creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(ZonedDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public UserAccount getTransmitter() {
        return transmitter;
    }

    public Notification transmitter(UserAccount userAccount) {
        this.transmitter = userAccount;
        return this;
    }

    public void setTransmitter(UserAccount userAccount) {
        this.transmitter = userAccount;
    }

    public UserAccount getReceptor() {
        return receptor;
    }

    public Notification receptor(UserAccount userAccount) {
        this.receptor = userAccount;
        return this;
    }

    public void setReceptor(UserAccount userAccount) {
        this.receptor = userAccount;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Notification)) {
            return false;
        }
        return id != null && id.equals(((Notification) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Notification{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", message='" + getMessage() + "'" +
            ", state='" + isState() + "'" +
            ", type='" + getType() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            "}";
    }
}
