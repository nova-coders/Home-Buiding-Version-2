package com.novacoders.homebuilding.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A ProfessionalProfileUser.
 */
@Entity
@Table(name = "professional_profile_user")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ProfessionalProfileUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "profesional_type")
    private Integer profesionalType;

    @Column(name = "price_per_hour")
    private Double pricePerHour;

    @Column(name = "description")
    private String description;

    @Column(name = "creation_date")
    private ZonedDateTime creationDate;

    @Column(name = "state")
    private Boolean state;

    @OneToOne(mappedBy = "professionalProfileUser")
    @JsonIgnore
    private UserAccount userAccount;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getProfesionalType() {
        return profesionalType;
    }

    public ProfessionalProfileUser profesionalType(Integer profesionalType) {
        this.profesionalType = profesionalType;
        return this;
    }

    public void setProfesionalType(Integer profesionalType) {
        this.profesionalType = profesionalType;
    }

    public Double getPricePerHour() {
        return pricePerHour;
    }

    public ProfessionalProfileUser pricePerHour(Double pricePerHour) {
        this.pricePerHour = pricePerHour;
        return this;
    }

    public void setPricePerHour(Double pricePerHour) {
        this.pricePerHour = pricePerHour;
    }

    public String getDescription() {
        return description;
    }

    public ProfessionalProfileUser description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ZonedDateTime getCreationDate() {
        return creationDate;
    }

    public ProfessionalProfileUser creationDate(ZonedDateTime creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(ZonedDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public Boolean isState() {
        return state;
    }

    public ProfessionalProfileUser state(Boolean state) {
        this.state = state;
        return this;
    }

    public void setState(Boolean state) {
        this.state = state;
    }

    public UserAccount getUserAccount() {
        return userAccount;
    }

    public ProfessionalProfileUser userAccount(UserAccount userAccount) {
        this.userAccount = userAccount;
        return this;
    }

    public void setUserAccount(UserAccount userAccount) {
        this.userAccount = userAccount;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProfessionalProfileUser)) {
            return false;
        }
        return id != null && id.equals(((ProfessionalProfileUser) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProfessionalProfileUser{" +
            "id=" + getId() +
            ", profesionalType=" + getProfesionalType() +
            ", pricePerHour=" + getPricePerHour() +
            ", description='" + getDescription() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", state='" + isState() + "'" +
            "}";
    }
}
