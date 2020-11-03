package com.novacoders.homebuilding.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A PropertyImage.
 */
@Entity
@Table(name = "property_image")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PropertyImage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "url")
    private String url;

    @Column(name = "creation_date")
    private ZonedDateTime creationDate;

    @Column(name = "state")
    private Boolean state;

    @ManyToOne
    @JsonIgnoreProperties(value = "propertyImages", allowSetters = true)
    private Property property;

    @ManyToOne
    @JsonIgnoreProperties(value = "propertyImages", allowSetters = true)
    private ImageCategory imageCategory;

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

    public PropertyImage url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public ZonedDateTime getCreationDate() {
        return creationDate;
    }

    public PropertyImage creationDate(ZonedDateTime creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(ZonedDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public Boolean isState() {
        return state;
    }

    public PropertyImage state(Boolean state) {
        this.state = state;
        return this;
    }

    public void setState(Boolean state) {
        this.state = state;
    }

    public Property getProperty() {
        return property;
    }

    public PropertyImage property(Property property) {
        this.property = property;
        return this;
    }

    public void setProperty(Property property) {
        this.property = property;
    }

    public ImageCategory getImageCategory() {
        return imageCategory;
    }

    public PropertyImage imageCategory(ImageCategory imageCategory) {
        this.imageCategory = imageCategory;
        return this;
    }

    public void setImageCategory(ImageCategory imageCategory) {
        this.imageCategory = imageCategory;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PropertyImage)) {
            return false;
        }
        return id != null && id.equals(((PropertyImage) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PropertyImage{" +
            "id=" + getId() +
            ", url='" + getUrl() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", state='" + isState() + "'" +
            "}";
    }
}
