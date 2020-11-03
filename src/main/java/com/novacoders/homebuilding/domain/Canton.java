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
 * A Canton.
 */
@Entity
@Table(name = "canton")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Canton implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "state")
    private Boolean state;

    @Column(name = "creation_date")
    private ZonedDateTime creationDate;

    @OneToMany(mappedBy = "canton")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Property> properties = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "cantons", allowSetters = true)
    private Province province;

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

    public Canton name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean isState() {
        return state;
    }

    public Canton state(Boolean state) {
        this.state = state;
        return this;
    }

    public void setState(Boolean state) {
        this.state = state;
    }

    public ZonedDateTime getCreationDate() {
        return creationDate;
    }

    public Canton creationDate(ZonedDateTime creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(ZonedDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public Set<Property> getProperties() {
        return properties;
    }

    public Canton properties(Set<Property> properties) {
        this.properties = properties;
        return this;
    }

    public Canton addProperty(Property property) {
        this.properties.add(property);
        property.setCanton(this);
        return this;
    }

    public Canton removeProperty(Property property) {
        this.properties.remove(property);
        property.setCanton(null);
        return this;
    }

    public void setProperties(Set<Property> properties) {
        this.properties = properties;
    }

    public Province getProvince() {
        return province;
    }

    public Canton province(Province province) {
        this.province = province;
        return this;
    }

    public void setProvince(Province province) {
        this.province = province;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Canton)) {
            return false;
        }
        return id != null && id.equals(((Canton) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Canton{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", state='" + isState() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            "}";
    }
}
