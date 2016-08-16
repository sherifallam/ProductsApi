package com.productsapi.productsrestinterface.domain;

import com.productsapi.commons.domain.IdentifiableEntity;

import javax.persistence.*;
import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Entity
@Table(
        uniqueConstraints = {@UniqueConstraint(columnNames = {"PRODUCT_ID", "CURRENCY_ID"})}
)
public class PricePoint extends IdentifiableEntity {


    @NotNull(message = "The product's price can't be null.")
    @DecimalMin(message = "The minimum product price is 0.00.", value = "0")
    @DecimalMax(message = "The maximum product price is 10000.", value = "10000")
    BigDecimal price;

    @ManyToOne
    @NotNull(message = "The currency can't be null.")
    Currency currency;

    @ManyToOne
    @JoinColumn(name = "PRODUCT_ID")
    @NotNull(message = "The product can't be null.")
    Product product;


    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }


    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Currency getCurrency() {
        return currency;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        PricePoint pricePoint = (PricePoint) o;

        return this.getId() == pricePoint.getId();
    }

    @Override
    public int hashCode() {
        return (int) (this.getId() ^ (this.getId() >>> 32));
    }

    @Override
    public String toString() {
        return "PricePoint{" +
                "id=" + getId() +
                "price=" + price +
                ", currency=" + currency +
                ", product=" + product +
                '}';
    }
}
