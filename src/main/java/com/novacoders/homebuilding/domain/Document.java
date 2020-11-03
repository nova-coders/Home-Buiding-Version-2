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

    @Column(name = "url")
    private String url;

    @Column(name = "seller_user_id")
    private Integer sellerUserId;

    @Column(name = "buyer_user_id")
    private Integer buyerUserId;

    @Column(name = "state")
    private Boolean state;

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

    public String getUrl() {
        return url;
    }

    public Document url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Integer getSellerUserId() {
        return sellerUserId;
    }

    public Document sellerUserId(Integer sellerUserId) {
        this.sellerUserId = sellerUserId;
        return this;
    }

    public void setSellerUserId(Integer sellerUserId) {
        this.sellerUserId = sellerUserId;
    }

    public Integer getBuyerUserId() {
        return buyerUserId;
    }

    public Document buyerUserId(Integer buyerUserId) {
        this.buyerUserId = buyerUserId;
        return this;
    }

    public void setBuyerUserId(Integer buyerUserId) {
        this.buyerUserId = buyerUserId;
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
            ", url='" + getUrl() + "'" +
            ", sellerUserId=" + getSellerUserId() +
            ", buyerUserId=" + getBuyerUserId() +
            ", state='" + isState() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            "}";
    }
}
