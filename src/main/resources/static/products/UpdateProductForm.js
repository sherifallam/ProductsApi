import React from  'react';
import ReactDom from  'react-dom';
import Button from  'react-bootstrap/lib/Button';
import FormControl from  'react-bootstrap/lib/FormControl';
import TagsInput from  'react-tagsinput';

export default class UpdateProductForm extends React.Component {
    state = {tags: (this.props.product.tags !== null) ? this.props.product.tags.split(",") : []};

    handleChange(tags) {
        this.setState({tags: tags});
    }

    onUpdateProduct() {
        var updatedProduct = {
            "href": this.refs.productHref.value,
            "name": ReactDom.findDOMNode(this.refs.newProductName).value.trim(),
            "description": ReactDom.findDOMNode(this.refs.newProductDescription).value.trim(),
            "tags": this.state.tags.toString()
        };
        this.props.onUpdateProduct(updatedProduct);
    }

    onCancelUpdate() {
        this.props.onCancelUpdate(this.props.product);
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
                    <input type="hidden" ref="productHref" defaultValue={this.props.product._links.self.href}/>
                    <FormControl type="text" ref="newProductName" defaultValue={this.props.product.name}/>
                </td>
                <td>
                    <FormControl type="text" ref="newProductDescription" defaultValue={this.props.product.description}/>
                </td>
                <td>
                    <TagsInput value={this.state.tags} onChange={::this.handleChange} ref="newProductTags"
                               addKeys={[32, 9, 13]}/>
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
