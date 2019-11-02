import React, { Component } from "react";
import "./forms.css";
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


export default class CreateRideForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: 'Create ',
            index: '',
            datas: []
        }
    }

    fSubmit = (e) => {
        e.preventDefault();
        console.log('KONTOL');

        let datas = this.state.datas;

        let startAddr = this.refs.startAddress.value;
        let endAddr = this.ref.endAddress.value;
        let date = this.ref.date.value;
        let startTime = this.refs.startTime.value;
        let endTime = this.refs.endTime.value;
        let startBid = this.refs.startBid.value;

        let data = { startAddr, endAddr, date, startTime, endTime, startBid }

        datas.push(data);

        this.setState({
            datas: datas
        });

        this.refs.myForm.reset();
        // let name = this.ref.
    }




    render() {
        let datas = this.state.datas;
        return (
            <div className="advertiseForm">


                <Container className="mt-3">
                    <Row>
                        <Col xs={6}>
                            <h3 className="header text-center">Advertise Your Ride</h3>
                            <Form ref="myForm" className="formGroup">
                                <FormGroup row>
                                    <Label>Start Address</Label>
                                    <Input ref="startAddress" type="text" name="text" id="formStartLocation" placeholder="Enter Start Address" />
                                </FormGroup>

                                <FormGroup row>
                                    <Label>End Address</Label>
                                    <Input ref="endAddress" type="text" name="text" id="formEndLocation" placeholder="Enter End Address" />
                                </FormGroup>

                                <FormGroup row>
                                    <Label>Date</Label>
                                    <Input ref="date" type="date" name="text" id="formDate" placeholder="Enter Date" />
                                </FormGroup>

                                <FormGroup row>
                                    <Label>Start Time</Label>
                                    <Input ref="startTime" type="time" name="text" id="formStartTime" placeholder="Enter Start Time" />
                                </FormGroup>

                                <FormGroup row>
                                    <Label>End Time</Label>
                                    <Input ref="endTime" type="time" name="text" id="formEndTime" placeholder="Enter End Time" />
                                </FormGroup>

                                <FormGroup row>
                                    <Label>Starting Bid ($)</Label>
                                    <Input ref="startBid" type="number" name="text" step="0.1" id="formEndTime" placeholder="Enter Starting Bid" />
                                </FormGroup>
                                <Button onClick={(e) => this.fSubmit(e)} outline color="success">Submit</Button>{' '}



                            </Form>
                        </Col>

                        <Col xs={6}>
                            <h3 className="header text-center">Your Rides</h3>
                            <pre>
                                {datas.map((data, i) =>
                                    <li key={i} className="myList">
                                        {i + 1}. {data.startAddr}, {data.endAddr}, {data.date}, {data.startTime}, {data.endTime}, {data.startBid}
                                        <Button onClick={(e) => this.fSubmit(e)} outline color="success">Submit</Button>{' '}
                                    </li>
                                )}

                            </pre>
                        </Col>

                    </Row>


                </Container>

            </div >


        )
    }

}


        // CREATE TABLE Advertisements (
        // 	adId SERIAL PRIMARY KEY,
        // 	startingBid NUMERIC NOT NULL,
        // 	RideStartTime TIMESTAMP NOT NULL,
        // 	bidEndTime TIMESTAMP NOT NULL,
        // 	rideId SERIAL REFERENCES Rides(rideId) NOT NULL,
        // 	advertiser TEXT REFERENCES Drivers(username),
        // 	status INT DEFAULT 1,
        // 	CHECK(status IN (1, 2, 3)),
        // 	UNIQUE(rideId)
        // 	-- 1 Bidding, 2 Completed, 3 Cancelled
        // );

        // /CREATE TABLE Rides (
            // 	rideId SERIAL UNIQUE,
            // 	RideStartTime TIMESTAMP NOT NULL,
            // 	RideEndTime TIMESTAMP,
            // 	routeId SERIAL REFERENCES Routes(routeId) NOT NULL,
            // 	car TEXT REFERENCES Cars(plateNum) NOT NULL,
            // 	driver TEXT REFERENCES Drivers(username) NOT NULL,
            // 	price INT NOT NULL,
            // 	status INT DEFAULT 1,
            // 	PRIMARY KEY(rideId, driver),
            // 	CHECK(status IN (1, 2, 3, 4) AND price > 0)
            // 	-- 1 In progress, 2 Completed, 3 Cancelled by driver, 4 All passengers cancelled
            // );

