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
import moment from 'moment';


export default class SearchRides extends Component {

    constructor(props) {
        super(props);
        this.state = {
            origin: '',
            destination: '',
            passengers: 0,
            posts: []
        };
    }






    handleChange = event => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    handleSubmit = async (event) => {
        event.preventDefault();
        console.log(this.state)
        let baseurl = "http://localhost:5000";
        if (process.env.NODE_ENV === 'production') {
            baseurl = "http://rideshare-app-nus.herokuapp.com";
        }

        const response = await fetch(`${baseurl}/api/rides?origin=${this.state.origin}&destination=${this.state.destination}&seats=${this.state.passengers}`, {
            method: 'GET'
        });

        if (response.ok) {
            const resp = await response.json();

            this.setState({
                posts: resp.data
            });

            if (this.state.posts.length == 0) {
                alert("No rides found for that route!");
            }

        } else {
            const error = await response.json();
            alert(error.message);
        }
    }

    // fetch(`${baseurl}/api/rides?origin=${this.state.}&destination=${this.state}`)


    // render() {
    //     const { posts } = this.state;
    //     return (

    //     )
    // }


    render() {
        return (
            <div className="advertiseForm">
                <Container className="mt-5">
                    <Row>
                        <Col xs={4}>
                            <Form className="formGroup searchRidesForm" onSubmit={this.handleSubmit}>
                                <h5 className="mb-3">Search for rides</h5>
                                <FormGroup row>
                                    <Label sm={3}>From</Label>
                                    <Col sm={9}>
                                        <Input type="text" name="origin" value={this.state.origin} id="formStartLocation" placeholder="Enter Start Address" onChange={this.handleChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={3}>To</Label>
                                    <Col sm={9}>
                                        <Input type="text" name="destination" value={this.state.destination} id="formEndLocation" placeholder="Enter Destination Address" onChange={this.handleChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={3}>Passengers</Label>
                                    <Col sm={9}>
                                        <Input type="text" name="passengers" value={this.state.passengers} id="formNumPassenger" min="0" max="5" placeholder="Passengers" onChange={this.handleChange} />
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
                                    this.state.posts.map(post =>
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
                                                            <p className="pull-left"><b>Departure:</b></p>
                                                            <p className="pull-right">{post.origin}</p>
                                                        </Row>
                                                        <Row>
                                                            <p className="pull-left"><b>Arrival:    </b></p>
                                                            <p className="pull-right">{post.destination}</p>
                                                        </Row>
                                                        <Row>
                                                            <p className="pull-left"><b>Departure Time:    </b></p>
                                                            <p className="pull-right">{post.ridestarttime}</p>
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
