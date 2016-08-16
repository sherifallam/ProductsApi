const React = require('react');
const PricePointForm = require('../pricePoints/PricePointForm');
const Button = require('react-bootstrap/lib/Button');

class ProductDetails extends React.Component {
    constructor(props) {
        super(props);
        this.onDeleteProduct = this.onDeleteProduct.bind(this);
        this.onEditProduct = this.onEditProduct.bind(this);
    }

    onDeleteProduct() {
        this.props.onDeleteProduct(this.props.product);
    }

    onEditProduct() {
        this.props.onEditProduct(this.props.product);
    }

    render() {
        var pricePoints = null;
        if (this.props.product._embedded != null) {
            pricePoints = this.props.product._embedded.pricePoints.map(pricePoint =>
                <div pricePoint={pricePoint}>{pricePoint.price +" "+ pricePoint.currency.iso3}</div>
            );
        }
        return (


            <tr className={this.props.editMode ? "displayNone" : ""}>
                <td>{this.props.product.name}</td>
                <td>{this.props.product.description}</td>
                <td>{this.props.product.tags}</td>
                <td>{pricePoints}</td>
                <td>
                    <PricePointForm currencies={this.props.currencies} product={this.props.product}
                                      onAddPricePoint={this.props.onAddPricePoint}/>
                </td>
                <td>
                    <Button bsStyle="danger" onClick={this.onDeleteProduct}>Delete</Button>
                    <Button onClick={this.onEditProduct}>Edit</Button>
                </td>
            </tr>
        )
    }
}
module.exports = ProductDetails;