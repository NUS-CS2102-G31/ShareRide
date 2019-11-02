import React, { Component } from "react";
import "./home.css";
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


class Home extends Component {
    render() {
        return (
            <div className="homepage-main">
                <Container>
                    <Row className="pt-5">
                        <Col xs="6">
                            <div>

                                <Form className="formGroup homepageForm">
                                    <h3 className="mb-3">Take a trip with a click of a button.</h3>
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
                                            <Input type="number" name="text" id="formNumPassenger" min="0" max="5" placeholder="No. of Passengers" />
                                        </Col>
                                    </FormGroup>
                                    <div className="clearfix">
                                        <Button outline color="success" className="float-right"> Submit</Button>{' '}
                                    </div>
                                </Form>

                            </div>
                        </Col>
                        <Col xs="6">
                            <h1 className="headerText">SEARCH.</h1>
                            <h1 className="headerText">BID.</h1>
                            <h1 className="headerText">RIDE.</h1>
                            <h1 className="headerText">REWARD.</h1>


                        </Col>
                    </Row>
                </Container>

            </div>
        );
    }
}

export default Home;