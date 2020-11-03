package com.novacoders.homebuilding.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * A SupportTicket.
 */
@Entity
@Table(name = "support_ticket")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SupportTicket implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "message")
    private String message;

    @Column(name = "creation_date")
    private ZonedDateTime creationDate;

    @Column(name = "state")
    private Boolean state;

    @OneToMany(mappedBy = "supportTicket")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<SupportTicketLog> supportTicketLogs = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "ownedTickets", allowSetters = true)
    private UserAccount client;

    @ManyToOne
    @JsonIgnoreProperties(value = "clientTickets", allowSetters = true)
    private UserAccount signOffUser;

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

    public SupportTicket title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public SupportTicket message(String message) {
        this.message = message;
        return this;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public ZonedDateTime getCreationDate() {
        return creationDate;
    }

    public SupportTicket creationDate(ZonedDateTime creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(ZonedDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public Boolean isState() {
        return state;
    }

    public SupportTicket state(Boolean state) {
        this.state = state;
        return this;
    }

    public void setState(Boolean state) {
        this.state = state;
    }

    public Set<SupportTicketLog> getSupportTicketLogs() {
        return supportTicketLogs;
    }

    public SupportTicket supportTicketLogs(Set<SupportTicketLog> supportTicketLogs) {
        this.supportTicketLogs = supportTicketLogs;
        return this;
    }

    public SupportTicket addSupportTicketLog(SupportTicketLog supportTicketLog) {
        this.supportTicketLogs.add(supportTicketLog);
        supportTicketLog.setSupportTicket(this);
        return this;
    }

    public SupportTicket removeSupportTicketLog(SupportTicketLog supportTicketLog) {
        this.supportTicketLogs.remove(supportTicketLog);
        supportTicketLog.setSupportTicket(null);
        return this;
    }

    public void setSupportTicketLogs(Set<SupportTicketLog> supportTicketLogs) {
        this.supportTicketLogs = supportTicketLogs;
    }

    public UserAccount getClient() {
        return client;
    }

    public SupportTicket client(UserAccount userAccount) {
        this.client = userAccount;
        return this;
    }

    public void setClient(UserAccount userAccount) {
        this.client = userAccount;
    }

    public UserAccount getSignOffUser() {
        return signOffUser;
    }

    public SupportTicket signOffUser(UserAccount userAccount) {
        this.signOffUser = userAccount;
        return this;
    }

    public void setSignOffUser(UserAccount userAccount) {
        this.signOffUser = userAccount;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SupportTicket)) {
            return false;
        }
        return id != null && id.equals(((SupportTicket) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SupportTicket{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", message='" + getMessage() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", state='" + isState() + "'" +
            "}";
    }
}
