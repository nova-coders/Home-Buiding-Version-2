package com.novacoders.homebuilding.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A Offer.
 */
@Entity
@Table(name = "offer")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Offer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date")
    private ZonedDateTime date;

    @Column(name = "commentary")
    private String commentary;

    @Column(name = "amount")
    private Double amount;

    @Column(name = "state")
    private Boolean state;

    @ManyToOne
    @JsonIgnoreProperties(value = "offers", allowSetters = true)
    private UserAccount userAccount;

    @ManyToOne
    @JsonIgnoreProperties(value = "offers", allowSetters = true)
    private Sale sale;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public Offer date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public String getCommentary() {
        return commentary;
    }

    public Offer commentary(String commentary) {
        this.commentary = commentary;
        return this;
    }

    public void setCommentary(String commentary) {
        this.commentary = commentary;
    }

    public Double getAmount() {
        return amount;
    }

    public Offer amount(Double amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Boolean isState() {
        return state;
    }

    public Offer state(Boolean state) {
        this.state = state;
        return this;
    }

    public void setState(Boolean state) {
        this.state = state;
    }

    public UserAccount getUserAccount() {
        return userAccount;
    }

    public Offer userAccount(UserAccount userAccount) {
        this.userAccount = userAccount;
        return this;
    }

    public void setUserAccount(UserAccount userAccount) {
        this.userAccount = userAccount;
    }

    public Sale getSale() {
        return sale;
    }

    public Offer sale(Sale sale) {
        this.sale = sale;
        return this;
    }

    public void setSale(Sale sale) {
        this.sale = sale;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Offer)) {
            return false;
        }
        return id != null && id.equals(((Offer) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Offer{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", commentary='" + getCommentary() + "'" +
            ", amount=" + getAmount() +
            ", state='" + isState() + "'" +
            "}";
    }
}
