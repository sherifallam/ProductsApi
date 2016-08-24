import React from 'react';
import ReactDom from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';

export default class UpdateCurrencyDialog extends React.Component {
    constructor(props) {
        super(props);
        this.onUpdateCurrency = this.onUpdateCurrency.bind(this);
        this.onCancelUpdateCurrency = this.onCancelUpdateCurrency.bind(this);
    }

    onUpdateCurrency() {
        var updatedCurrency = {
            "href": this.refs.currencyHref.value,
            "name": ReactDom.findDOMNode(this.refs.newCurrencyName).value.trim(),
            "iso3": ReactDom.findDOMNode(this.refs.newCurrencyiso3).value.trim()
        };
        this.props.onUpdateCurrency(updatedCurrency);
    }

    onCancelUpdateCurrency() {
        this.props.onCancelUpdateCurrency(this.props.currency);
    }

    render() {
        return (
            <tr id="updateCurrency" className={this.props.editMode ? "" : "displayNone"}>
                <td>
                    <input type="hidden" ref="currencyHref" defaultValue={this.props.currency._links.self.href}/>
                    <FormControl type="text" ref="newCurrencyName" defaultValue={this.props.currency.name}/>
                </td>
                <td>
                    <FormControl type="text" ref="newCurrencyiso3" defaultValue={this.props.currency.iso3}/>
                </td>
                <td>
                    <Button onClick={this.onUpdateCurrency}>Update</Button>
                    <Button onClick={this.onCancelUpdateCurrency}>Cancel</Button>
                </td>
            </tr>
        )
    }
}
