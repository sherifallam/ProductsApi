# ProductsApi
## Synopsis

The Products API is a REST service built using Spring boot and ReactJS. It allows basic CRUD operations on 3 main entities: Products, Currencies and Price points.
### Prerequisities
Maven 3.3.9+
### Installing
1. Clone the project to a folder on your machine.
2. `cd` to the project folder and run `$ mvn spring-boot:run`
3. In a browser navigate to http://localhost:8080/react

You should see the following screen:
![Home page](https://cloud.githubusercontent.com/assets/2526810/17676615/b9b3b0c6-632f-11e6-83b7-fe31abb516ca.png)

The application uses an in memory H2 database that is loaded with dummy data upon start up.

## Architecture

![Architecture](https://cloud.githubusercontent.com/assets/2526810/17679700/e514e296-633c-11e6-9bc8-242f661b21cd.png)

The 3 main entities in the service are Products, Currencies and Price points. Each Product can have multiple Price points and each Price point is linked to a Currency. Currently only a single price point per currency is allowed for each Product using a unique composite database index on the product_id and currency_id.


## Running the tests
The service is covered by end-to-end tests for each resource. To run the tests simply run `mvn test`.

Each Test class covers the 5 basic CRUD operations including creating a resource, updating a resource, deleting a resource, retreiving a single and a collection of resources in addition to a couple of invalid inputs to resource creation.
## API Reference
The api uses HATEOS as a standard for the REST response. The initial discovery point is simply `/`.

```json
$ curl http://localhost:8080/
{
    "_links": {
        "price-point": {
            "href": "http://localhost:8080/price-points{?page,size,sort,projection}",
            "templated": true
        },
        "currency": {
            "href": "http://localhost:8080/currencies{?page,size,sort}",
            "templated": true
        },
        "product": {
            "href": "http://localhost:8080/products{?page,size,sort}",
            "templated": true
        },
        "profile": {
            "href": "http://localhost:8080/profile"
        }
    }
}
```
### Product resource
#### GET a single product by id
Response code: 200

```json
$ curl http://localhost:8080/products/1
{
    "name": "dummy product",
    "description": "A dummy product for testing purposes.",
    "tags": "tag1,tag2,tag3",
    "_embedded": {
        "pricePoints": [
            {
                "currency": {
                    "name": "Dollars",
                    "iso3": "USD"
                },
                "price": 1.23,
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/price-points/1{?projection}",
                        "templated": true
                    },
                    "currency": {
                        "href": "http://localhost:8080/price-points/1/currency"
                    },
                    "product": {
                        "href": "http://localhost:8080/price-points/1/product"
                    }
                }
            }
        ]
    },
    "_links": {
        "self": {
            "href": "http://localhost:8080/products/1"
        },
        "product": {
            "href": "http://localhost:8080/products/1"
        },
        "pricePoints": {
            "href": "http://localhost:8080/products/1/pricePoints"
        }
    }
}
```
#### GET all products
Response code: 200

```json
$ curl http://localhost:8080/products
{
    "_embedded": {
        "product": [
            {
                "name": "dummy product",
                "description": "A dummy product for testing purposes.",
                "tags": "tag1,tag2,tag3",
                "_embedded": {
                    "pricePoints": [
                        {
                            "currency": {
                                "name": "Dollars",
                                "iso3": "USD"
                            },
                            "price": 1.23,
                            "_links": {
                                "self": {
                                    "href": "http://localhost:8080/price-points/1{?projection}",
                                    "templated": true
                                },
                                "currency": {
                                    "href": "http://localhost:8080/price-points/1/currency"
                                },
                                "product": {
                                    "href": "http://localhost:8080/price-points/1/product"
                                }
                            }
                        }
                    ]
                },
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/products/1"
                    },
                    "product": {
                        "href": "http://localhost:8080/products/1"
                    },
                    "pricePoints": {
                        "href": "http://localhost:8080/products/1/pricePoints"
                    }
                }
            },
            {
                "name": "second dummy product",
                "description": "A second dummy product for testing purposes.",
                "tags": "tag4",
                "_embedded": {
                    "pricePoints": [
                        {
                            "currency": {
                                "name": "Dollars",
                                "iso3": "USD"
                            },
                            "price": 11.11,
                            "_links": {
                                "self": {
                                    "href": "http://localhost:8080/price-points/2{?projection}",
                                    "templated": true
                                },
                                "currency": {
                                    "href": "http://localhost:8080/price-points/2/currency"
                                },
                                "product": {
                                    "href": "http://localhost:8080/price-points/2/product"
                                }
                            }
                        }
                    ]
                },
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/products/2"
                    },
                    "product": {
                        "href": "http://localhost:8080/products/2"
                    },
                    "pricePoints": {
                        "href": "http://localhost:8080/products/2/pricePoints"
                    }
                }
            },
            {
                "name": "third dummy product",
                "description": "A third dummy product for testing purposes.",
                "tags": null,
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/products/3"
                    },
                    "product": {
                        "href": "http://localhost:8080/products/3"
                    },
                    "pricePoints": {
                        "href": "http://localhost:8080/products/3/pricePoints"
                    }
                }
            }
        ]
    },
    "_links": {
        "self": {
            "href": "http://localhost:8080/products"
        },
        "profile": {
            "href": "http://localhost:8080/profile/products"
        }
    },
    "page": {
        "size": 20,
        "totalElements": 3,
        "totalPages": 1,
        "number": 0
    }
}
```

#### Create a product
Response code: 201
```json
$ curl -X POST -H "Content-Type: application/json" -d '{"name":"dummy product","description":"A dummy product for testing purposes.","tags":"tag1,tag2,tag3"}' http://localhost:8080/products
{
    "name": "dummy product",
    "description": "A dummy product for testing purposes.",
    "tags": "tag1,tag2,tag3",
    "_links": {
        "self": {
            "href": "http://localhost:8080/products/4"
        },
        "product": {
            "href": "http://localhost:8080/products/4"
        },
        "pricePoints": {
            "href": "http://localhost:8080/products/4/pricePoints"
        }
    }
}
```
#### Update a product
Response code: 200
```json
$ curl -X PUT -H "Content-Type: application/json" -d '{"name":"dummy product","description":"A dummy product for testing purposes.","tags":"tag1,tag2,tag3"}' http://localhost:8080/products/1
{
    "name": "new product",
    "description": "new product for testing purposes.",
    "tags": "tag4",
    "_embedded": {
        "pricePoints": [
            {
                "currency": {
                    "name": "Dollars",
                    "iso3": "USD"
                },
                "price": 1.23,
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/price-points/1{?projection}",
                        "templated": true
                    },
                    "currency": {
                        "href": "http://localhost:8080/price-points/1/currency"
                    },
                    "product": {
                        "href": "http://localhost:8080/price-points/1/product"
                    }
                }
            }
        ]
    },
    "_links": {
        "self": {
            "href": "http://localhost:8080/products/1"
        },
        "product": {
            "href": "http://localhost:8080/products/1"
        },
        "pricePoints": {
            "href": "http://localhost:8080/products/1/pricePoints"
        }
    }
}
```
#### Deleting a Product
Response code: 204
```json
$ curl -X DELETE http://localhost:8080/products/1

```

### Currency resource
#### GET a single currency by id
Response code: 200

```json
$ curl http://localhost:8080/currencies/1
{
    "name": "Dollars",
    "iso3": "USD",
    "_links": {
        "self": {
            "href": "http://localhost:8080/currencies/1"
        },
        "currency": {
            "href": "http://localhost:8080/currencies/1"
        }
    }
}
```
#### GET all currencies
Response code: 200

```json
$ curl http://localhost:8080/currencies
{
    "_embedded": {
        "currency": [
            {
                "name": "Dollars",
                "iso3": "USD",
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/currencies/1"
                    },
                    "currency": {
                        "href": "http://localhost:8080/currencies/1"
                    }
                }
            },
            {
                "name": "British Pound",
                "iso3": "GBP",
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/currencies/2"
                    },
                    "currency": {
                        "href": "http://localhost:8080/currencies/2"
                    }
                }
            },
            {
                "name": "Euro",
                "iso3": "EUR",
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/currencies/3"
                    },
                    "currency": {
                        "href": "http://localhost:8080/currencies/3"
                    }
                }
            }
        ]
    },
    "_links": {
        "self": {
            "href": "http://localhost:8080/currencies"
        },
        "profile": {
            "href": "http://localhost:8080/profile/currencies"
        },
        "search": {
            "href": "http://localhost:8080/currencies/search"
        }
    },
    "page": {
        "size": 20,
        "totalElements": 3,
        "totalPages": 1,
        "number": 0
    }
}
```

#### Create a currency
Response code: 201
```json
$ curl -X POST -H "Content-Type: application/json" -d '{"name":"dollars","iso3":"USD"}' http://localhost:8080/currencies
{
    "name": "dollars",
    "iso3": "USD",
    "_links": {
        "self": {
            "href": "http://localhost:8080/currencies/4"
        },
        "currency": {
            "href": "http://localhost:8080/currencies/4"
        }
    }
}
```
#### Update a currency
Response code: 200
```json
$ curl -X PUT -H "Content-Type: application/json" -d '{"name":"new currency","iso3":"NEW"}' http://localhost:8080/currencies/1
{
    "name": "new currency",
    "iso3": "NEW",
    "_links": {
        "self": {
            "href": "http://localhost:8080/currencies/1"
        },
        "currency": {
            "href": "http://localhost:8080/currencies/1"
        }
    }
}
```
#### Deleting a currency
Response code: 204
```json
$ curl -X DELETE http://localhost:8080/currencies/1

```


### Price point resource
#### GET a single price point by id
Response code: 200

```json
$ curl http://localhost:8080/price-points/1
{
    "price": 1.23,
    "_links": {
        "self": {
            "href": "http://localhost:8080/price-points/1"
        },
        "pricePoint": {
            "href": "http://localhost:8080/price-points/1{?projection}",
            "templated": true
        },
        "currency": {
            "href": "http://localhost:8080/price-points/1/currency"
        },
        "product": {
            "href": "http://localhost:8080/price-points/1/product"
        }
    }
}
```
#### GET all price points
Response code: 200

```json
$ curl http://localhost:8080/price-points
{
    "_embedded": {
        "price-point": [
            {
                "currency": {
                    "name": "Dollars",
                    "iso3": "USD"
                },
                "price": 1.23,
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/price-points/1"
                    },
                    "pricePoint": {
                        "href": "http://localhost:8080/price-points/1{?projection}",
                        "templated": true
                    },
                    "currency": {
                        "href": "http://localhost:8080/price-points/1/currency"
                    },
                    "product": {
                        "href": "http://localhost:8080/price-points/1/product"
                    }
                }
            },
            {
                "currency": {
                    "name": "Dollars",
                    "iso3": "USD"
                },
                "price": 11.11,
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/price-points/2"
                    },
                    "pricePoint": {
                        "href": "http://localhost:8080/price-points/2{?projection}",
                        "templated": true
                    },
                    "currency": {
                        "href": "http://localhost:8080/price-points/2/currency"
                    },
                    "product": {
                        "href": "http://localhost:8080/price-points/2/product"
                    }
                }
            }
        ]
    },
    "_links": {
        "self": {
            "href": "http://localhost:8080/price-points"
        },
        "profile": {
            "href": "http://localhost:8080/profile/price-points"
        }
    },
    "page": {
        "size": 20,
        "totalElements": 2,
        "totalPages": 1,
        "number": 0
    }
}
```

#### Create a price point
Response code: 201
```json
$ curl -X POST -H "Content-Type: application/json" -d '{"currency":"http://localhost:8080/currencies/1","product":"http://localhost:8080/products/1","price":"555"}' http://localhost:8080/price-points
{
    "price": 111,
    "_links": {
        "self": {
            "href": "http://localhost:8080/price-points/3"
        },
        "pricePoint": {
            "href": "http://localhost:8080/price-points/3{?projection}",
            "templated": true
        },
        "currency": {
            "href": "http://localhost:8080/price-points/3/currency"
        },
        "product": {
            "href": "http://localhost:8080/price-points/3/product"
        }
    }
}
```
#### Update a price point
Response code: 200
```json
$ curl -X PUT -H "Content-Type: application/json" -d '{"currency":"http://localhost:8080/currencies/1","product":"http://localhost:8080/products/3","price":"111"}' http://localhost:8080/price-points/1
{
    "price": 111,
    "_links": {
        "self": {
            "href": "http://localhost:8080/price-points/5"
        },
        "pricePoint": {
            "href": "http://localhost:8080/price-points/5{?projection}",
            "templated": true
        },
        "currency": {
            "href": "http://localhost:8080/price-points/5/currency"
        },
        "product": {
            "href": "http://localhost:8080/price-points/5/product"
        }
    }
}
```
#### Deleting a price point
Response code: 204
```json
$ curl -X DELETE http://localhost:8080/price-points/1

```
## Deployment

    $ mvn package
    $ java -jar target/productapi-0.0.1-SNAPSHOT.jar

## Author
Sherif Allam 

## License
This project is licensed under the MIT License.
