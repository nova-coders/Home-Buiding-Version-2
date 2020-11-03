package com.novacoders.homebuilding.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A ImageCategory.
 */
@Entity
@Table(name = "image_category")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class ImageCategory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "imageCategory")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<PropertyImage> propertyImages = new HashSet<>();

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

    public ImageCategory name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<PropertyImage> getPropertyImages() {
        return propertyImages;
    }

    public ImageCategory propertyImages(Set<PropertyImage> propertyImages) {
        this.propertyImages = propertyImages;
        return this;
    }

    public ImageCategory addPropertyImage(PropertyImage propertyImage) {
        this.propertyImages.add(propertyImage);
        propertyImage.setImageCategory(this);
        return this;
    }

    public ImageCategory removePropertyImage(PropertyImage propertyImage) {
        this.propertyImages.remove(propertyImage);
        propertyImage.setImageCategory(null);
        return this;
    }

    public void setPropertyImages(Set<PropertyImage> propertyImages) {
        this.propertyImages = propertyImages;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ImageCategory)) {
            return false;
        }
        return id != null && id.equals(((ImageCategory) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ImageCategory{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
