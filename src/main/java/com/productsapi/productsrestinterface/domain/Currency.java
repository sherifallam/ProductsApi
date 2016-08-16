package com.productsapi.productsrestinterface.domain;

import com.productsapi.commons.domain.IdentifiableEntity;

import javax.persistence.Entity;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Currency extends IdentifiableEntity {


    @NotNull(message = "The currency name can't be null.")
    @Size(min = 1, max = 50, message = "The currency name must have a min length of 1 and max length of 50 characters.")
    private String name;
    @NotNull(message = "The currency iso3 can't be null.")
    @Size(min = 1, max = 3, message = "The currency iso3 must be 3 characters long.")
    private String iso3;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIso3() {
        return iso3;
    }

    public void setIso3(String iso3) {
        this.iso3 = iso3;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Currency currency = (Currency) o;

        return this.getId() == currency.getId();
    }

    @Override
    public int hashCode() {
        return (int) (this.getId() ^ (this.getId() >>> 32));
    }

    @Override
    public String toString() {
        return "Currency{" +
                "id=" + getId() +
                "name='" + name + '\'' +
                ", iso3='" + iso3 + '\'' +
                '}';
    }
}
