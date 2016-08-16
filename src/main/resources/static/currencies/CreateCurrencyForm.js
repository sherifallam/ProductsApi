const React = require('react');
const ReactDom = require('react-dom');
const Button = require('react-bootstrap/lib/Button');
const Form = require('react-bootstrap/lib/Form');
const FormGroup = require('react-bootstrap/lib/FormGroup');
const Col = require('react-bootstrap/lib/Col');
const FormControl = require('react-bootstrap/lib/FormControl');
const ControlLabel = require('react-bootstrap/lib/ControlLabel');
const Panel = require('react-bootstrap/lib/Panel');

class CreateCurrencyForm extends React.Component {

    constructor(props) {
        super(props);
        this.onCreateCurrency = this.onCreateCurrency.bind(this);
    }

    onCreateCurrency(e) {
        var newCurrency = {
            "name": ReactDom.findDOMNode(this.refs["currencyName"]).value.trim(),
            "iso3": ReactDom.findDOMNode(this.refs["currencyiso3"]).value.trim()
        };
        this.props.onCreateCurrency(newCurrency);
        ReactDom.findDOMNode(this.refs["currencyName"]).value = '';
        ReactDom.findDOMNode(this.refs["currencyiso3"]).value = '';
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
                    <FormGroup controlId="currencyiso3">
                        <Col componentClass={ControlLabel} sm={2}>
                            Iso3
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" ref="currencyiso3" />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="createCurrency">
                        <Col sm={10} smOffset={2}>
                            <Button onClick={this.onCreateCurrency}>Create</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Panel>

        )
    }

}
module.exports = CreateCurrencyForm;