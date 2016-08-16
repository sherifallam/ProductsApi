package com.productsapi.productsrestinterface.resource;

import com.productsapi.productsrestinterface.domain.PricePoint;
import org.junit.After;
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
public class PricePointRestRepository_EndToEndTests extends EndToEndTest {
    @Autowired
    PricePointRestRepository pricePointRestRepository;
    long pricePointId = 1;

    @Test
    @Sql(executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD, scripts = "classpath:sql/pricePoints/getExistingSinglePricePoint_GivenPricePointTableWithSingleRecord_ShouldReturnPricePoint.sql")
    public void getExistingSinglePricePoint_GivenPricePointTableWithSingleRecord_ShouldReturnPricePoint() throws IOException {
        String pricePointUrl = this.pricePointsUrl() + "/" + pricePointId;
        String expectedResponse =
                "{" +
                        "  \"price\" : 4.56," +
                        "  \"_links\" : {" +
                        "    \"self\" : {" +
                        "      \"href\" : \"" + pricePointUrl + "\"" +
                        "    }," +
                        "    \"pricePoint\" : {" +
                        "      \"href\" : \"" + pricePointUrl + "{?projection}\"," +
                        "      \"templated\": true"+
                        "    }," +
                        "    \"product\" : {" +
                        "      \"href\" : \"" + pricePointUrl + "/product\"" +
                        "    }," +
                        "    \"currency\" : {" +
                        "      \"href\" : \"" + pricePointUrl + "/currency\"" +
                        "    }" +
                        "  }" +
                        "}";

        ResponseEntity<String> response = new TestRestTemplate().getForEntity(pricePointUrl, String.class);

        assertThatResponseIsExpected(expectedResponse, response, HttpStatus.OK);
    }


    @Test
    @Sql(executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD, scripts = "classpath:sql/pricePoints/getAllExistingPricePoints_GivenPricePointTableWith3Records_ShouldReturn3PricePoints.sql")
    public void getAllExistingPricePoints_GivenPricePointTableWith3Records_ShouldReturn3PricePoints() throws IOException {
        String expectedResponse =
                "{" +
                        "  \"_embedded\" : {" +
                        "    \"price-point\" : [ {" +
                        "      \"currency\" : {" +
                        "        \"name\" : \"Euro\"," +
                        "        \"iso3\" : \"EUR\"" +
                        "      }," +
                        "      \"price\" : 7.89," +
                        "      \"_links\" : {" +
                        "        \"self\" : {" +
                        "          \"href\" : \""+pricePointsUrl()+"/1\"" +
                        "        }," +
                        "        \"pricePoint\" : {" +
                        "          \"href\" : \""+pricePointsUrl()+"/1{?projection}\"," +
                        "          \"templated\" : true" +
                        "        }," +
                        "        \"currency\" : {" +
                        "          \"href\" : \""+pricePointsUrl()+"/1/currency\"" +
                        "        }," +
                        "        \"product\" : {" +
                        "          \"href\" : \""+pricePointsUrl()+"/1/product\"" +
                        "        }" +
                        "      }" +
                        "    }, {" +
                        "      \"currency\" : {" +
                        "        \"name\" : \"Dollar\"," +
                        "        \"iso3\" : \"USD\"" +
                        "      }," +
                        "      \"price\" : 1.23," +
                        "      \"_links\" : {" +
                        "        \"self\" : {" +
                        "          \"href\" : \""+pricePointsUrl()+"/2\"" +
                        "        }," +
                        "        \"pricePoint\" : {" +
                        "          \"href\" : \""+pricePointsUrl()+"/2{?projection}\"," +
                        "          \"templated\" : true" +
                        "        }," +
                        "        \"currency\" : {" +
                        "          \"href\" : \""+pricePointsUrl()+"/2/currency\"" +
                        "        }," +
                        "        \"product\" : {" +
                        "          \"href\" : \""+pricePointsUrl()+"/2/product\"" +
                        "        }" +
                        "      }" +
                        "    }, {" +
                        "      \"currency\" : {" +
                        "        \"name\" : \"British Pound\"," +
                        "        \"iso3\" : \"GBP\"" +
                        "      }," +
                        "      \"price\" : 4.56," +
                        "      \"_links\" : {" +
                        "        \"self\" : {" +
                        "          \"href\" : \""+pricePointsUrl()+"/3\"" +
                        "        }," +
                        "        \"pricePoint\" : {" +
                        "          \"href\" : \""+pricePointsUrl()+"/3{?projection}\"," +
                        "          \"templated\" : true" +
                        "        }," +
                        "        \"currency\" : {" +
                        "          \"href\" : \""+pricePointsUrl()+"/3/currency\"" +
                        "        }," +
                        "        \"product\" : {" +
                        "          \"href\" : \""+pricePointsUrl()+"/3/product\"" +
                        "        }" +
                        "      }" +
                        "    }, {" +
                        "      \"currency\" : {" +
                        "        \"name\" : \"Dollar\"," +
                        "        \"iso3\" : \"USD\"" +
                        "      }," +
                        "      \"price\" : 11.11," +
                        "      \"_links\" : {" +
                        "        \"self\" : {" +
                        "          \"href\" : \""+pricePointsUrl()+"/4\"" +
                        "        }," +
                        "        \"pricePoint\" : {" +
                        "          \"href\" : \""+pricePointsUrl()+"/4{?projection}\"," +
                        "          \"templated\" : true" +
                        "        }," +
                        "        \"currency\" : {" +
                        "          \"href\" : \""+pricePointsUrl()+"/4/currency\"" +
                        "        }," +
                        "        \"product\" : {" +
                        "          \"href\" : \""+pricePointsUrl()+"/4/product\"" +
                        "        }" +
                        "      }" +
                        "    } ]" +
                        "  }," +
                        "  \"_links\" : {" +
                        "    \"self\" : {" +
                        "      \"href\" : \""+pricePointsUrl()+"\"" +
                        "    }," +
                        "    \"profile\" : {" +
                        "      \"href\" : \""+baseUrl()+"/profile/price-points\"" +
                        "    }" +
                        "  }," +
                        "  \"page\" : {" +
                        "    \"size\" : 20," +
                        "    \"totalElements\" : 4," +
                        "    \"totalPages\" : 1," +
                        "    \"number\" : 0" +
                        "  }" +
                        "}";
        ResponseEntity<String> response = new TestRestTemplate().getForEntity(this.pricePointsUrl(), String.class);

        assertThatResponseIsExpected(expectedResponse, response, HttpStatus.OK);
    }


    @Test
    @Sql(executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD, scripts = "classpath:sql/pricePoints/deleteExistingSinglePricePoint_GivenPricePointTableWithSingleRecord_ShouldDeletePricePoint.sql")
    public void deleteExistingSinglePricePoint_GivenPricePointTableWithSingleRecord_ShouldDeletePricePoint() {
        String pricePointUrl = this.pricePointsUrl() + "/" + pricePointId;

        ResponseEntity<String> response = new TestRestTemplate().exchange(pricePointUrl, HttpMethod.DELETE, null, String.class);

        assertThat(response.getStatusCode(), equalTo(HttpStatus.NO_CONTENT));
        PricePoint PricePoint = this.pricePointRestRepository.findOne(pricePointId);
        assertThat(PricePoint, nullValue());
    }

    @Test
    @Sql(executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD, scripts = "classpath:sql/pricePoints/EmptyPricePointTable.sql")
    public void createSinglePricePoint_GivenEmptyPricePointTable_ShouldCreatePricePoint() throws IOException {
        String pricePointUrl = this.pricePointsUrl() + "/" + pricePointId;
        String expectedResponse =
                "{" +
                        "    \"price\": 1.23," +
                        "    \"_links\": {" +
                        "        \"self\": {" +
                        "            \"href\": \"" + pricePointUrl + "\"" +
                        "        }," +
                        "        \"pricePoint\": {" +
                        "            \"href\": \"" + pricePointUrl + "{?projection}\"," +
                        "            \"templated\": true"+
                        "        }," +
                        "        \"product\": {" +
                        "            \"href\": \"" + pricePointUrl + "/product\"" +
                        "        }," +
                        "        \"currency\": {" +
                        "            \"href\": \"" + pricePointUrl + "/currency\"" +
                        "        }" +
                        "    }" +
                        "}";

        ResponseEntity<String> response = new TestRestTemplate().exchange(this.pricePointsUrl(), HttpMethod.POST, new HttpEntity<>(validPricePoint(), httpHeaders()), String.class);

        assertThatResponseIsExpected(expectedResponse, response, HttpStatus.CREATED);
    }


    @Test
    @Sql(executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD, scripts = "classpath:sql/pricePoints/updateSinglePricePoint_GivenPricePointTableWithSinglePricePoint_ShouldUpdatePricePoint.sql")
    public void updateSinglePricePoint_GivenPricePointTableWithSinglePricePoint_ShouldUpdatePricePoint() throws IOException {
        String pricePointUrl = this.pricePointsUrl() + "/" + pricePointId;
        String expectedResponse =
                "{" +
                        "  \"price\": 4.56," +
                        "  \"_links\": {" +
                        "    \"self\": {" +
                        "      \"href\": \"" + pricePointUrl + "\"" +
                        "    }," +
                        "    \"pricePoint\": {" +
                        "      \"href\": \"" + pricePointUrl + "{?projection}\"," +
                        "      \"templated\": true"+
                        "    }," +
                        "    \"product\": {" +
                        "      \"href\": \"" + pricePointUrl + "/product\"" +
                        "    }," +
                        "    \"currency\": {" +
                        "      \"href\": \"" + pricePointUrl + "/currency\"" +
                        "    }" +
                        "  }" +
                        "}";

        ResponseEntity<String> response = new TestRestTemplate().exchange(pricePointUrl, HttpMethod.PUT, new HttpEntity<>(updatedPricePoint(), httpHeaders()), String.class);

        assertThatResponseIsExpected(expectedResponse, response, HttpStatus.OK);
    }

    @Test
    public void createInvalidSinglePricePoint_GivenPricePointWithMissingPrice_ShouldReturnFailureMessage() throws IOException {
        String expectedResponse =
                "[" +
                        "    {" +
                        "        \"logref\": \"-\"," +
                        "        \"message\": \"The product's price can't be null.\"," +
                        "        \"links\": []" +
                        "    }" +
                        "]";

        ResponseEntity<String> response = new TestRestTemplate().exchange(this.pricePointsUrl(), HttpMethod.POST, new HttpEntity<>(pricePointMissingPrice(), httpHeaders()), String.class);

        assertThatResponseIsExpected(expectedResponse, response, HttpStatus.BAD_REQUEST);
    }

    @Test
    public void createInvalidSinglePricePoint_GivenPricePointWithMissingProduct_ShouldReturnFailureMessage() throws IOException {
        String expectedResponse =
                "[" +
                        "  {" +
                        "    \"logref\": \"-\"," +
                        "    \"message\": \"The product can't be null.\"," +
                        "    \"links\": []" +
                        "  }" +
                        "]";

        ResponseEntity<String> response = new TestRestTemplate().exchange(this.pricePointsUrl(), HttpMethod.POST, new HttpEntity<>(pricePointMissingProduct(), httpHeaders()), String.class);

        assertThatResponseIsExpected(expectedResponse, response, HttpStatus.BAD_REQUEST);
    }

    @Test
    public void createInvalidSinglePricePoint_GivenPricePointWithMissingCurrency_ShouldReturnFailureMessage() throws IOException {
        String expectedResponse =
                "[" +
                        "  {" +
                        "    \"logref\": \"-\"," +
                        "    \"message\": \"The currency can't be null.\"," +
                        "    \"links\": []" +
                        "  }" +
                        "]";

        ResponseEntity<String> response = new TestRestTemplate().exchange(this.pricePointsUrl(), HttpMethod.POST, new HttpEntity<>(pricePointMissingCurrency(), httpHeaders()), String.class);

        assertThatResponseIsExpected(expectedResponse, response, HttpStatus.BAD_REQUEST);
    }

    private String validPricePoint() {
        return "{" +
                "    \"price\":\"1.23\"," +
                "    \"currency\":\"" + baseUrl() + "/currencies/1\"," +
                "    \"product\":\"" + baseUrl() + "/products/1\"" +
                "}";
    }

    private String updatedPricePoint() {
        return "{" +
                "    \"price\":\"4.56\"," +
                "    \"currency\":\"" + baseUrl() + "/currencies/1\"," +
                "    \"product\":\"" + baseUrl() + "/products/1\"" +
                "}";
    }

    private String pricePointMissingPrice() {
        return "{" +
                "    \"currency\":\"" + baseUrl() + "/currencies/1\"," +
                "    \"product\":\"" + baseUrl() + "/products/1\"" +
                "}";
    }

    private String pricePointMissingProduct() {
        return "{" +
                "    \"price\":\"1.23\"," +
                "    \"currency\":\"" + baseUrl() + "/currencies/1\"" +
                "}";
    }

    private String pricePointMissingCurrency() {
        return "{" +
                "    \"price\":\"1.23\"," +
                "    \"product\":\"" + baseUrl() + "/products/1\"" +
                "}";
    }
    @After
    public void cleanUpTheDB() {
        this.pricePointRestRepository.deleteAll();
    }
}
