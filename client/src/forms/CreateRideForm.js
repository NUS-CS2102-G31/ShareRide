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

            index: '',
            datas: [],

            startAddr: "",
            endAddr: "",
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

    validateForm = () => {
        let startAddrError, endAddrError, startTimeError, endTimeError, startBidError;
        if (!this.state.startAddr.length > 0) {
            startAddrError = "Invalid Start Address";
        } else {
            startAddrError = "";
        }

        if (!this.state.endAddr.length > 0 || this.state.endAddr.value == this.state.startAddr.value) {
            endAddrError = "Invalid End Address : Start and End address should not be the same";
        } else {
            endAddrError = "";
        }

        if (!this.state.startTime.length > 0) {
            startTimeError = "Invalid Start Time";
        } else {
            startTimeError = "";
        }

        if (!this.state.endTime.length > 0) {
            endTimeError = "Invalid End Time";
        } else {
            endTimeError = "";
        }

        if (!this.state.startBid.length > 0) {
            startBidError = "Invalid Starting Bid";
        } else {
            startBidError = "";
        }

        return true;
    };


    fSubmit = (e) => {
        e.preventDefault();

        // const isValid = this.validate();
        // if (isValid) {
        //     console.log(this.state);
        // }

        let datas = this.state.datas;
        let startAddr = this.refs.startAddr.value;
        let endAddr = this.refs.endAddr.value;
        let date = this.refs.date.value;
        let startTime = this.refs.startTime.value;
        let endTime = this.refs.endTime.value;
        let startBid = this.refs.startBid.value;

        let data = { startAddr, endAddr, date, startTime, endTime, startBid }

        datas.push(data);

        this.setState({
            datas: datas,
            act: 0
        });
        this.refs.myForm.reset();
        this.refs.startAddr.focus();
    }

    fRemove = (i) => {
        let datas = this.state.datas;
        datas.splice(i, 1);
        this.setState({
            datas: datas
        })
    }

    fEdit = (i) => {
        let data = this.state.datas[i];

        this.refs.startAddr.value = data.startAddr;
        this.refs.endAddr.value = data.endAddr;
        this.refs.date.value = data.date;
        this.refs.startTime.value = data.startTime;
        this.refs.endTime.value = data.endTime;
        this.refs.startBid.value = data.startBid;

        // this.refs.name.value = data.name;
        // this.refs.address.value = data.address;
        this.setState({
            act: 1,
            index: i
        });
        this.refs.startAddr.focus();
    }










    render() {
        let datas = this.state.datas;
        return (
            <div className="advertiseForm">


                <Container className="mt-3">
                    <Row>
                        <Col xs={4}>
                            <h3 className="header text-center">Advertise Your Ride</h3>
                            <form ref="myForm" className="formGroup advertForm">
                                <div className="my-2">
                                    <Label>Start Address</Label>
                                    <input ref="startAddr" type="text" name="text" id="formStartLocation" placeholder="Enter Start Address" />
                                    <small style={{ color: "red" }}>{this.state.startAddrError}</small>
                                </div>


                                <div className="my-2">
                                    <Label>End Address</Label>
                                    <input ref="endAddr" type="text" name="text" id="formEndLocation" placeholder="Enter End Address" />
                                    <small>{this.state.endAddrError}</small>
                                </div>

                                <div className="my-2">
                                    <Label>Date</Label>
                                    <input ref="date" type="date" name="text" id="formDate" placeholder="Enter Date" />
                                    <small>{this.state.date}</small>
                                </div>

                                <div className="my-2">
                                    <Label>Start Time</Label>
                                    <input ref="startTime" type="time" name="text" id="formStartTime" placeholder="Enter Start Time" />
                                    <small>{this.state.startTimeError}</small>
                                </div>

                                <div className="my-2">
                                    <Label>End Time</Label>
                                    <input ref="endTime" type="time" name="text" id="formEndTime" placeholder="Enter End Time" />
                                    <small>{this.state.endAddrError}</small>
                                </div>

                                <div className="my-2">
                                    <Label>Starting Bid ($)</Label>
                                    <input ref="startBid" type="number" name="text" step="0.1" id="formEndTime" placeholder="Enter Starting Bid" />
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
                                                    <Row><label>From :</label>   {data.startAddr}  </Row>
                                                    <Row><label>To   :</label>  {data.endAddr}  </Row>
                                                </Col>
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
                                        {/* <Button onClick={(e) => this.fEdit(e)} outline color="success">Edit</Button>{' '} */}
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

