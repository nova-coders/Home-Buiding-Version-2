package com.novacoders.homebuilding.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A SupportTicketLog.
 */
@Entity
@Table(name = "support_ticket_log")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SupportTicketLog implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "troubleshooting_commentary")
    private String troubleshootingCommentary;

    @Column(name = "next_step_commentary")
    private String nextStepCommentary;

    @Column(name = "creation_date")
    private ZonedDateTime creationDate;

    @ManyToOne
    @JsonIgnoreProperties(value = "supportTicketLogs", allowSetters = true)
    private SupportTicket supportTicket;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTroubleshootingCommentary() {
        return troubleshootingCommentary;
    }

    public SupportTicketLog troubleshootingCommentary(String troubleshootingCommentary) {
        this.troubleshootingCommentary = troubleshootingCommentary;
        return this;
    }

    public void setTroubleshootingCommentary(String troubleshootingCommentary) {
        this.troubleshootingCommentary = troubleshootingCommentary;
    }

    public String getNextStepCommentary() {
        return nextStepCommentary;
    }

    public SupportTicketLog nextStepCommentary(String nextStepCommentary) {
        this.nextStepCommentary = nextStepCommentary;
        return this;
    }

    public void setNextStepCommentary(String nextStepCommentary) {
        this.nextStepCommentary = nextStepCommentary;
    }

    public ZonedDateTime getCreationDate() {
        return creationDate;
    }

    public SupportTicketLog creationDate(ZonedDateTime creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(ZonedDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public SupportTicket getSupportTicket() {
        return supportTicket;
    }

    public SupportTicketLog supportTicket(SupportTicket supportTicket) {
        this.supportTicket = supportTicket;
        return this;
    }

    public void setSupportTicket(SupportTicket supportTicket) {
        this.supportTicket = supportTicket;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SupportTicketLog)) {
            return false;
        }
        return id != null && id.equals(((SupportTicketLog) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SupportTicketLog{" +
            "id=" + getId() +
            ", troubleshootingCommentary='" + getTroubleshootingCommentary() + "'" +
            ", nextStepCommentary='" + getNextStepCommentary() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            "}";
    }
}
