package com.productsapi.productsrestinterface.resource;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.context.embedded.LocalServerPort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.io.IOException;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.IsEqual.equalTo;


public abstract class EndToEndTest {
    @LocalServerPort
    private String testPort;

    protected String baseUrl() {
        return "http://localhost:" + this.testPort;
    }

    protected String currenciesUrl() {
        return baseUrl() + "/currencies";
    }

    protected String pricePointsUrl() {
        return baseUrl() + "/price-points";
    }
    protected String productsUrl() {
        return baseUrl() + "/products";
    }

    protected void assertThatResponseIsExpected(String expectedResponse, ResponseEntity<String> response, HttpStatus responseStatusCode) throws IOException {
        JsonNode responseJson = getJsonResponse(response.getBody());

        assertThat(response.getStatusCode(), equalTo(responseStatusCode));
        assertThat(responseJson.isMissingNode(), is(false));
        assertThat(responseJson, is(getJsonResponse(expectedResponse)));
    }

    private JsonNode getJsonResponse(String response) throws IOException {
        return new ObjectMapper().readTree(response);
    }

    protected HttpHeaders httpHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", MediaType.APPLICATION_JSON_VALUE);
        return headers;
    }
}
