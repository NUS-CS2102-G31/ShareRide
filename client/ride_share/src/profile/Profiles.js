import React, { Component } from "react";
import Profile from './Profile';
import img1 from '../assets/driver.jpg';
import img2 from '../assets/passenger.jpg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

class Profiles extends Component {
    render() {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <h2>WHAT ARE YOU TODAY?</h2>
                </Row>


                <Row className="justify-content-md-center">
                    <Col>
                        <Profile className="Profile-box" imgsrc={img1} title="Driver" button="Drive Now" />
                    </Col>
                    <Col>
                        <Profile className="Profile-box" imgsrc={img2} title="Passenger" button="Ride Now" />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Profiles;