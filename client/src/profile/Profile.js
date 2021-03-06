import React from "react";
import {
    Container,
    Col,
    Row,
    Card,
    Button
} from "react-bootstrap";
import "./Profile.css"
import { Link } from 'react-router-dom';


const Profile = props => {
    return (
        <div className="card text-center profile-box">
            <div className="overflow">
                <img src={props.imgsrc} alt="" className="img-fluid" />
            </div>
            <div className="card-body text-dark">
                <h4 className="card-title">{props.title}</h4>
                <Link tag={Link} to={props.link}>
                    <a className="btn btn-outline-success">{props.button}</a>
                </Link>
            </div>
        </div>


    );
}

export default Profile;