package com.productsapi.productsrestinterface.domain;

import org.springframework.data.rest.core.config.Projection;

import java.math.BigDecimal;

@Projection(name = "expandedPricePoint", types = { PricePoint.class })
public interface PricePointProjection {
    BigDecimal getPrice();
    Currency getCurrency();
}
