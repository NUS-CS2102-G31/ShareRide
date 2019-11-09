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
            // fullName: "",
            // username: "adisukaprata69",
            // carType: "Toyota Bobrok",
            // email: "adi29@gmail.com",
            // phone: "0912323",
            // avgPassengers: "1",
            // avgEarnings: "-1"
            fullName: '',
            username: '',
            email: '',
            phone: '',
            avgPassengers: '',
            avgEarnings: ''
        };
    }

    async componentDidMount() {
        const { history } = this.props;

        let baseurl = "http://localhost:5000";
        if (process.env.NODE_ENV === 'production') {
            baseurl = "http://rideshare-app-nus.herokuapp.com";
        }

        let username = localStorage.getItem('myUsernameStorage');
        if (!username) {
            alert('user not logged in');
            history.push('/');
        }

        const response = await fetch(`${baseurl}/api/profile?username=${username}`, {
            method: 'GET'
        });

        if (response.ok) {
            const resp = await response.json();

            resp.data.avgEarnings = parseFloat(resp.data.avgEarnings).toFixed(2);

            this.setState({
                fullName: resp.data.fullName,
                username: resp.data.username,
                email: resp.data.email,
                phone: resp.data.phone,
                avgPassengers: resp.data.totalPassengers,
                avgEarnings: resp.data.avgEarnings
            });
        }
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
                    <p className="complex-query"><b>Avg Passengers/Rides &nbsp; : &nbsp; </b> {this.state.avgPassengers}</p>
                    <p className="complex-query"><b>Avg Earnings &nbsp; : &nbsp; </b> {this.state.avgEarnings}</p>
                </div>

            </div>
        )
    }
}
