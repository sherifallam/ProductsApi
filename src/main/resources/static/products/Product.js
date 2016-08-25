import React from  'react';
import ProductDetails from  './ProductDetails';
import UpdateProductForm from  './UpdateProductForm';

export default class Product extends React.Component{
    state = {editMode: false};

    onEditProduct() {
        this.setState({editMode:true});
    }
    onUpdateProduct(product) {
        this.props.onUpdateProduct(product);
        this.setState({editMode:!this.state.editMode});
    }
    onCancelUpdate(){
        this.setState({editMode:!this.state.editMode});
    }

    render() {
        return(
            <tbody>
            <ProductDetails editMode={this.state.editMode} ref={this.props.product._links.self.href+"-pd"} product={this.props.product} currencies={this.props.currencies} onDeleteProduct={this.props.onDeleteProduct} onEditProduct={::this.onEditProduct} onAddPricePoint={this.props.onAddPricePoint}/>
            <UpdateProductForm editMode={this.state.editMode} ref={this.props.product._links.self.href+"-upd"} product={this.props.product} onUpdateProduct={::this.onUpdateProduct} onCancelUpdate={::this.onCancelUpdate}/>
        </tbody>
        )
    }
}
