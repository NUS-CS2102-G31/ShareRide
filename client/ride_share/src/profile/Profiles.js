import React, { Component } from "react";
import Profile from './Profile';
import img1 from '../assets/driver.jpg';
import img2 from '../assets/passenger.jpg';

class Profiles extends Component {
    render() {
        return (
            <div className="container-fluid d-flex justify-content-center">
                <div className="row">
                    <div className="col-md-6">
                        <Profile imgsrc={img1} title="Driver" button="Drive Now" />
                    </div>
                    <div className="col-md-6">
                        <Profile imgsrc={img2} title="Passenger" button="Ride Now" />
                    </div>

                </div>
            </div>
        );
    }
}

export default Profiles;