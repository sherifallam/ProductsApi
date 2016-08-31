import React from  'react';
import ReactDom from  'react-dom';
import Button from  'react-bootstrap/lib/Button';
import FormControl from  'react-bootstrap/lib/FormControl';
import TagsInput from  'react-tagsinput';

export default class UpdateProductForm extends React.Component {
    state = {
        tags: (this.props.product.tags !== null) ? this.props.product.tags.split(",") : [],
        productName:this.props.product.name,
        productDescription:this.props.product.description
    };

    onTagChange(tags) {
        this.setState({tags: tags});
    }

    onUpdateProduct() {
        var updatedProduct = {
            "href": this.props.product._links.self.href,
            "name": this.state.productName.trim(),
            "description": this.state.productDescription.trim(),
            "tags": this.state.tags.toString()
        };
        this.props.onUpdateProduct(updatedProduct);
    }

    onCancelUpdate() {
        this.props.onCancelUpdate(this.props.product);
    }

    onInputChange(e){
        let controlName= e.target.id;
        let controlValue= e.target.value;
        this.setState({
            [controlName]:controlValue
        });
    }

    render() {
        var pricePoints = null;
        if (this.props.product._embedded) {
            pricePoints = this.props.product._embedded.pricePoints.map((pricePoint, index) =>
                (<div key={index}>{pricePoint.price + " " + pricePoint.currency.iso3}</div>)
            );
        }
        return (
            <tr id="updateProduct" className={this.props.editMode ? "" : "displayNone"}>
                <td>
                    <FormControl type="text" id="productName" value={this.state.productName} onChange={::this.onInputChange} />
                </td>
                <td>
                    <FormControl type="text" id="productDescription" value={this.state.productDescription} onChange={::this.onInputChange} />
                </td>
                <td>
                    <TagsInput value={this.state.tags} onChange={::this.onTagChange} addKeys={[32, 9, 13]}/>
                </td>
                <td>{pricePoints}</td>
                <td />
                <td>
                    <Button onClick={::this.onUpdateProduct}>Update</Button>
                    <Button onClick={::this.onCancelUpdate}>Cancel</Button>
                </td>
            </tr>
        )
    }
}
