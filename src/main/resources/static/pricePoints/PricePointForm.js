import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';

export default class PricePointForm extends React.Component{
    state = {
        price:'',
        currencyHref:this.props.currencies[0]._links.self.href
    };

    onAddPricePoint() {
        let selectedCurrency = {
            "currency":this.state.currencyHref,
            "product":this.props.product._links.self.href,
            "price":this.state.price.trim()
        };
        this.props.onAddPricePoint(selectedCurrency);
    }
    onInputChange(e){
        let controlName= e.target.id;
        let controlValue= e.target.value;
        this.setState({
            [controlName]:controlValue
        });
    }

    render() {
        var currencies = this.props.currencies.map((currency, index) =>
            (<option  value={currency._links.self.href} key={index}>{currency.iso3}</option>)
        );
        return (
            <div>
                <FormControl componentClass="select" id="currencyHref"  value={this.state.currencyHref} onChange={::this.onInputChange}>
                    {currencies}
                </FormControl>
                <FormControl type="text" id="price" value={this.state.price} onChange={::this.onInputChange}/>
                <Button onClick={::this.onAddPricePoint}>Add Price point</Button>
            </div>
        )
    }
}
