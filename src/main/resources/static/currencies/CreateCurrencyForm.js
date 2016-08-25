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
    onCreateCurrency() {
        let currencyNameNode = ReactDom.findDOMNode(this.refs.currencyName);
        let currencyIso3Node = ReactDom.findDOMNode(this.refs.currencyIso3);
        var newCurrency = {
            "name": currencyNameNode.value.trim(),
            "iso3": currencyIso3Node.value.trim()
        };
        this.props.onCreateCurrency(newCurrency);
        this.resetForm(currencyNameNode, currencyIso3Node);
    }

    resetForm(currencyNameNode, currencyIso3Node) {
        currencyNameNode.value = '';
        currencyIso3Node.value = '';
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
                            <FormControl type="text" ref="currencyName" />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="currencyIso3">
                        <Col componentClass={ControlLabel} sm={2}>
                            Iso3
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" ref="currencyIso3" />
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
