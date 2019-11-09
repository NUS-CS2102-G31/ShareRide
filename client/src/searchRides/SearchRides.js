import React, { Component } from "react";
import "./searchRides.css";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Card,
    FormGroup,
    Label,
    Input

} from "reactstrap";
import posts from './rides.js';
import moment from "moment";


export default class SearchRides extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }




    handleSubmit = async event => {
        event.preventDefault();

        let baseurl = "http://rideshare-app-nus.herokuapp.com";

        // fetch(`${baseurl}/api/rides?origin=${this.state.}&destination=${this.state}`)
    }

    render() {
        const { posts } = this.state;

        return (
            <div className="advertiseForm">
                <Container className="mt-5">
                    <Row>
                        <Col xs={4}>
                            <Form className="formGroup searchRidesForm">
                                <h5 className="mb-3">Search for rides</h5>
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
                        <Col xs="8">


                            <div >
                                {
                                    posts.map(post =>
                                        <div key={post.id} align="start" className="rides-list mb-3 line-separator">
                                            <Container>
                                                <Row>
                                                    <Col xs={3}>
                                                        <Row>
                                                            <h3 className="post-driver">{post.driver}</h3>
                                                        </Row>
                                                        <Row>
                                                            <small className="post-car">{post.car}</small>

                                                        </Row>
                                                        <Row>
                                                            <small className="post-capacity">{post.capacity + " seats available"} </small>
                                                        </Row>
                                                    </Col>
                                                    <Col xs={7}>
                                                        <Row>
                                                            <p className="pull-left"><b>Departure  </b></p>
                                                            <p className="pull-right">{" " + " : " + post.startAddr}</p>
                                                        </Row>
                                                        <Row>
                                                            <p className="pull-left"><b>Arrival </b></p>
                                                            <p className="pull-right">{" " + " : " + post.endAddr}</p>
                                                        </Row>
                                                        <Row>

                                                            <p className="pull-left"><b>Departure Time</b></p>

                                                            <p className="pull-right">
                                                                {" " + " : " + post.startTime}</p>
                                                        </Row>
                                                    </Col>
                                                    <Col xs={2}>
                                                        <h5 className="post-price">{post.price}</h5>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </div>
                                    )
                                }
                            </div>



                        </Col>
                    </Row>
                </Container>
            </div >
        )
    }
}

