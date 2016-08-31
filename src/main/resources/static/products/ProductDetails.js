import React from  'react';
import PricePointForm from  '../pricePoints/PricePointForm';
import Button from  'react-bootstrap/lib/Button';

export default class ProductDetails extends React.Component {
    onDeleteProduct() {
        this.props.onDeleteProduct(this.props.product);
    }

    onEditProduct() {
        this.props.onEditProduct(this.props.product);
    }

    render() {
        var pricePoints = null;
        if (this.props.product._embedded) {
            pricePoints = this.props.product._embedded.pricePoints.map((pricePoint, index) =>
                (<div key={index}>{pricePoint.price + " " + pricePoint.currency.iso3}</div>)
            );
        }
        return (


            <tr className={this.props.editMode ? "displayNone" : ""}>
                <td>{this.props.product.name}</td>
                <td>{this.props.product.description}</td>
                <td>{this.props.product.tags}</td>
                <td>{pricePoints}</td>
                <td>
                    {
                        (this.props.currencies.length > 0) ?
                            <PricePointForm currencies={this.props.currencies} product={this.props.product}
                                            onAddPricePoint={this.props.onAddPricePoint}/>

                            : ''
                    }
                </td>
                <td>
                    <Button bsStyle="danger" onClick={::this.onDeleteProduct}>Delete</Button>
                    <Button onClick={::this.onEditProduct}>Edit</Button>
                </td>
            </tr>
        )
    }
}
