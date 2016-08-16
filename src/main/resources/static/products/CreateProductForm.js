const React = require('react');
const ReactDom = require('react-dom');
const Button = require('react-bootstrap/lib/Button');
const Form = require('react-bootstrap/lib/Form');
const FormGroup = require('react-bootstrap/lib/FormGroup');
const Col = require('react-bootstrap/lib/Col');
const FormControl = require('react-bootstrap/lib/FormControl');
const ControlLabel = require('react-bootstrap/lib/ControlLabel');
const Panel = require('react-bootstrap/lib/Panel');
const TagsInput = require('react-tagsinput');
class CreateProductForm extends React.Component {

    constructor(props) {
        super(props);
        this.onCreateProduct = this.onCreateProduct.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {tags: []}

    }
    handleChange(tags) {
        this.setState({tags:tags});
    }
    onCreateProduct(e) {
        var newProduct = {
            "name": ReactDom.findDOMNode(this.refs["productName"]).value.trim(),
            "description": ReactDom.findDOMNode(this.refs["productDescription"]).value.trim(),
            "tags": this.state.tags.toString()
        };
        this.props.onCreateProduct(newProduct);
        ReactDom.findDOMNode(this.refs["productName"]).value = '';
        ReactDom.findDOMNode(this.refs["productDescription"]).value = '';
        this.state = {tags: []}
    }

    render() {
        return (
            <Panel header="Create new Product" bsStyle="primary">
                <Form horizontal>
                    <FormGroup controlId="productName">
                        <Col componentClass={ControlLabel} sm={2}>
                            Name
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" ref="productName"/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="productDescription">
                        <Col componentClass={ControlLabel} sm={2}>
                            Description
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" ref="productDescription"/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="productTags">
                        <Col componentClass={ControlLabel} sm={2}>
                            Tags
                        </Col>
                        <Col sm={10}>
                            <TagsInput value={this.state.tags} onChange={this.handleChange}  ref="productTags" addKeys={[32,9,13]} />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="createProduct">
                        <Col sm={10} smOffset={2}>
                            <Button onClick={this.onCreateProduct}>Create</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Panel>
        )
    }

}
module.exports = CreateProductForm;