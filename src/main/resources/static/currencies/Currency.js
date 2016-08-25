import React from 'react';
import CurrencyDetails from './CurrencyDetails';
import UpdateCurrencyForm from './UpdateCurrencyForm';

export default class Currency extends React.Component {
    state = {editMode: false};

    onEditCurrency() {
        this.setState({editMode: true});
    }

    onUpdateCurrency(currency) {
        this.props.onUpdateCurrency(currency);
        this.setState({editMode: !this.state.editMode});
    }

    onCancelUpdateCurrency() {
        this.setState({editMode: !this.state.editMode});
    }

    render() {
        return (
            <tbody>
            <CurrencyDetails editMode={this.state.editMode} ref={this.props.currency._links.self.href + "-pd"}
                             currency={this.props.currency} onDeleteCurrency={this.props.onDeleteCurrency}
                             onEditCurrency={::this.onEditCurrency}/>
            <UpdateCurrencyForm editMode={this.state.editMode} ref={this.props.currency._links.self.href + "-upd"}
                                currency={this.props.currency} onUpdateCurrency={::this.onUpdateCurrency}
                                onCancelUpdateCurrency={::this.onCancelUpdateCurrency}/>

            </tbody>
        )
    }
}
