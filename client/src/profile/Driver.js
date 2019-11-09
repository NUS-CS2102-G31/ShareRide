import React, { Component } from "react";
import {
    Container,
    Col,
    Row,
    Card,
    Button,
    Image
} from "react-bootstrap";
import { Link } from 'react-router-dom';
import "./driver.css"


export default class Driver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "Adi Yoga Prataman",
            username: "adisukaprata69",
            carType: "Toyota Bobrok",
            email: "adi29@gmail.com",
            phone: "0912323",
            avgPassengers: "1",
            avgEarnings: "-1"
        };
    }

    render() {
        return (

            <div className="card">

                <div className="card-header">
                    <img src="driverProfile.png" className="full-width"></img>
                </div>
                <div className="card-subheader">
                    <h4 className="name text-center">{this.state.fullName}</h4>
                    <p className="fullName"></p>
                    <p className="username">{this.state.username}</p>
                    <p className="title">{this.state.email}</p>
                    <p className="title">{this.state.phone}</p>
                    <p className="complex-query">Average Passengers/Rides &nbsp; : {this.state.avgPassengers}</p>
                    <p className="complex-query">Av{this.state.avgEarnings}</p>
                </div>

            </div>
        )
    }
}



// class Driver extends Component {
//     render() {

//     }
// }

// export default Driver;