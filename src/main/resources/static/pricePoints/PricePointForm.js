import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';
import ReactDom from 'react-dom';

export default class PricePointForm extends React.Component{
    onAddPricePoint() {
        let selectedCurrencyNode = ReactDom.findDOMNode(this.refs["pricePoint-"+this.props.product.href]);
        let priceNode = ReactDom.findDOMNode(this.refs["pricePointValue-"+this.props.product.href]);
        var selectedCurrency = {
            "currency":selectedCurrencyNode.value,
            "product":this.props.product._links.self.href,
            "price":priceNode.value.trim()
        };
        this.props.onAddPricePoint(selectedCurrency);
        this.resetForm(selectedCurrencyNode, priceNode);
    }

    resetForm(selectedCurrencyNode, priceNode) {
        selectedCurrencyNode.value = this.props.currencies[0]._links.self.href;
        priceNode.value = '';
    }
    render() {
        var currencies = this.props.currencies.map((currency, index) =>
            (<option  value={currency._links.self.href} key={index}>{currency.iso3}</option>)
        );
        return (

            <div>
                <FormControl componentClass="select" ref={"pricePoint-"+this.props.product.href}>
                    {currencies}
                </FormControl>
                <FormControl type="text" ref={"pricePointValue-"+this.props.product.href}/>
                <Button onClick={::this.onAddPricePoint}>Add Price point</Button>
            </div>
        )
    }
}
