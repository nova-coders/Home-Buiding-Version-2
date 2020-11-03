package com.novacoders.homebuilding.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Rent.
 */
@Entity
@Table(name = "rent")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Rent implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "deposit")
    private Integer deposit;

    @OneToMany(mappedBy = "rent")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Score> scores = new HashSet<>();

    @OneToOne(mappedBy = "rent")
    @JsonIgnore
    private Property property;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getDeposit() {
        return deposit;
    }

    public Rent deposit(Integer deposit) {
        this.deposit = deposit;
        return this;
    }

    public void setDeposit(Integer deposit) {
        this.deposit = deposit;
    }

    public Set<Score> getScores() {
        return scores;
    }

    public Rent scores(Set<Score> scores) {
        this.scores = scores;
        return this;
    }

    public Rent addScore(Score score) {
        this.scores.add(score);
        score.setRent(this);
        return this;
    }

    public Rent removeScore(Score score) {
        this.scores.remove(score);
        score.setRent(null);
        return this;
    }

    public void setScores(Set<Score> scores) {
        this.scores = scores;
    }

    public Property getProperty() {
        return property;
    }

    public Rent property(Property property) {
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
        if (!(o instanceof Rent)) {
            return false;
        }
        return id != null && id.equals(((Rent) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Rent{" +
            "id=" + getId() +
            ", deposit=" + getDeposit() +
            "}";
    }
}
