import React from 'react';
import Button from 'react-bootstrap/lib/Button';

export default class CurrencyDetails extends React.Component{
    onDeleteCurrency() {
        this.props.onDeleteCurrency(this.props.currency);
    }
    onEditCurrency() {
        this.props.onEditCurrency(this.props.currency);
    }

    render() {
        return (
            <tr className={this.props.editMode?"displayNone":""}>
                <td>{this.props.currency.name}</td>
                <td>{this.props.currency.iso3}</td>
                <td>
                    <Button bsStyle="danger" onClick={::this.onDeleteCurrency}>Delete</Button>
                    <Button onClick={::this.onEditCurrency}>Edit</Button>
                </td>
            </tr>
        )
    }
}
