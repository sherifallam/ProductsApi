import React from 'react';
import Currency from './Currency';
import Table from 'react-bootstrap/lib/Table';

export default class CurrencyList extends React.Component {
    render() {
        var currencies = this.props.currencies.map(currency =>
            <Currency currency={currency} onDeleteCurrency={this.props.onDeleteCurrency}
                      onUpdateCurrency={this.props.onUpdateCurrency}/>
        );

        return (
            <Table striped bordered hover>
                <colgroup>
                    <col className="col-xs-4"/>
                    <col className="col-xs-4"/>
                    <col className="col-xs-4"/>
                </colgroup>
                <thead>
                <tr>
                    <th>Currency</th>
                    <th>Iso3</th>
                    <th>Action</th>
                </tr>
                </thead>
                {currencies}
            </Table>
        )
    }
}
