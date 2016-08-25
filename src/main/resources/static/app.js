'use strict';
import React from  'react';
import ReactDOM from  'react-dom';
import client from  './client';
import CurrencyList from  './currencies/CurrencyList';
import CreateCurrencyForm from  './currencies/CreateCurrencyForm';
import ProductList from  './products/ProductList';
import CreateProductForm from  './products/CreateProductForm';
import Grid from  'react-bootstrap/lib/Grid';
import Row from  'react-bootstrap/lib/Row';
import Col from  'react-bootstrap/lib/Col';
import NotificationContainer from  'react-notifications/lib/NotificationContainer';
import NotificationManager from  'react-notifications/lib/NotificationManager';
import 'react-notifications/lib/notifications.css';

class App extends React.Component {

    state = {products: [], currencies: []};

    loadAllProducts() {
        client({method: 'GET', path: '/products'}).done(response => {
            this.setState({products: response.entity._embedded.product});
        });
    }

    componentDidMount() {
        this.loadAllProducts();
        this.loadAllCurrencies();
    }

    onCreateProduct(newProduct) {
        client({
            method: 'POST',
            path: "/products/",
            entity: newProduct,
            headers: {'Content-Type': 'application/json'}
        }).done(response => {
                this.loadAllProducts();
                NotificationManager.success("Product created successfully.");
            }, errorResponse => {
                NotificationManager.error(errorResponse.entity[0].message, 'Product Creation Error', 5000);
            }
        )
    }

    onUpdateProduct(updatedProduct) {
        client({
            method: 'PUT',
            path: updatedProduct.href,
            entity: updatedProduct,
            headers: {'Content-Type': 'application/json'}
        }).done(response => {
            this.loadAllProducts();
            NotificationManager.success("Product updated successfully.");
        }, errorResponse => {
            NotificationManager.error(errorResponse.entity[0].message, 'Product Update Error', 5000);
        });
    }

    onDeleteProduct(product) {
        client({method: 'DELETE', path: product._links.self.href}).done(response => {
            this.loadAllProducts();
            NotificationManager.success("Product deleted successfully.");
        });
    }

    loadAllCurrencies() {
        client({method: 'GET', path: '/currencies'}).done(response => {
            this.setState({currencies: response.entity._embedded.currency});
        });
    }

    onCreateCurrency(newCurrency) {
        client({
            method: 'POST',
            path: "/currencies/",
            entity: newCurrency,
            headers: {'Content-Type': 'application/json'}
        }).done(response => {
                this.loadAllCurrencies();
                NotificationManager.success("Currency created successfully.");
            }, errorResponse => {
                NotificationManager.error(errorResponse.entity[0].message, 'Currency Creation Error', 5000);
            }
        )
    }

    onUpdateCurrency(updatedCurrency) {
        client({
            method: 'PUT',
            path: updatedCurrency.href,
            entity: updatedCurrency,
            headers: {'Content-Type': 'application/json'}
        }).done(response => {
            this.loadAllCurrencies();
            NotificationManager.success("Currency updated successfully.");
        }, errorResponse => {
            NotificationManager.error(errorResponse.entity[0].message, 'Currency Update Error', 5000);
        });
    }

    onDeleteCurrency(currency) {
        client({method: 'DELETE', path: currency._links.self.href}).done(response => {
            this.loadAllCurrencies();
            NotificationManager.success("Currency deleted successfully.");
        }, errorResponse => {
            NotificationManager.error(errorResponse.entity[0].message, 'Currency Deletion Error', 5000);
        });
    }

    onAddPricePoint(newPricePoint) {
        client({
            method: 'POST',
            path: "/price-points/",
            entity: newPricePoint,
            headers: {'Content-Type': 'application/json'}
        }).done(response => {
                this.loadAllProducts();
                NotificationManager.success("Price point added successfully.");
            }, errorResponse => {
                NotificationManager.error(errorResponse.entity[0].message, 'Price Point Addition Error', 5000);
            }
        )
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
