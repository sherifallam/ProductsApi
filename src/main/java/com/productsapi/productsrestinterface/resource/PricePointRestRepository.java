package com.productsapi.productsrestinterface.resource;

import com.productsapi.productsrestinterface.domain.PricePoint;
import com.productsapi.productsrestinterface.domain.PricePointProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(collectionResourceRel = "price-point", path = "price-points",excerptProjection = PricePointProjection.class)
public interface PricePointRestRepository extends JpaRepository<PricePoint, Long> {
}
