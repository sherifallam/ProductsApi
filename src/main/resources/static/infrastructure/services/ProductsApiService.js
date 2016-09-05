import {client} from "../../client";

class ProductApiService{

    createProduct(newProduct) {
        return client({
            method: 'POST',
            path: "/products/",
            entity: newProduct,
            headers: {'Content-Type': 'application/json'}
        });
    }

    updateProduct(updatedProduct) {
        return client({
            method: 'PUT',
            path: updatedProduct.href,
            entity: updatedProduct,
            headers: {'Content-Type': 'application/json'}
        });
    }

    deleteProduct(product) {
        return client({method: 'DELETE', path: product._links.self.href});
    }

    addPricePoint(newPricePoint) {
        return client({
            method: 'POST',
            path: "/price-points/",
            entity: newPricePoint,
            headers: {'Content-Type': 'application/json'}
        });
    }

    deleteCurrency(currency) {
        return client({method: 'DELETE', path: currency._links.self.href});
    }

    updateCurrency(updatedCurrency) {
        return client({
            method: 'PUT',
            path: updatedCurrency.href,
            entity: updatedCurrency,
            headers: {'Content-Type': 'application/json'}
        });
    }

    createCurrency(newCurrency) {
        return client({
            method: 'POST',
            path: "/currencies/",
            entity: newCurrency,
            headers: {'Content-Type': 'application/json'}
        });
    }

    getAllProducts() {
        return client({method: 'GET', path: '/products'});
    }

    getAllCurrencies() {
        return client({method: 'GET', path: '/currencies'});
    }

}


export default new ProductApiService();