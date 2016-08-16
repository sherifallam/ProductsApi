const React = require('react');
const Button= require('react-bootstrap/lib/Button');
const FormControl = require('react-bootstrap/lib/FormControl');
const ReactDom = require('react-dom');

class PricePointForm extends React.Component{
    constructor(props) {
        super(props);
        this.onAddPricePoint = this.onAddPricePoint.bind(this);
    }


    onAddPricePoint() {
        var selectedCurrency = {
            "currency":ReactDom.findDOMNode(this.refs["pricePoint-"+this.props.product.href]).value,
            "product":this.props.product._links.self.href,
            "price":ReactDom.findDOMNode(this.refs["pricePointValue-"+this.props.product.href]).value.trim()
        };
        this.props.onAddPricePoint(selectedCurrency);
        ReactDom.findDOMNode(this.refs["pricePoint-"+this.props.product.href]).value= this.props.currencies[0]._links.self.href;
        ReactDom.findDOMNode(this.refs["pricePointValue-"+this.props.product.href]).value='';
    }
    render() {
        var currencies = this.props.currencies.map(currency =>
            <option  value={currency._links.self.href}>{currency.iso3}</option>
        );
        return (

            <div>
                <FormControl componentClass="select" ref={"pricePoint-"+this.props.product.href}>
                    {currencies}
                </FormControl>
                <FormControl type="text" ref={"pricePointValue-"+this.props.product.href}/>
                <Button onClick={this.onAddPricePoint}>Add Price point</Button>
            </div>
        )
    }
}

module.exports =PricePointForm;