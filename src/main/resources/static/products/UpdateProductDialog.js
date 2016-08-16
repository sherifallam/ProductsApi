const React = require('react');
const ReactDom = require('react-dom');
const Button = require('react-bootstrap/lib/Button');
const FormControl = require('react-bootstrap/lib/FormControl');
const TagsInput = require('react-tagsinput');

class UpdateProductDialog extends React.Component {
    constructor(props) {
        super(props);
        this.onUpdateProduct = this.onUpdateProduct.bind(this);
        this.onCancelUpdate = this.onCancelUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {tags: (props.product.tags!=null)? props.product.tags.split(","):[]};
    }
    handleChange(tags) {
        this.setState({tags:tags});
    }
    onUpdateProduct(e) {
        var updatedProduct = {
            "href": ReactDom.findDOMNode(this.refs["productHref"]).value,
            "name": ReactDom.findDOMNode(this.refs["newProductName"]).value.trim(),
            "description": ReactDom.findDOMNode(this.refs["newProductDescription"]).value.trim(),
            "tags": this.state.tags.toString()
        };
        this.props.onUpdateProduct(updatedProduct);
    }

    onCancelUpdate(e) {
        this.props.onCancelUpdate(this.props.product);
    }

    render() {
        var pricePoints = null;
        if (this.props.product._embedded != null) {
            pricePoints = this.props.product._embedded.pricePoints.map(pricePoint =>
                <div pricePoint={pricePoint}>{pricePoint.price +" "+ pricePoint.currency.iso3}</div>
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
                    <TagsInput value={this.state.tags} onChange={this.handleChange}  ref="newProductTags" addKeys={[32,9,13]} />
                </td>
                <td>{pricePoints}</td>
                <td />
                <td>
                    <Button onClick={this.onUpdateProduct}>Update</Button>
                    <Button onClick={this.onCancelUpdate}>Cancel</Button>
                </td>
            </tr>
        )
    }
}
module.exports = UpdateProductDialog;