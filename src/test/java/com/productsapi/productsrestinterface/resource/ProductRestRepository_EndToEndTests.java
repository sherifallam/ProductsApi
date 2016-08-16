package com.productsapi.productsrestinterface.resource;

import com.productsapi.productsrestinterface.domain.Product;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.core.IsEqual.equalTo;
import static org.hamcrest.core.IsNull.nullValue;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class ProductRestRepository_EndToEndTests extends EndToEndTest {
    @Autowired
    ProductRestRepository productRestRepository;
    long productId = 1;

    @Test
    @Sql(executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD, scripts = "classpath:sql/products/getExistingSingleProduct_GivenProductTableWithSingleRecord_ShouldReturnProduct.sql")
    public void getExistingSingleProduct_GivenProductTableWithSingleRecord_ShouldReturnProduct() throws IOException {
        String productUrl = this.productsUrl() + "/" + productId;
        String expectedResponse =
                "{" +
                        "  \"name\": \"dummy product\"," +
                        "  \"description\": \"A dummy product for testing purposes.\"," +
                        "  \"tags\" : \"tag1,tag2,tag3\","+
                        "  \"_links\": {" +
                        "    \"self\": {" +
                        "      \"href\": \"" + productUrl + "\"" +
                        "    }," +
                        "    \"product\": {" +
                        "      \"href\": \"" + productUrl + "\"" +
                        "    }," +
                        "    \"pricePoints\": {" +
                        "      \"href\": \"" + productUrl + "/pricePoints\"" +
                        "    }" +
                        "  }" +
                        "}";

        ResponseEntity<String> response = new TestRestTemplate().getForEntity(productUrl, String.class);

        assertThatResponseIsExpected(expectedResponse, response, HttpStatus.OK);
    }


    @Test
    @Sql(executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD, scripts = "classpath:sql/products/getAllExistingProducts_GivenProductTableWith3Records_ShouldReturn3Products.sql")
    public void getAllExistingProducts_GivenProductTableWith3Records_ShouldReturn3Products() throws IOException {
        String expectedResponse =
                "{" +
                        "  \"_embedded\" : {" +
                        "    \"product\" : [ {" +
                        "      \"name\" : \"dummy product\"," +
                        "      \"description\" : \"A dummy product for testing purposes.\"," +
                        "      \"tags\" : \"tag1,tag2,tag3\","+
                        "      \"_links\" : {" +
                        "        \"self\" : {" +
                        "          \"href\" : \"" + this.productsUrl() + "/1\"" +
                        "        }," +
                        "        \"product\" : {" +
                        "          \"href\" : \"" + this.productsUrl() + "/1\"" +
                        "        }," +
                        "        \"pricePoints\" : {" +
                        "          \"href\" : \"" + this.productsUrl() + "/1/pricePoints\"" +
                        "        }" +
                        "      }" +
                        "    }, {" +
                        "      \"name\" : \"second dummy product\"," +
                        "      \"description\" : \"A second dummy product for testing purposes.\"," +
                        "      \"tags\" : \"tag4\","+
                        "      \"_links\" : {" +
                        "        \"self\" : {" +
                        "          \"href\" : \"" + this.productsUrl() + "/2\"" +
                        "        }," +
                        "        \"product\" : {" +
                        "          \"href\" : \"" + this.productsUrl() + "/2\"" +
                        "        }," +
                        "        \"pricePoints\" : {" +
                        "          \"href\" : \"" + this.productsUrl() + "/2/pricePoints\"" +
                        "        }" +
                        "      }" +
                        "    }, {" +
                        "      \"name\" : \"third dummy product\"," +
                        "      \"description\" : \"A third dummy product for testing purposes.\"," +
                        "      \"tags\" : null,"+
                        "      \"_links\" : {" +
                        "        \"self\" : {" +
                        "          \"href\" : \"" + this.productsUrl() + "/3\"" +
                        "        }," +
                        "        \"product\" : {" +
                        "          \"href\" : \"" + this.productsUrl() + "/3\"" +
                        "        }," +
                        "        \"pricePoints\" : {" +
                        "          \"href\" : \"" + this.productsUrl() + "/3/pricePoints\"" +
                        "        }" +
                        "      }" +
                        "    } ]" +
                        "  }," +
                        "  \"_links\" : {" +
                        "    \"self\" : {" +
                        "      \"href\" : \"" + this.productsUrl() + "\"" +
                        "    }," +
                        "    \"profile\" : {" +
                        "      \"href\" : \"" + this.baseUrl() + "/profile/products\"" +
                        "    }" +
                        "  }," +
                        "  \"page\" : {" +
                        "    \"size\" : 20," +
                        "    \"totalElements\" : 3," +
                        "    \"totalPages\" : 1," +
                        "    \"number\" : 0" +
                        "  }" +
                        "}";
        ResponseEntity<String> response = new TestRestTemplate().getForEntity(this.productsUrl(), String.class);

        assertThatResponseIsExpected(expectedResponse, response, HttpStatus.OK);
    }


    @Test
    @Sql(executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD, scripts = "classpath:sql/products/deleteExistingSingleProduct_GivenProductTableWithSingleRecord_ShouldDeleteProduct.sql")
    public void deleteExistingSingleProduct_GivenProductTableWithSingleRecord_ShouldDeleteProduct() {
        String productUrl = this.productsUrl() + "/" + productId;

        ResponseEntity<String> response = new TestRestTemplate().exchange(productUrl, HttpMethod.DELETE, null, String.class);

        assertThat(response.getStatusCode(), equalTo(HttpStatus.NO_CONTENT));
        Product Product = this.productRestRepository.findOne(productId);
        assertThat(Product, nullValue());
    }

    @Test
    @Sql(executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD, scripts = "classpath:sql/products/EmptyProductTable.sql")
    public void createSingleProduct_GivenEmptyProductTable_ShouldCreateProduct() throws IOException {
        String productUrl = this.productsUrl() + "/" + productId;
        String expectedResponse =
                "{" +
                        "  \"name\": \"dummy product\"," +
                        "  \"description\": \"A dummy product for testing purposes.\"," +
                        "  \"tags\" : \"tag1,tag2,tag3\","+
                        "  \"_links\": {" +
                        "    \"self\": {" +
                        "      \"href\": \"" + productUrl + "\"" +
                        "    }," +
                        "    \"product\": {" +
                        "      \"href\": \"" + productUrl + "\"" +
                        "    }," +
                        "    \"pricePoints\": {" +
                        "      \"href\": \"" + productUrl + "/pricePoints\"" +
                        "    }" +
                        "  }" +
                        "}";

        ResponseEntity<String> response = new TestRestTemplate().exchange(this.productsUrl(), HttpMethod.POST, new HttpEntity<>(validProduct(), httpHeaders()), String.class);

        assertThatResponseIsExpected(expectedResponse, response, HttpStatus.CREATED);
    }


    @Test
    @Sql(executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD, scripts = "classpath:sql/products/updateSingleProduct_GivenProductTableWithSingleProduct_ShouldUpdateProduct.sql")
    public void updateSingleProduct_GivenProductTableWithSingleProduct_ShouldUpdateProduct() throws IOException {
        String productUrl = this.productsUrl() + "/" + productId;
        String expectedResponse =
                "{" +
                        "  \"name\": \"updated product name\"," +
                        "  \"description\": \"updated product description.\"," +
                        "  \"tags\" : \"tag4\","+
                        "  \"_links\": {" +
                        "    \"self\": {" +
                        "      \"href\": \"" + productUrl + "\"" +
                        "    }," +
                        "    \"product\": {" +
                        "      \"href\": \"" + productUrl + "\"" +
                        "    }," +
                        "    \"pricePoints\": {" +
                        "      \"href\": \"" + productUrl + "/pricePoints\"" +
                        "    }" +
                        "  }" +
                        "}";

        ResponseEntity<String> response = new TestRestTemplate().exchange(productUrl, HttpMethod.PUT, new HttpEntity<>(updatedProduct(), httpHeaders()), String.class);

        assertThatResponseIsExpected(expectedResponse, response, HttpStatus.OK);
    }

    @Test
    public void createInvalidSingleProduct_GivenProductWithMissingName_ShouldReturnFailureMessage() throws IOException {
        String expectedResponse =
                "[" +
                        "  {" +
                        "    \"logref\": \"-\"," +
                        "    \"message\": \"The product name can't be null.\"," +
                        "    \"links\": []" +
                        "  }" +
                        "]";

        ResponseEntity<String> response = new TestRestTemplate().exchange(this.productsUrl(), HttpMethod.POST, new HttpEntity<>(productMissingName(), httpHeaders()), String.class);

        assertThatResponseIsExpected(expectedResponse, response, HttpStatus.BAD_REQUEST);
    }


    @Test
    public void createInvalidSingleProduct_GivenProductWithMissingDescription_ShouldReturnFailureMessage() throws IOException {
        String expectedResponse =
                "[" +
                        "  {" +
                        "    \"logref\": \"-\"," +
                        "    \"message\": \"The product description can't be null.\"," +
                        "    \"links\": []" +
                        "  }" +
                        "]";

        ResponseEntity<String> response = new TestRestTemplate().exchange(this.productsUrl(), HttpMethod.POST, new HttpEntity<>(productMissingDescription(), httpHeaders()), String.class);

        assertThatResponseIsExpected(expectedResponse, response, HttpStatus.BAD_REQUEST);
    }

    private String validProduct() {
        return "{" +
                "    \"name\":\"dummy product\"," +
                "    \"description\":\"A dummy product for testing purposes.\"," +
                "    \"tags\" : \"tag1,tag2,tag3\""+
                "}";
    }

    private String updatedProduct() {
        return "{" +
                "    \"name\":\"updated product name\"," +
                "    \"description\":\"updated product description.\"," +
                "    \"tags\" : \"tag4\""+
                "}";
    }

    private String productMissingName() {
        return "{" +
                "    \"description\":\"A dummy product for testing purposes.\"" +
                "}";
    }

    private String productMissingDescription() {
        return "{" +
                "    \"name\":\"dummy product\"" +
                "}";
    }

}
