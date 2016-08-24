import React from 'react';
import CurrencyDetails from './CurrencyDetails';
import UpdateCurrencyDialog from './UpdateCurrencyDialog';

export default class Currency extends React.Component{
    constructor(props) {
        super(props);
        this.onEditCurrency = this.onEditCurrency.bind(this);
        this.onUpdateCurrency = this.onUpdateCurrency.bind(this);
        this.onCancelUpdateCurrency = this.onCancelUpdateCurrency.bind(this);
        this.state = {editMode: false};
    }


    onEditCurrency(currency) {
        this.setState({editMode:true});
    }
    onUpdateCurrency(currency) {
        this.props.onUpdateCurrency(currency);
        this.setState({editMode:!this.state.editMode});
    }
    onCancelUpdateCurrency(){
        this.setState({editMode:!this.state.editMode});
    }

    render() {
        return(
            <tbody>

                    <CurrencyDetails editMode={this.state.editMode}  ref={this.props.currency._links.self.href+"-pd"}  currency={this.props.currency} onDeleteCurrency={this.props.onDeleteCurrency} onEditCurrency={this.onEditCurrency}/>
                    <UpdateCurrencyDialog editMode={this.state.editMode} ref={this.props.currency._links.self.href+"-upd"}currency={this.props.currency} onUpdateCurrency={this.onUpdateCurrency} onCancelUpdateCurrency={this.onCancelUpdateCurrency}/>

            </tbody>
            )
    }
}
