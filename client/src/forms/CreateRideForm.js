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

import {
    Dropdown,
    DropdownMenu,
    DropdownToggle
} from "react-bootstrap"



export default class CreateRideForm extends Component {

    constructor(props) {
        super(props);
        this.state = {

            index: '',
            datas: [],

            routes: [],

            // startAddr: "",
            // endAddr: "",
            startTime: "",
            endTime: "",
            startBid: "",

            startAddrError: "",
            endAddrError: "",
            startTimeError: "",
            endTimeError: "",
            startBidError: "",

            errorSubmit: null
        }
    }

    async componentDidMount() {
        let baseurl = "http://localhost:5000";
        // if (process.env.NODE_ENV === 'production') {
        baseurl = "http://rideshare-app-nus.herokuapp.com";
        // }

        const response = await fetch(`${baseurl}/api/routes`, {
            method: 'GET'
        });

        if (response.ok) {
            const resp = await response.json();
            this.setState({
                routes: resp.data
            });
        }
    }

    // validateForm = () => {
    //     let startAddrError, endAddrError, startTimeError, endTimeError, startBidError;
    //     if (!this.state.startAddr.length > 0) {
    //         startAddrError = "Invalid Start Address";
    //     } else {
    //         startAddrError = "";
    //     }

    //     if (!this.state.endAddr.length > 0 || this.state.endAddr.value == this.state.startAddr.value) {
    //         endAddrError = "Invalid End Address : Start and End address should not be the same";
    //     } else {
    //         endAddrError = "";
    //     }

    //     if (!this.state.startTime.length > 0) {
    //         startTimeError = "Invalid Start Time";
    //     } else {
    //         startTimeError = "";
    //     }

    //     if (!this.state.endTime.length > 0) {
    //         endTimeError = "Invalid End Time";
    //     } else {
    //         endTimeError = "";
    //     }

    //     if (!this.state.startBid.length > 0) {
    //         startBidError = "Invalid Starting Bid";
    //     } else {
    //         startBidError = "";
    //     }

    //     return true;
    // };


    fSubmit = async (e) => {
        e.preventDefault();
        const { history } = this.props;
        let datas = this.state.datas;
        // let startAddr = this.refs.startAddr.value;
        // let endAddr = this.refs.endAddr.value;
        let date = this.refs.date.value;
        let startTime = this.refs.startTime.value;
        let endTime = this.refs.endTime.value;
        let startBid = this.refs.startBid.value;

        let data = { date, startTime, endTime, startBid }

        let baseUrl = `http://localhost:5000`;
        // if (process.env.NODE_ENV === "production") {
        baseUrl = "http://rideshare-app-nus.herokuapp.com";
        // }



        const username = localStorage.getItem('username');
        if (!username) {
            alert('You are not logged in');
            history.push('/login');
        }

        const response = await fetch(`${baseUrl}/api/advertise`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // "origin": startAddr,
                // "destination": endAddr,
                "date": date,
                "startTime": startTime,
                "endTime": endTime,
                "startBid": startBid,
                "username": username
            })
        })

        if (response.ok) {

        }



        datas.push(data);

        this.setState({
            datas: datas,
            act: 0
        });





        // this.refs.myForm.reset();
        // this.refs.startAddr.focus();
    }

    fRemove = (i) => {
        let datas = this.state.datas;
        datas.splice(i, 1);
        this.setState({
            datas: datas
        })
    }

    // fEdit = (i) => {
    //     let data = this.state.datas[i];

    //     this.refs.startAddr.value = data.startAddr;
    //     this.refs.endAddr.value = data.endAddr;
    //     this.refs.date.value = data.date;
    //     this.refs.startTime.value = data.startTime;
    //     this.refs.endTime.value = data.endTime;
    //     this.refs.startBid.value = data.startBid;

    //     // this.refs.name.value = data.name;
    //     // this.refs.address.value = data.address;
    //     this.setState({
    //         act: 1,
    //         index: i
    //     });
    //     this.refs.startAddr.focus();
    // }



    render() {
        let datas = this.state.datas;
        let routes = this.state.routes
        return (
            <div className="advertiseForm">


                <Container className="mt-3">
                    <Row>
                        <Col xs={4}>
                            <h3 className="header text-center">Advertise Your Ride</h3>


                            <form ref="myForm" className="formGroup advertForm">

                                <select className="browser-default custom-select">
                                    <option> Select Routes</option>
                                    {routes.map((route, i) =>
                                        <option key={i} className="dropdown">
                                            {route.origin + " -> " + route.destination}</option>
                                    )}
                                </select>

                                <div className="my-2">
                                    <Label>Date</Label>
                                    <input ref="date" type="date" name="date" id="formDate" placeholder="Enter Date" />
                                    <small>{this.state.date}</small>
                                </div>

                                <div className="my-2">
                                    <Label>Start Time</Label>
                                    <input ref="startTime" type="time" name="startTime" id="formStartTime" placeholder="Enter Start Time" />
                                    <small>{this.state.startTimeError}</small>
                                </div>

                                <div className="my-2">
                                    <Label>End Time</Label>
                                    <input ref="endTime" type="time" name="endTime" id="formEndTime" placeholder="Enter End Time" />
                                    <small>{this.state.endTimeError}</small>
                                </div>

                                <div className="my-2">
                                    <Label>Starting Bid ($)</Label>
                                    <input ref="startBid" type="number" name="startBid" step="0.1" id="formEndTime" placeholder="Enter Starting Bid" />
                                    <small>{this.state.startBidError}</small>
                                </div>
                                <Button onClick={(e) => this.fSubmit(e)} outline color="success">Submit</Button>{' '}



                            </form>
                        </Col>

                        <Col xs={8}>
                            <h3 className="header text-center">Your Rides</h3>
                            <pre>
                                {datas.map((data, i) =>
                                    <div key={i} className="ridesList">
                                        <Container>
                                            <Row>
                                                <Col xs={5}>
                                                    <Row><label>Date       :</label>{data.date} </Row>
                                                    <Row><label>Start Time :</label>{data.startTime} </Row>
                                                    <Row><label>End Time   :</label>{data.endTime} </Row>
                                                </Col>
                                                <Col xs={2}>
                                                    <Row><label>Starting Bid :</label>{data.startBid}</Row>
                                                </Col>
                                            </Row>
                                            <Row>
                                            </Row>
                                        </Container>

                                        <Button onClick={(e) => this.fRemove(e)} outline color="success">Delete</Button>{' '}
                                    </div>
                                )}
                            </pre>
                        </Col>

                    </Row>


                </Container>

            </div >


        )
    }

}