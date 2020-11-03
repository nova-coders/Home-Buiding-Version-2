package com.novacoders.homebuilding.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A Score.
 */
@Entity
@Table(name = "score")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Score implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "rating")
    private Integer rating;

    @Column(name = "commentary")
    private String commentary;

    @Column(name = "creation_date")
    private ZonedDateTime creationDate;

    @Column(name = "state")
    private Boolean state;

    @ManyToOne
    @JsonIgnoreProperties(value = "scores", allowSetters = true)
    private UserAccount userAccount;

    @ManyToOne
    @JsonIgnoreProperties(value = "scores", allowSetters = true)
    private Rent rent;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getRating() {
        return rating;
    }

    public Score rating(Integer rating) {
        this.rating = rating;
        return this;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getCommentary() {
        return commentary;
    }

    public Score commentary(String commentary) {
        this.commentary = commentary;
        return this;
    }

    public void setCommentary(String commentary) {
        this.commentary = commentary;
    }

    public ZonedDateTime getCreationDate() {
        return creationDate;
    }

    public Score creationDate(ZonedDateTime creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(ZonedDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public Boolean isState() {
        return state;
    }

    public Score state(Boolean state) {
        this.state = state;
        return this;
    }

    public void setState(Boolean state) {
        this.state = state;
    }

    public UserAccount getUserAccount() {
        return userAccount;
    }

    public Score userAccount(UserAccount userAccount) {
        this.userAccount = userAccount;
        return this;
    }

    public void setUserAccount(UserAccount userAccount) {
        this.userAccount = userAccount;
    }

    public Rent getRent() {
        return rent;
    }

    public Score rent(Rent rent) {
        this.rent = rent;
        return this;
    }

    public void setRent(Rent rent) {
        this.rent = rent;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Score)) {
            return false;
        }
        return id != null && id.equals(((Score) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Score{" +
            "id=" + getId() +
            ", rating=" + getRating() +
            ", commentary='" + getCommentary() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", state='" + isState() + "'" +
            "}";
    }
}
