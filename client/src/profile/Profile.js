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
// <Container>
//     <Row>
//         <Col sm={6}>sm=6</Col>
//         <Card style={{ width: '18rem' }}>
//             <Card.Img variant="top" src="holder.js/100px180" />
//             <Card.Body>
//                 <Card.Title>Card Title</Card.Title>
//                 <Card.Text>
//                     Some quick example text to build on the card title and make up the bulk of
//                     the card's content.
//                  </Card.Text>
//                 <Button variant="primary">Go somewhere</Button>
//             </Card.Body>
//         </Card>
//         <Col sm={6}>sm=6</Col>

//     </Row>
// </Container>
// )

export default Profile;