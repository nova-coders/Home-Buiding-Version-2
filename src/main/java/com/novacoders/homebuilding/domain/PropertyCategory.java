package com.novacoders.homebuilding.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A PropertyCategory.
 */
@Entity
@Table(name = "property_category")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PropertyCategory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "property_type")
    private String propertyType;

    @Column(name = "state")
    private Boolean state;

    @OneToMany(mappedBy = "propertyCategory")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Property> properties = new HashSet<>();

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

    public PropertyCategory name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPropertyType() {
        return propertyType;
    }

    public PropertyCategory propertyType(String propertyType) {
        this.propertyType = propertyType;
        return this;
    }

    public void setPropertyType(String propertyType) {
        this.propertyType = propertyType;
    }

    public Boolean isState() {
        return state;
    }

    public PropertyCategory state(Boolean state) {
        this.state = state;
        return this;
    }

    public void setState(Boolean state) {
        this.state = state;
    }

    public Set<Property> getProperties() {
        return properties;
    }

    public PropertyCategory properties(Set<Property> properties) {
        this.properties = properties;
        return this;
    }

    public PropertyCategory addProperty(Property property) {
        this.properties.add(property);
        property.setPropertyCategory(this);
        return this;
    }

    public PropertyCategory removeProperty(Property property) {
        this.properties.remove(property);
        property.setPropertyCategory(null);
        return this;
    }

    public void setProperties(Set<Property> properties) {
        this.properties = properties;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PropertyCategory)) {
            return false;
        }
        return id != null && id.equals(((PropertyCategory) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PropertyCategory{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", propertyType='" + getPropertyType() + "'" +
            ", state='" + isState() + "'" +
            "}";
    }
}
