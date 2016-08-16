package com.productsapi.productsrestinterface.resource;

import com.productsapi.productsrestinterface.domain.Currency;
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
public class CurrencyRestRepository_EndToEndTests extends EndToEndTest{
    @Autowired
    CurrencyRestRepository currencyRestRepository;
    long currencyId = 1;

    @Test
    @Sql(executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD, scripts = "classpath:sql/currencies/getExistingSingleCurrency_GivenCurrencyTableWithSingleRecord_ShouldReturnCurrency.sql")
    public void getExistingSingleCurrency_GivenCurrencyTableWithSingleRecord_ShouldReturnCurrency() throws IOException {
        String currencyUrl = this.currenciesUrl() + "/" + currencyId;
        String expectedResponse =
                "{" +
                        "  \"name\" : \"Dollar\"," +
                        "  \"iso3\" : \"USD\"," +
                        "  \"_links\" : {" +
                        "    \"self\" : {" +
                        "      \"href\" : \"" + currencyUrl + "\"" +
                        "    }," +
                        "    \"currency\" : {" +
                        "      \"href\" : \"" + currencyUrl + "\"" +
                        "    }" +
                        "  }" +
                        "}";

        ResponseEntity<String> response = new TestRestTemplate().getForEntity(currencyUrl, String.class);

        assertThatResponseIsExpected(expectedResponse, response, HttpStatus.OK);
    }


    @Test
    @Sql(executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD, scripts = "classpath:sql/currencies/getAllExistingCurrencies_GivenCurrencyTableWith3Records_ShouldReturn3Currencies.sql")
    public void getAllExistingCurrencies_GivenCurrencyTableWith3Records_ShouldReturn3Currencies() throws IOException {
        String expectedResponse =
                "{" +
                        "  \"_embedded\" : {" +
                        "    \"currency\" : [ {" +
                        "      \"name\" : \"Dollar\"," +
                        "      \"iso3\" : \"USD\"," +
                        "      \"_links\" : {" +
                        "        \"self\" : {" +
                        "          \"href\" : \"" + currenciesUrl() + "/1\"" +
                        "        }," +
                        "        \"currency\" : {" +
                        "          \"href\" : \"" + currenciesUrl() + "/1\"" +
                        "        }" +
                        "      }" +
                        "    }, {" +
                        "      \"name\" : \"British Pound\"," +
                        "      \"iso3\" : \"GBP\"," +
                        "      \"_links\" : {" +
                        "        \"self\" : {" +
                        "          \"href\" : \"" + currenciesUrl() + "/2\"" +
                        "        }," +
                        "        \"currency\" : {" +
                        "          \"href\" : \"" + currenciesUrl() + "/2\"" +
                        "        }" +
                        "      }" +
                        "    }, {" +
                        "      \"name\" : \"Euro\"," +
                        "      \"iso3\" : \"EUR\"," +
                        "      \"_links\" : {" +
                        "        \"self\" : {" +
                        "          \"href\" : \"" + currenciesUrl() + "/3\"" +
                        "        }," +
                        "        \"currency\" : {" +
                        "          \"href\" : \"" + currenciesUrl() + "/3\"" +
                        "        }" +
                        "      }" +
                        "    } ]" +
                        "  }," +
                        "  \"_links\" : {" +
                        "    \"self\" : {" +
                        "      \"href\" : \"" + currenciesUrl() + "\"" +
                        "    }," +
                        "    \"profile\" : {" +
                        "      \"href\" : \""+ baseUrl()+"/profile/currencies\"" +
                        "    }," +
                        "    \"search\" : {" +
                        "      \"href\" : \"" + currenciesUrl() + "/search\"" +
                        "    }" +
                        "  }," +
                        "  \"page\" : {" +
                        "    \"size\" : 20," +
                        "    \"totalElements\" : 3," +
                        "    \"totalPages\" : 1," +
                        "    \"number\" : 0" +
                        "  }" +
                        "}";
        ResponseEntity<String> response = new TestRestTemplate().getForEntity(this.currenciesUrl(), String.class);

        assertThatResponseIsExpected(expectedResponse, response, HttpStatus.OK);
    }


    @Test
    @Sql(executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD, scripts = "classpath:sql/currencies/deleteExistingSingleCurrency_GivenCurrencyTableWithSingleRecord_ShouldDeleteCurrency.sql")
    public void deleteExistingSingleCurrency_GivenCurrencyTableWithSingleRecord_ShouldDeleteCurrency() {
        String currencyUrl = this.currenciesUrl() + "/" + currencyId;

        ResponseEntity<String> response = new TestRestTemplate().exchange(currencyUrl, HttpMethod.DELETE, null, String.class);

        assertThat(response.getStatusCode(), equalTo(HttpStatus.NO_CONTENT));
        Currency Currency = this.currencyRestRepository.findOne(currencyId);
        assertThat(Currency, nullValue());
    }

    @Test
    @Sql(executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD, scripts = "classpath:sql/currencies/EmptyCurrencyTable.sql")
    public void createSingleCurrency_GivenEmptyCurrencyTable_ShouldCreateCurrency() throws IOException {
        String currencyUrl = this.currenciesUrl() + "/" + currencyId;
        String expectedResponse =
                "{" +
                        "  \"name\" : \"Dollar\"," +
                        "  \"iso3\" : \"USD\"," +
                        "  \"_links\" : {" +
                        "    \"self\" : {" +
                        "      \"href\" : \"" + currencyUrl + "\"" +
                        "    }," +
                        "    \"currency\" : {" +
                        "      \"href\" : \"" + currencyUrl + "\"" +
                        "    }" +
                        "  }" +
                        "}";

        ResponseEntity<String> response = new TestRestTemplate().exchange(this.currenciesUrl(), HttpMethod.POST, new HttpEntity<>(validCurrency(), httpHeaders()), String.class);

        assertThatResponseIsExpected(expectedResponse, response, HttpStatus.CREATED);
    }


    @Test
    @Sql(executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD, scripts = "classpath:sql/currencies/updateSingleCurrency_GivenCurrencyTableWithSingleCurrency_ShouldUpdateCurrency.sql")
    public void updateSingleCurrency_GivenCurrencyTableWithSingleCurrency_ShouldUpdateCurrency() throws IOException {
        String currencyUrl = this.currenciesUrl() + "/" + currencyId;
        String expectedResponse =
                "{" +
                        "  \"name\": \"Japanese Yen\"," +
                        "  \"iso3\": \"JPY\"," +
                        "  \"_links\": {" +
                        "    \"self\": {" +
                        "      \"href\": \""+currencyUrl+"\"" +
                        "    }," +
                        "    \"currency\": {" +
                        "      \"href\": \""+currencyUrl+"\"" +
                        "    }" +
                        "  }" +
                        "}";

        ResponseEntity<String> response = new TestRestTemplate().exchange(currencyUrl, HttpMethod.PUT, new HttpEntity<>(updatedCurrency(), httpHeaders()), String.class);

        assertThatResponseIsExpected(expectedResponse, response, HttpStatus.OK);
    }

    @Test
    public void createInvalidSingleCurrency_GivenCurrencyWithMissingName_ShouldReturnFailureMessage() throws IOException {
        String expectedResponse =
                "[" +
                        "  {" +
                        "    \"logref\": \"-\"," +
                        "    \"message\": \"The currency name can't be null.\"," +
                        "    \"links\": []" +
                        "  }" +
                        "]";

        ResponseEntity<String> response = new TestRestTemplate().exchange(this.currenciesUrl(), HttpMethod.POST, new HttpEntity<>(currencyMissingName(), httpHeaders()), String.class);

        assertThatResponseIsExpected(expectedResponse, response, HttpStatus.BAD_REQUEST);
    }


    @Test
    public void createInvalidSingleCurrency_GivenCurrencyWithMissingDescription_ShouldReturnFailureMessage() throws IOException {
        String expectedResponse =
                "[" +
                        "  {" +
                        "    \"logref\": \"-\"," +
                        "    \"message\": \"The currency iso3 can't be null.\"," +
                        "    \"links\": []" +
                        "  }" +
                        "]";

        ResponseEntity<String> response = new TestRestTemplate().exchange(this.currenciesUrl(), HttpMethod.POST, new HttpEntity<>(currencyMissingDescription(), httpHeaders()), String.class);

        assertThatResponseIsExpected(expectedResponse, response, HttpStatus.BAD_REQUEST);
    }


    private String validCurrency() {
        return "{" +
                "    \"name\":\"Dollar\"," +
                "    \"iso3\":\"USD\"" +
                "}";
    }

    private String updatedCurrency() {
        return "{" +
                "    \"name\":\"Japanese Yen\"," +
                "    \"iso3\":\"JPY\"" +
                "}";
    }

    private String currencyMissingName() {
        return "{" +
                "    \"iso3\":\"USD\"" +
                "}";
    }

    private String currencyMissingDescription() {
        return "{" +
                "    \"name\":\"Dollar\"" +
                "}";
    }

}
