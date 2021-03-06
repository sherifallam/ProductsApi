import React from  'react';
import ReactDom from 'react-dom';
import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Panel from 'react-bootstrap/lib/Panel';
import TagsInput from 'react-tagsinput';

export default class CreateProductForm extends React.Component {
    state = {tags: [],productName:'',productDescription:''};

    onTagChange(tags) {
        this.setState({tags: tags});
    }

    onInputChange(e){
        let controlName= e.target.id;
        let controlValue= e.target.value;
        this.setState({
            [controlName]:controlValue
        });
    }

    onCreateProduct() {
        let newProduct = {
            "name": this.state.productName.trim(),
            "description": this.state.productDescription.trim(),
            "tags": this.state.tags.toString()
        };
        this.props.onCreateProduct(newProduct);
        this.setState({tags: [],productName:'',productDescription:''});
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
                            <FormControl type="text" value={this.state.productName} onChange={::this.onInputChange}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="productDescription">
                        <Col componentClass={ControlLabel} sm={2}>
                            Description
                        </Col>
                        <Col sm={10}>
                            <FormControl type="text" value={this.state.productDescription} onChange={::this.onInputChange} />
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="productTags">
                        <Col componentClass={ControlLabel} sm={2}>
                            Tags
                        </Col>
                        <Col sm={10}>
                            <TagsInput value={this.state.tags} onChange={::this.onTagChange} addKeys={[32, 9, 13]}/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="createProduct">
                        <Col sm={10} smOffset={2}>
                            <Button onClick={::this.onCreateProduct}>Create</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Panel>
        )
    }

}
