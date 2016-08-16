package com.productsapi.productsrestinterface.resource;

import com.productsapi.productsrestinterface.domain.Currency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(collectionResourceRel = "currency", path = "currencies")
public interface CurrencyRestRepository extends JpaRepository<Currency, Long> {

    Currency findByIso3(String iso3);
}
