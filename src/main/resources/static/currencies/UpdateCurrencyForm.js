import React from 'react';
import ReactDom from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import FormControl from 'react-bootstrap/lib/FormControl';

export default class UpdateCurrencyForm extends React.Component {
    state = {
        currencyName:this.props.currency.name,
        currencyIso3:this.props.currency.iso3
    };

    onUpdateCurrency() {
        var updatedCurrency = {
            "href": this.props.currency._links.self.href,
            "name": this.state.currencyName.trim(),
            "iso3": this.state.currencyIso3.trim()
        };
        this.props.onUpdateCurrency(updatedCurrency);
    }

    onCancelUpdateCurrency() {
        this.props.onCancelUpdateCurrency(this.props.currency);
    }

    onInputChange(e){
        let controlName= e.target.id;
        let controlValue= e.target.value;
        this.setState({
            [controlName]:controlValue
        });
    }

    render() {
        return (
            <tr id="updateCurrency" className={this.props.editMode ? "" : "displayNone"}>
                <td>
                    <FormControl type="text"  id="currencyName" value={this.state.currencyName} onChange={::this.onInputChange} />
                </td>
                <td>
                    <FormControl type="text"  id="currencyIso3" value={this.state.currencyIso3} onChange={::this.onInputChange} />
                </td>
                <td>
                    <Button onClick={::this.onUpdateCurrency}>Update</Button>
                    <Button onClick={::this.onCancelUpdateCurrency}>Cancel</Button>
                </td>
            </tr>
        )
    }
}
