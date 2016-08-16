package com.productsapi.productsrestinterface.resource;

import com.productsapi.productsrestinterface.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(collectionResourceRel = "product", path = "products")
public interface ProductRestRepository extends JpaRepository<Product, Long> {
}
