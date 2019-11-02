import React from "react";
import "./home.css";
import {
    Form,
    Button,
    Row,
    Col,
    Container
} from "react-bootstrap";


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            license: "",
            plateNum: "",
            carBrand: "",
            carType: "",
            newUser: null,
            isLoading: false
        };
    }

    validateForm() {
        return (
            this.state.license.length > 0 &&
            this.state.plateNum.length > 0 &&
            this.state.carBrand.length > 0 &&
            this.state.carType.length > 0
        );
    }



    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        // Post request to backend
        event.preventDefault();
        var data = {
            license: this.state.license,
            plateNum: this.state.plateNum,
            carBrand: this.state.carBrand,
            carType: this.state.carType,
            newUser: null,
            isLoading: false
        }
        console.log(data)
        fetch('http://localhost:3600/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(function (data) {
            console.log(data);

        })
            .then(res => console.log(res));
    }

    renderForm() {
        return (
            <div className="form">
                <Container>
                    <Row>
                        <Col>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="formBasic">
                                    <Form.Label>Driving License</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Driving License" />
                                </Form.Group>

                                <Form.Group controlId="formBasic">
                                    <Form.Label>Plate Number</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Car Plate Number" />
                                </Form.Group>

                                <Form.Group controlId="formBasic">
                                    <Form.Label>Car Brand</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Car Brand" />
                                </Form.Group>

                                <Form.Group controlId="formBasic">
                                    <Form.Label>Car Type</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Car Type" />
                                </Form.Group>


                            </Form>
                        </Col>

                        <Col>

                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>From</Form.Label>
                                    <Form.Control type="" placeholder="Enter Start Location" />
                                </Form.Group>

                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>To</Form.Label>
                                    <Form.Control type="" placeholder="Enter End Location" />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>No of Passengers</Form.Label>
                                    <Form.Control type="password" placeholder="" />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Departure Time</Form.Label>
                                    <Form.Control type="password" placeholder="Enter Departure Time" />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Opening Bid</Form.Label>
                                    <Form.Control type="password" placeholder="Enter Opening Bid" />
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Row>

                        <Button variant="primary" type="submit">
                            Advertise Ride
                         </Button>

                    </Row>
                </Container>

            </div >
        );
    }
    render() {
        return (
            <div className="advertise">
                {this.renderForm()}
            </div>
        );
    }
}