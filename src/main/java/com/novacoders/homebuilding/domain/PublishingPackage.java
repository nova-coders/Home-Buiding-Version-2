package com.novacoders.homebuilding.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * A PublishingPackage.
 */
@Entity
@Table(name = "publishing_package")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PublishingPackage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private Double price;

    @Column(name = "cant_property_sale")
    private Integer cantPropertySale;

    @Column(name = "cant_property_rent")
    private Integer cantPropertyRent;

    @Column(name = "cant_days")
    private Integer cantDays;

    @Column(name = "professional")
    private Boolean professional;

    @Column(name = "creation_date")
    private ZonedDateTime creationDate;

    @Column(name = "type")
    private Integer type;

    @Column(name = "state")
    private Boolean state;

    @OneToMany(mappedBy = "publishingPackage")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<UserAccount> userAccounts = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public PublishingPackage name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public PublishingPackage price(Double price) {
        this.price = price;
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getCantPropertySale() {
        return cantPropertySale;
    }

    public PublishingPackage cantPropertySale(Integer cantPropertySale) {
        this.cantPropertySale = cantPropertySale;
        return this;
    }

    public void setCantPropertySale(Integer cantPropertySale) {
        this.cantPropertySale = cantPropertySale;
    }

    public Integer getCantPropertyRent() {
        return cantPropertyRent;
    }

    public PublishingPackage cantPropertyRent(Integer cantPropertyRent) {
        this.cantPropertyRent = cantPropertyRent;
        return this;
    }

    public void setCantPropertyRent(Integer cantPropertyRent) {
        this.cantPropertyRent = cantPropertyRent;
    }

    public Integer getCantDays() {
        return cantDays;
    }

    public PublishingPackage cantDays(Integer cantDays) {
        this.cantDays = cantDays;
        return this;
    }

    public void setCantDays(Integer cantDays) {
        this.cantDays = cantDays;
    }

    public Boolean isProfessional() {
        return professional;
    }

    public PublishingPackage professional(Boolean professional) {
        this.professional = professional;
        return this;
    }

    public void setProfessional(Boolean professional) {
        this.professional = professional;
    }

    public ZonedDateTime getCreationDate() {
        return creationDate;
    }

    public PublishingPackage creationDate(ZonedDateTime creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(ZonedDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public Integer getType() {
        return type;
    }

    public PublishingPackage type(Integer type) {
        this.type = type;
        return this;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Boolean isState() {
        return state;
    }

    public PublishingPackage state(Boolean state) {
        this.state = state;
        return this;
    }

    public void setState(Boolean state) {
        this.state = state;
    }

    public Set<UserAccount> getUserAccounts() {
        return userAccounts;
    }

    public PublishingPackage userAccounts(Set<UserAccount> userAccounts) {
        this.userAccounts = userAccounts;
        return this;
    }

    public PublishingPackage addUserAccount(UserAccount userAccount) {
        this.userAccounts.add(userAccount);
        userAccount.setPublishingPackage(this);
        return this;
    }

    public PublishingPackage removeUserAccount(UserAccount userAccount) {
        this.userAccounts.remove(userAccount);
        userAccount.setPublishingPackage(null);
        return this;
    }

    public void setUserAccounts(Set<UserAccount> userAccounts) {
        this.userAccounts = userAccounts;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PublishingPackage)) {
            return false;
        }
        return id != null && id.equals(((PublishingPackage) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PublishingPackage{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", price=" + getPrice() +
            ", cantPropertySale=" + getCantPropertySale() +
            ", cantPropertyRent=" + getCantPropertyRent() +
            ", cantDays=" + getCantDays() +
            ", professional='" + isProfessional() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", type=" + getType() +
            ", state='" + isState() + "'" +
            "}";
    }
}
