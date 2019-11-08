import React from "react";
import { Link } from 'react-router-dom';

const DriverForm = props => {
    return (
        // <div className="card text-center profile-box">
        //     <div className="overflow">
        //         <img src={props.imgsrc} alt="" className="img-fluid" />
        //     </div>
        //     <div className="card-body text-dark">
        //         <h4 className="card-title">{props.title}</h4>
        //         <a tag={Link} to={props.link} className="btn btn-outline-success">{props.button}</a>
        //     </div>
        // </div>
        <h1>kontol</h1>


    );
}
export default DriverForm;

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

// CREATE TABLE Rides (
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