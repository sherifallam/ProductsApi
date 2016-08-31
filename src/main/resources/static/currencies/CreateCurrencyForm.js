import React from 'react';
import ReactDom from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Panel from 'react-bootstrap/lib/Panel';

export default class CreateCurrencyForm extends React.Component {
    state = {currencyName:'',currencyIso3:''};

    onCreateCurrency() {
        let currencyNameNode = ReactDom.findDOMNode(this.refs.currencyName);
        let currencyIso3Node = ReactDom.findDOMNode(this.refs.currencyIso3);
        var newCurrency = {
            "name": this.state.currencyName.trim(),
            "iso3": this.state.currencyIso3.trim()
        };
        this.props.onCreateCurrency(newCurrency);
        this.setState({currencyName:'',currencyIso3:''});
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
            <Panel header="Create new Currency" bsStyle="primary">
                <Form horizontal>
                    <FormGroup controlId="currencyName">
                        <Col componentClass={ControlLabel} sm={2}>
                            Name
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" value={this.state.currencyName} onChange={::this.onInputChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="currencyIso3">
                        <Col componentClass={ControlLabel} sm={2}>
                            Iso3
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" value={this.state.currencyIso3} onChange={::this.onInputChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="createCurrency">
                        <Col sm={10} smOffset={2}>
                            <Button onClick={::this.onCreateCurrency}>Create</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Panel>

        )
    }

}
