import React from  'react';
import Product from  './Product';
import Table from  'react-bootstrap/lib/Table';

export default class ProductList extends React.Component {
    render() {
        var products = this.props.products.map((product, index) =>
            (<Product product={product} currencies={this.props.currencies} onDeleteProduct={this.props.onDeleteProduct}
                     onUpdateProduct={this.props.onUpdateProduct} onAddPricePoint={this.props.onAddPricePoint} key={index}/>)
        );

        return (
            <Table striped bordered hover>
                <colgroup>
                    <col className="col-xs-2"/>
                    <col className="col-xs-4"/>
                    <col className="col-xs-2"/>
                    <col className="col-xs-2"/>
                    <col className="col-xs-1"/>
                    <col className="col-xs-1"/>
                </colgroup>
                <thead >
                <tr>
                    <th>Product</th>
                    <th>Description</th>
                    <th>Tags</th>
                    <th>Price points</th>
                    <th>Add price point</th>
                    <th>Action</th>
                </tr>
                </thead>
                {products}

            </Table>
        )
    }
}
