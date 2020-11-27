package com.novacoders.homebuilding.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A Document.
 */
@Entity
@Table(name = "document")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Document implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "base_64_code")
    private String base64Code;

    @Column(name = "state")
    private Boolean state;

    @Column(name = "buyer_state")
    private Boolean buyerState;

    @Column(name = "seller_state")
    private Boolean sellerState;

    @Column(name = "creation_date")
    private ZonedDateTime creationDate;

    @ManyToOne
    @JsonIgnoreProperties(value = "ownedDocuments", allowSetters = true)
    private UserAccount seller;

    @ManyToOne
    @JsonIgnoreProperties(value = "purchasedDocuments", allowSetters = true)
    private UserAccount buyer;

    @ManyToOne
    @JsonIgnoreProperties(value = "documents", allowSetters = true)
    private Property property;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBase64Code() {
        return base64Code;
    }

    public Document base64Code(String base64Code) {
        this.base64Code = base64Code;
        return this;
    }

    public void setBase64Code(String base64Code) {
        this.base64Code = base64Code;
    }

    public Boolean isState() {
        return state;
    }

    public Document state(Boolean state) {
        this.state = state;
        return this;
    }

    public void setState(Boolean state) {
        this.state = state;
    }

    public Boolean isBuyerState() {
        return buyerState;
    }

    public Document buyerState(Boolean buyerState) {
        this.buyerState = buyerState;
        return this;
    }

    public void setBuyerState(Boolean buyerState) {
        this.buyerState = buyerState;
    }

    public Boolean isSellerState() {
        return sellerState;
    }

    public Document sellerState(Boolean sellerState) {
        this.sellerState = sellerState;
        return this;
    }

    public void setSellerState(Boolean sellerState) {
        this.sellerState = sellerState;
    }

    public ZonedDateTime getCreationDate() {
        return creationDate;
    }

    public Document creationDate(ZonedDateTime creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(ZonedDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public UserAccount getSeller() {
        return seller;
    }

    public Document seller(UserAccount userAccount) {
        this.seller = userAccount;
        return this;
    }

    public void setSeller(UserAccount userAccount) {
        this.seller = userAccount;
    }

    public UserAccount getBuyer() {
        return buyer;
    }

    public Document buyer(UserAccount userAccount) {
        this.buyer = userAccount;
        return this;
    }

    public void setBuyer(UserAccount userAccount) {
        this.buyer = userAccount;
    }

    public Property getProperty() {
        return property;
    }

    public Document property(Property property) {
        this.property = property;
        return this;
    }

    public void setProperty(Property property) {
        this.property = property;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Document)) {
            return false;
        }
        return id != null && id.equals(((Document) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Document{" +
            "id=" + getId() +
            ", base64Code='" + getBase64Code() + "'" +
            ", state='" + isState() + "'" +
            ", buyerState='" + isBuyerState() + "'" +
            ", sellerState='" + isSellerState() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            "}";
    }
}
