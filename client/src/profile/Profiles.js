import React, { Component } from "react";
import Profile from './Profile';
import img1 from '../assets/driver.jpg';
import img2 from '../assets/passenger.jpg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

class Profiles extends Component {
    render() {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <h1 className="profile-header">WHAT ARE YOU TODAY?</h1>
                </Row>


                <Row className="justify-content-md-center">
                    <Col>
                        <Profile className="Profile-box" imgsrc={img1} title="Driver" button="Drive Now" link="/driver" />
                    </Col>
                    <Col>
                        <Profile className="Profile-box" imgsrc={img2} title="Passenger" button="Ride Now" link="/searchRides" />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Profiles;