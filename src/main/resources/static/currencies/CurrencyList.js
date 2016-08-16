const React = require('react');
const Currency = require('./Currency');
const Table = require('react-bootstrap/lib/Table');

class CurrencyList extends React.Component {
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
module.exports = CurrencyList;