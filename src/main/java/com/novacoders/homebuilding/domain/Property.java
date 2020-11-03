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
 * A Property.
 */
@Entity
@Table(name = "property")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Property implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private Double price;

    @Column(name = "discount")
    private Integer discount;

    @Column(name = "land_square_meters")
    private Integer landSquareMeters;

    @Column(name = "area_square_meters")
    private Integer areaSquareMeters;

    @Column(name = "latitude")
    private Long latitude;

    @Column(name = "longitude")
    private Long longitude;

    @Column(name = "zoom")
    private Long zoom;

    @Column(name = "address_text")
    private String addressText;

    @Column(name = "creation_date")
    private ZonedDateTime creationDate;

    @Column(name = "state")
    private Integer state;

    @OneToOne
    @JoinColumn(unique = true)
    private Sale sale;

    @OneToOne
    @JoinColumn(unique = true)
    private Rent rent;

    @OneToMany(mappedBy = "property")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<PropertyImage> propertyImages = new HashSet<>();

    @OneToMany(mappedBy = "property")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Document> documents = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "properties", allowSetters = true)
    private UserAccount userAccount;

    @ManyToOne
    @JsonIgnoreProperties(value = "properties", allowSetters = true)
    private MoneyType moneyType;

    @ManyToOne
    @JsonIgnoreProperties(value = "properties", allowSetters = true)
    private Canton canton;

    @ManyToOne
    @JsonIgnoreProperties(value = "properties", allowSetters = true)
    private PropertyCategory propertyCategory;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Property title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public Property description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public Property price(Double price) {
        this.price = price;
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getDiscount() {
        return discount;
    }

    public Property discount(Integer discount) {
        this.discount = discount;
        return this;
    }

    public void setDiscount(Integer discount) {
        this.discount = discount;
    }

    public Integer getLandSquareMeters() {
        return landSquareMeters;
    }

    public Property landSquareMeters(Integer landSquareMeters) {
        this.landSquareMeters = landSquareMeters;
        return this;
    }

    public void setLandSquareMeters(Integer landSquareMeters) {
        this.landSquareMeters = landSquareMeters;
    }

    public Integer getAreaSquareMeters() {
        return areaSquareMeters;
    }

    public Property areaSquareMeters(Integer areaSquareMeters) {
        this.areaSquareMeters = areaSquareMeters;
        return this;
    }

    public void setAreaSquareMeters(Integer areaSquareMeters) {
        this.areaSquareMeters = areaSquareMeters;
    }

    public Long getLatitude() {
        return latitude;
    }

    public Property latitude(Long latitude) {
        this.latitude = latitude;
        return this;
    }

    public void setLatitude(Long latitude) {
        this.latitude = latitude;
    }

    public Long getLongitude() {
        return longitude;
    }

    public Property longitude(Long longitude) {
        this.longitude = longitude;
        return this;
    }

    public void setLongitude(Long longitude) {
        this.longitude = longitude;
    }

    public Long getZoom() {
        return zoom;
    }

    public Property zoom(Long zoom) {
        this.zoom = zoom;
        return this;
    }

    public void setZoom(Long zoom) {
        this.zoom = zoom;
    }

    public String getAddressText() {
        return addressText;
    }

    public Property addressText(String addressText) {
        this.addressText = addressText;
        return this;
    }

    public void setAddressText(String addressText) {
        this.addressText = addressText;
    }

    public ZonedDateTime getCreationDate() {
        return creationDate;
    }

    public Property creationDate(ZonedDateTime creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(ZonedDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public Integer getState() {
        return state;
    }

    public Property state(Integer state) {
        this.state = state;
        return this;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public Sale getSale() {
        return sale;
    }

    public Property sale(Sale sale) {
        this.sale = sale;
        return this;
    }

    public void setSale(Sale sale) {
        this.sale = sale;
    }

    public Rent getRent() {
        return rent;
    }

    public Property rent(Rent rent) {
        this.rent = rent;
        return this;
    }

    public void setRent(Rent rent) {
        this.rent = rent;
    }

    public Set<PropertyImage> getPropertyImages() {
        return propertyImages;
    }

    public Property propertyImages(Set<PropertyImage> propertyImages) {
        this.propertyImages = propertyImages;
        return this;
    }

    public Property addPropertyImage(PropertyImage propertyImage) {
        this.propertyImages.add(propertyImage);
        propertyImage.setProperty(this);
        return this;
    }

    public Property removePropertyImage(PropertyImage propertyImage) {
        this.propertyImages.remove(propertyImage);
        propertyImage.setProperty(null);
        return this;
    }

    public void setPropertyImages(Set<PropertyImage> propertyImages) {
        this.propertyImages = propertyImages;
    }

    public Set<Document> getDocuments() {
        return documents;
    }

    public Property documents(Set<Document> documents) {
        this.documents = documents;
        return this;
    }

    public Property addDocument(Document document) {
        this.documents.add(document);
        document.setProperty(this);
        return this;
    }

    public Property removeDocument(Document document) {
        this.documents.remove(document);
        document.setProperty(null);
        return this;
    }

    public void setDocuments(Set<Document> documents) {
        this.documents = documents;
    }

    public UserAccount getUserAccount() {
        return userAccount;
    }

    public Property userAccount(UserAccount userAccount) {
        this.userAccount = userAccount;
        return this;
    }

    public void setUserAccount(UserAccount userAccount) {
        this.userAccount = userAccount;
    }

    public MoneyType getMoneyType() {
        return moneyType;
    }

    public Property moneyType(MoneyType moneyType) {
        this.moneyType = moneyType;
        return this;
    }

    public void setMoneyType(MoneyType moneyType) {
        this.moneyType = moneyType;
    }

    public Canton getCanton() {
        return canton;
    }

    public Property canton(Canton canton) {
        this.canton = canton;
        return this;
    }

    public void setCanton(Canton canton) {
        this.canton = canton;
    }

    public PropertyCategory getPropertyCategory() {
        return propertyCategory;
    }

    public Property propertyCategory(PropertyCategory propertyCategory) {
        this.propertyCategory = propertyCategory;
        return this;
    }

    public void setPropertyCategory(PropertyCategory propertyCategory) {
        this.propertyCategory = propertyCategory;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Property)) {
            return false;
        }
        return id != null && id.equals(((Property) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Property{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", price=" + getPrice() +
            ", discount=" + getDiscount() +
            ", landSquareMeters=" + getLandSquareMeters() +
            ", areaSquareMeters=" + getAreaSquareMeters() +
            ", latitude=" + getLatitude() +
            ", longitude=" + getLongitude() +
            ", zoom=" + getZoom() +
            ", addressText='" + getAddressText() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", state=" + getState() +
            "}";
    }
}
