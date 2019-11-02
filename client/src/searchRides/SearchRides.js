import React, { Component } from "react";
import "./searchRides.css";
import {
    Container,
    Row,
    Col,
    Form,
    Button,

    FormGroup,
    Label,
    Input

} from "reactstrap";


export default class SearchRides extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="advertiseForm">
                <Container className="mt-5">
                    <Col xs="4">
                        <Form className="formGroup searchRidesForm">
                            <h5 className="mb-3">Search for your rides</h5>
                            <FormGroup row>
                                <Label sm={3}>From</Label>
                                <Col sm={9}>
                                    <Input type="text" name="text" id="formStartLocation" placeholder="Enter Start Address" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>To</Label>
                                <Col sm={9}>
                                    <Input type="text" name="text" id="formStartLocation" placeholder="Enter Start Address" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>Passengers</Label>
                                <Col sm={9}>
                                    <Input type="number" name="text" id="formNumPassenger" min="0" max="5" placeholder="Passengers" />
                                </Col>
                            </FormGroup>
                            <div className="clearfix">
                                <Button outline color="success" className="float-right"> Submit</Button>{' '}
                            </div>
                        </Form>
                    </Col>
                    <Col xs="6">
                    </Col>


                </Container>

            </div >


        )
    }

}

