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
 * A UserAccount.
 */
@Entity
@Table(name = "user_account")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class UserAccount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "identification")
    private String identification;

    @Column(name = "birthdate")
    private ZonedDateTime birthdate;

    @Column(name = "profile_picture")
    private String profilePicture;

    @Column(name = "signature_picture")
    private String signaturePicture;

    @Column(name = "signature_code")
    private String signatureCode;

    @Column(name = "state")
    private Boolean state;

    @Column(name = "creation_date")
    private ZonedDateTime creationDate;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToOne
    @JoinColumn(unique = true)
    private ProfessionalProfileUser professionalProfileUser;

    @OneToMany(mappedBy = "userAccount")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Property> properties = new HashSet<>();

    @OneToMany(mappedBy = "userAccount")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Offer> offers = new HashSet<>();

    @OneToMany(mappedBy = "userAccount")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Score> scores = new HashSet<>();

    @OneToMany(mappedBy = "client")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<SupportTicket> ownedTickets = new HashSet<>();

    @OneToMany(mappedBy = "signOffUser")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<SupportTicket> clientTickets = new HashSet<>();

    @OneToMany(mappedBy = "seller")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Document> ownedDocuments = new HashSet<>();

    @OneToMany(mappedBy = "buyer")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Document> purchasedDocuments = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "userAccounts", allowSetters = true)
    private PublishingPackage publishingPackage;

    @ManyToOne
    @JsonIgnoreProperties(value = "userAccounts", allowSetters = true)
    private Role role;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdentification() {
        return identification;
    }

    public UserAccount identification(String identification) {
        this.identification = identification;
        return this;
    }

    public void setIdentification(String identification) {
        this.identification = identification;
    }

    public ZonedDateTime getBirthdate() {
        return birthdate;
    }

    public UserAccount birthdate(ZonedDateTime birthdate) {
        this.birthdate = birthdate;
        return this;
    }

    public void setBirthdate(ZonedDateTime birthdate) {
        this.birthdate = birthdate;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public UserAccount profilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
        return this;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public String getSignaturePicture() {
        return signaturePicture;
    }

    public UserAccount signaturePicture(String signaturePicture) {
        this.signaturePicture = signaturePicture;
        return this;
    }

    public void setSignaturePicture(String signaturePicture) {
        this.signaturePicture = signaturePicture;
    }

    public String getSignatureCode() {
        return signatureCode;
    }

    public UserAccount signatureCode(String signatureCode) {
        this.signatureCode = signatureCode;
        return this;
    }

    public void setSignatureCode(String signatureCode) {
        this.signatureCode = signatureCode;
    }

    public Boolean isState() {
        return state;
    }

    public UserAccount state(Boolean state) {
        this.state = state;
        return this;
    }

    public void setState(Boolean state) {
        this.state = state;
    }

    public ZonedDateTime getCreationDate() {
        return creationDate;
    }

    public UserAccount creationDate(ZonedDateTime creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(ZonedDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public User getUser() {
        return user;
    }

    public UserAccount user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ProfessionalProfileUser getProfessionalProfileUser() {
        return professionalProfileUser;
    }

    public UserAccount professionalProfileUser(ProfessionalProfileUser professionalProfileUser) {
        this.professionalProfileUser = professionalProfileUser;
        return this;
    }

    public void setProfessionalProfileUser(ProfessionalProfileUser professionalProfileUser) {
        this.professionalProfileUser = professionalProfileUser;
    }

    public Set<Property> getProperties() {
        return properties;
    }

    public UserAccount properties(Set<Property> properties) {
        this.properties = properties;
        return this;
    }

    public UserAccount addProperty(Property property) {
        this.properties.add(property);
        property.setUserAccount(this);
        return this;
    }

    public UserAccount removeProperty(Property property) {
        this.properties.remove(property);
        property.setUserAccount(null);
        return this;
    }

    public void setProperties(Set<Property> properties) {
        this.properties = properties;
    }

    public Set<Offer> getOffers() {
        return offers;
    }

    public UserAccount offers(Set<Offer> offers) {
        this.offers = offers;
        return this;
    }

    public UserAccount addOffer(Offer offer) {
        this.offers.add(offer);
        offer.setUserAccount(this);
        return this;
    }

    public UserAccount removeOffer(Offer offer) {
        this.offers.remove(offer);
        offer.setUserAccount(null);
        return this;
    }

    public void setOffers(Set<Offer> offers) {
        this.offers = offers;
    }

    public Set<Score> getScores() {
        return scores;
    }

    public UserAccount scores(Set<Score> scores) {
        this.scores = scores;
        return this;
    }

    public UserAccount addScore(Score score) {
        this.scores.add(score);
        score.setUserAccount(this);
        return this;
    }

    public UserAccount removeScore(Score score) {
        this.scores.remove(score);
        score.setUserAccount(null);
        return this;
    }

    public void setScores(Set<Score> scores) {
        this.scores = scores;
    }

    public Set<SupportTicket> getOwnedTickets() {
        return ownedTickets;
    }

    public UserAccount ownedTickets(Set<SupportTicket> supportTickets) {
        this.ownedTickets = supportTickets;
        return this;
    }

    public UserAccount addOwnedTickets(SupportTicket supportTicket) {
        this.ownedTickets.add(supportTicket);
        supportTicket.setClient(this);
        return this;
    }

    public UserAccount removeOwnedTickets(SupportTicket supportTicket) {
        this.ownedTickets.remove(supportTicket);
        supportTicket.setClient(null);
        return this;
    }

    public void setOwnedTickets(Set<SupportTicket> supportTickets) {
        this.ownedTickets = supportTickets;
    }

    public Set<SupportTicket> getClientTickets() {
        return clientTickets;
    }

    public UserAccount clientTickets(Set<SupportTicket> supportTickets) {
        this.clientTickets = supportTickets;
        return this;
    }

    public UserAccount addClientTickets(SupportTicket supportTicket) {
        this.clientTickets.add(supportTicket);
        supportTicket.setSignOffUser(this);
        return this;
    }

    public UserAccount removeClientTickets(SupportTicket supportTicket) {
        this.clientTickets.remove(supportTicket);
        supportTicket.setSignOffUser(null);
        return this;
    }

    public void setClientTickets(Set<SupportTicket> supportTickets) {
        this.clientTickets = supportTickets;
    }

    public Set<Document> getOwnedDocuments() {
        return ownedDocuments;
    }

    public UserAccount ownedDocuments(Set<Document> documents) {
        this.ownedDocuments = documents;
        return this;
    }

    public UserAccount addOwnedDocuments(Document document) {
        this.ownedDocuments.add(document);
        document.setSeller(this);
        return this;
    }

    public UserAccount removeOwnedDocuments(Document document) {
        this.ownedDocuments.remove(document);
        document.setSeller(null);
        return this;
    }

    public void setOwnedDocuments(Set<Document> documents) {
        this.ownedDocuments = documents;
    }

    public Set<Document> getPurchasedDocuments() {
        return purchasedDocuments;
    }

    public UserAccount purchasedDocuments(Set<Document> documents) {
        this.purchasedDocuments = documents;
        return this;
    }

    public UserAccount addPurchasedDocuments(Document document) {
        this.purchasedDocuments.add(document);
        document.setBuyer(this);
        return this;
    }

    public UserAccount removePurchasedDocuments(Document document) {
        this.purchasedDocuments.remove(document);
        document.setBuyer(null);
        return this;
    }

    public void setPurchasedDocuments(Set<Document> documents) {
        this.purchasedDocuments = documents;
    }

    public PublishingPackage getPublishingPackage() {
        return publishingPackage;
    }

    public UserAccount publishingPackage(PublishingPackage publishingPackage) {
        this.publishingPackage = publishingPackage;
        return this;
    }

    public void setPublishingPackage(PublishingPackage publishingPackage) {
        this.publishingPackage = publishingPackage;
    }

    public Role getRole() {
        return role;
    }

    public UserAccount role(Role role) {
        this.role = role;
        return this;
    }

    public void setRole(Role role) {
        this.role = role;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserAccount)) {
            return false;
        }
        return id != null && id.equals(((UserAccount) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserAccount{" +
            "id=" + getId() +
            ", identification='" + getIdentification() + "'" +
            ", birthdate='" + getBirthdate() + "'" +
            ", profilePicture='" + getProfilePicture() + "'" +
            ", signaturePicture='" + getSignaturePicture() + "'" +
            ", signatureCode='" + getSignatureCode() + "'" +
            ", state='" + isState() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            "}";
    }
}
