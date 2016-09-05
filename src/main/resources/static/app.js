import React from "react";
import ReactDOM from "react-dom";
import ProductApiService from "./infrastructure/services/ProductsApiService";
import CurrencyList from "./currencies/CurrencyList";
import CreateCurrencyForm from "./currencies/CreateCurrencyForm";
import ProductList from "./products/ProductList";
import CreateProductForm from "./products/CreateProductForm";
import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import NotificationManager from "react-notifications/lib/NotificationManager";
import "react-notifications/lib/notifications.css";
class App extends React.Component {

    state = {products: [], currencies: []};

    loadAllProducts() {
        ProductApiService.getAllProducts().then(response => {
            this.setState({products: response.entity._embedded.product});
        });
    }

    componentDidMount() {
        this.loadAllProducts();
        this.loadAllCurrencies();
    }

    onCreateProduct(newProduct) {
        ProductApiService.createProduct(newProduct).then(response => {
                this.loadAllProducts();
                NotificationManager.success("Product created successfully.");
            }
        ).catch(errorResponse => {
            NotificationManager.error(errorResponse.entity[0].message, 'Product Creation Error', 5000);
        });
    }


    onUpdateProduct(updatedProduct) {
        ProductApiService.updateProduct(updatedProduct).then(response => {
            this.loadAllProducts();
            NotificationManager.success("Product updated successfully.");
        }).catch(errorResponse => {
            NotificationManager.error(errorResponse.entity[0].message, 'Product Update Error', 5000);
        });
    }


    onDeleteProduct(product) {
        ProductApiService.deleteProduct(product).then(response => {
            this.loadAllProducts();
            NotificationManager.success("Product deleted successfully.");
        });
    }


    loadAllCurrencies() {
        ProductApiService.getAllCurrencies().then(response => {
            this.setState({currencies: response.entity._embedded.currency});
        });
    }


    onCreateCurrency(newCurrency) {
        ProductApiService.createCurrency(newCurrency).then(response => {
            this.loadAllCurrencies();
            NotificationManager.success("Currency created successfully.");
        }).catch(errorResponse => {
                NotificationManager.error(errorResponse.entity[0].message, 'Currency Creation Error', 5000);
            }
        );
    }


    onUpdateCurrency(updatedCurrency) {
        ProductApiService.updateCurrency(updatedCurrency).then(response => {
            this.loadAllCurrencies();
            NotificationManager.success("Currency updated successfully.");
        }).catch(errorResponse => {
            NotificationManager.error(errorResponse.entity[0].message, 'Currency Update Error', 5000);
        });
    }


    onDeleteCurrency(currency) {
        ProductApiService.deleteCurrency(currency).then(response => {
            this.loadAllCurrencies();
            NotificationManager.success("Currency deleted successfully.");
        }).catch(errorResponse => {
            NotificationManager.error(errorResponse.entity[0].message, 'Currency Deletion Error', 5000);
        });
    }


    onAddPricePoint(newPricePoint) {
        ProductApiService.addPricePoint(newPricePoint).then(response => {
            this.loadAllProducts();
            NotificationManager.success("Price point added successfully.");
        }).catch(errorResponse => {
                NotificationManager.error(errorResponse.entity[0].message, 'Price Point Addition Error', 5000);
            }
        );
    }


    render() {
        return (
            <Grid fluid>
                <Row >
                    <Col xs={12}>
                        <NotificationContainer/>
                        <CreateProductForm onCreateProduct={::this.onCreateProduct}/>
                        <ProductList products={this.state.products} currencies={this.state.currencies}
                                     onDeleteProduct={::this.onDeleteProduct} onUpdateProduct={::this.onUpdateProduct}
                                     onEdit={this.onEditProduct} onAddPricePoint={::this.onAddPricePoint}/>
                        <CreateCurrencyForm onCreateCurrency={::this.onCreateCurrency}/>
                        <CurrencyList currencies={this.state.currencies} onDeleteCurrency={::this.onDeleteCurrency}
                                      onUpdateCurrency={::this.onUpdateCurrency} onEditCurrency={this.onEditCurrency}/>
                    </Col>
                </Row>
            </Grid>

        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
);
