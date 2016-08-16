'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
const CurrencyList = require('./currencies/CurrencyList');
const CreateCurrencyForm = require('./currencies/CreateCurrencyForm');
const ProductList = require('./products/ProductList');
const CreateProductForm = require('./products/CreateProductForm');
const Grid = require('react-bootstrap/lib/Grid');
const Row = require('react-bootstrap/lib/Row');
const Col = require('react-bootstrap/lib/Col');
const NotificationContainer = require('react-notifications/lib/NotificationContainer');
const NotificationManager = require('react-notifications/lib/NotificationManager');
require('react-notifications/lib/notifications.css');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {products: [], currencies: []};
        this.onCreateProduct = this.onCreateProduct.bind(this);
        this.onDeleteProduct = this.onDeleteProduct.bind(this);
        this.onUpdateProduct = this.onUpdateProduct.bind(this);
        this.onCreateCurrency = this.onCreateCurrency.bind(this);
        this.onDeleteCurrency = this.onDeleteCurrency.bind(this);
        this.onUpdateCurrency = this.onUpdateCurrency.bind(this);
        this.onAddPricePoint = this.onAddPricePoint.bind(this);
    }

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
            console.log(errorResponse);
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
                        <CreateProductForm onCreateProduct={this.onCreateProduct}/>
                        <ProductList products={this.state.products} currencies={this.state.currencies}
                                     onDeleteProduct={this.onDeleteProduct} onUpdateProduct={this.onUpdateProduct}
                                     onEdit={this.onEditProduct} onAddPricePoint={this.onAddPricePoint}/>
                        <CreateCurrencyForm onCreateCurrency={this.onCreateCurrency}/>
                        <CurrencyList currencies={this.state.currencies} onDeleteCurrency={this.onDeleteCurrency}
                                      onUpdateCurrency={this.onUpdateCurrency} onEditCurrency={this.onEditCurrency}/>
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
