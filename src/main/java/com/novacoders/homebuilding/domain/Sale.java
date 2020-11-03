package com.novacoders.homebuilding.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * A Sale.
 */
@Entity
@Table(name = "sale")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Sale implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "final_date")
    private ZonedDateTime finalDate;

    @Column(name = "cadastral_plan")
    private String cadastralPlan;

    @Column(name = "registry_study")
    private String registryStudy;

    @Column(name = "property_id")
    private Integer propertyId;

    @OneToMany(mappedBy = "sale")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Offer> offers = new HashSet<>();

    @OneToOne(mappedBy = "sale")
    @JsonIgnore
    private Property property;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getFinalDate() {
        return finalDate;
    }

    public Sale finalDate(ZonedDateTime finalDate) {
        this.finalDate = finalDate;
        return this;
    }

    public void setFinalDate(ZonedDateTime finalDate) {
        this.finalDate = finalDate;
    }

    public String getCadastralPlan() {
        return cadastralPlan;
    }

    public Sale cadastralPlan(String cadastralPlan) {
        this.cadastralPlan = cadastralPlan;
        return this;
    }

    public void setCadastralPlan(String cadastralPlan) {
        this.cadastralPlan = cadastralPlan;
    }

    public String getRegistryStudy() {
        return registryStudy;
    }

    public Sale registryStudy(String registryStudy) {
        this.registryStudy = registryStudy;
        return this;
    }

    public void setRegistryStudy(String registryStudy) {
        this.registryStudy = registryStudy;
    }

    public Integer getPropertyId() {
        return propertyId;
    }

    public Sale propertyId(Integer propertyId) {
        this.propertyId = propertyId;
        return this;
    }

    public void setPropertyId(Integer propertyId) {
        this.propertyId = propertyId;
    }

    public Set<Offer> getOffers() {
        return offers;
    }

    public Sale offers(Set<Offer> offers) {
        this.offers = offers;
        return this;
    }

    public Sale addOffer(Offer offer) {
        this.offers.add(offer);
        offer.setSale(this);
        return this;
    }

    public Sale removeOffer(Offer offer) {
        this.offers.remove(offer);
        offer.setSale(null);
        return this;
    }

    public void setOffers(Set<Offer> offers) {
        this.offers = offers;
    }

    public Property getProperty() {
        return property;
    }

    public Sale property(Property property) {
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
        if (!(o instanceof Sale)) {
            return false;
        }
        return id != null && id.equals(((Sale) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Sale{" +
            "id=" + getId() +
            ", finalDate='" + getFinalDate() + "'" +
            ", cadastralPlan='" + getCadastralPlan() + "'" +
            ", registryStudy='" + getRegistryStudy() + "'" +
            ", propertyId=" + getPropertyId() +
            "}";
    }
}
