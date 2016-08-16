package com.productsapi.productsrestinterface.domain;

import com.productsapi.commons.domain.IdentifiableEntity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Product extends IdentifiableEntity {

    @NotNull(message = "The product name can't be null.")
    @Size(min = 1, max = 50, message = "The product name must have a min length of 1 and max length of 50 characters.")
    private String name;
    @NotNull(message = "The product description can't be null.")
    @Size(min = 1, max = 50, message = "The product description must have a min length of 1 and max length of 50 characters.")
    private String description;

    private String tags;

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "product")
    Set<PricePoint> pricePoints = new HashSet<>();


    public Set<PricePoint> getPricePoints() {
        return pricePoints;
    }

    public void setPricePoints(Set<PricePoint> pricePoints) {
        this.pricePoints = pricePoints;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Product product = (Product) o;

        return this.getId() == product.getId();
    }

    @Override
    public int hashCode() {
        return (int) (this.getId() ^ (this.getId() >>> 32));
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + getId() +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", tags='" + tags + '\'' +
                ", pricePoints=" + pricePoints +
                '}';
    }
}
