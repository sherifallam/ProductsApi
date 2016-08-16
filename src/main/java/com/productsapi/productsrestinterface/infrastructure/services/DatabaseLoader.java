package com.productsapi.productsrestinterface.infrastructure.services;

import com.productsapi.productsrestinterface.domain.Currency;
import com.productsapi.productsrestinterface.domain.PricePoint;
import com.productsapi.productsrestinterface.domain.Product;
import com.productsapi.productsrestinterface.resource.CurrencyRestRepository;
import com.productsapi.productsrestinterface.resource.ProductRestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.HashSet;

@Service
@Profile("!test")
public class DatabaseLoader implements CommandLineRunner {

    @Autowired
    private ProductRestRepository productRestRepository;
    @Autowired
    private CurrencyRestRepository currencyRestRepository;

    @Override
    public void run(String... strings) throws Exception {
        Currency usdCurrency = new Currency();
        usdCurrency.setName("Dollars");
        usdCurrency.setIso3("USD");
        this.currencyRestRepository.save(usdCurrency);



        Currency gbpCurrency = new Currency();
        gbpCurrency.setName("British Pound");
        gbpCurrency.setIso3("GBP");
        this.currencyRestRepository.save(gbpCurrency);



        Currency eurCurrency = new Currency();
        eurCurrency.setName("Euro");
        eurCurrency.setIso3("EUR");
        this.currencyRestRepository.save(eurCurrency);



        Product dummyProduct=new Product();
        dummyProduct.setName("dummy product");
        dummyProduct.setDescription("A dummy product for testing purposes.");
        dummyProduct.setTags("tag1,tag2,tag3");

        PricePoint usdPricePoint= new PricePoint();
        usdPricePoint.setPrice(new BigDecimal("1.23"));
        usdPricePoint.setCurrency(usdCurrency);
        usdPricePoint.setProduct(dummyProduct);

        PricePoint gbpPricePoint= new PricePoint();
        gbpPricePoint.setPrice(new BigDecimal("4.56"));
        gbpPricePoint.setCurrency(gbpCurrency);
        gbpPricePoint.setProduct(dummyProduct);

        PricePoint eurPricePoint= new PricePoint();
        eurPricePoint.setPrice(new BigDecimal("7.89"));
        eurPricePoint.setCurrency(eurCurrency);
        eurPricePoint.setProduct(dummyProduct);

        dummyProduct.setPricePoints(new HashSet<>(Arrays.asList(usdPricePoint,gbpPricePoint,eurPricePoint)));

        this.productRestRepository.save(dummyProduct);



        Product dummyProduct2 = new Product();
        dummyProduct2.setName("second dummy product");
        dummyProduct2.setDescription("A second dummy product for testing purposes.");
        dummyProduct2.setTags("tag4");

        PricePoint usdPricePoint2= new PricePoint();
        usdPricePoint2.setPrice(new BigDecimal("11.11"));
        usdPricePoint2.setCurrency(usdCurrency);
        usdPricePoint2.setProduct(dummyProduct2);

        dummyProduct2.setPricePoints(new HashSet<>(Arrays.asList(usdPricePoint2)));

        this.productRestRepository.save(dummyProduct2);



        Product dummyProduct3=new Product();
        dummyProduct3.setName("third dummy product");
        dummyProduct3.setDescription("A third dummy product for testing purposes.");
        this.productRestRepository.save(dummyProduct3);
    }
}