import React, { Component } from "react";
import "./searchRides.css";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Card,
    FormGroup,
    Label,
    Input

} from "reactstrap";
import moment from 'moment';


export default class SearchRides extends Component {

    constructor(props) {
        super(props);
        this.state = {
            origin: '',
            destination: '',
            passengers: 0,
            posts: []
        };
    }



    // componentDidMount() {
    //     // I will use fake api from jsonplaceholder website
    //     // this return 100 posts 
    //     fetch("https://jsonplaceholder.typicode.com/posts")
    //         .then(response => response.json())
    //         .then(
    //             // handle the result
    //             (result) => {
    //                 this.setState({
    //                     isLoaded: true,
    //                     posts: result
    //                 });
    //             },
    //             // Handle error 
    //             (error) => {
    //                 this.setState({
    //                     isLoaded: true,
    //                     error
    //                 })
    //             },
    //         )
    // }


    // data: [
    //     { id: 1, driver: "Agus Sulistio", car: "Honda Jazz", price: "10", startAddr: "Heng Mui Keng", endAddr: "Siglap Road", startTime: "10.00" },
    //     { id: 2, driver: "Bambang Hermawan", car: "Mitsubishi", price: "12", startAddr: "Heng Mui Keng", endAddr: "Siglap Road", startTime: "10.00" },
    //     { id: 3, driver: "Candra Winata", car: "Honda Jazz", price: "10", startAddr: "Heng Mui Keng", endAddr: "Siglap Road", startTime: "10.00" },
    // ]

    handleChange = event => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    handleSubmit =  async (event) => {
        event.preventDefault();
        let baseurl = "http://localhost:5000";
        if (process.env.NODE_ENV === 'production') {
            baseurl = "http://rideshare-app-nus.herokuapp.com";
        }

        const response = await fetch(`${baseurl}/api/rides?origin=${this.state.origin}&destination=${this.state.destination}&seats=${this.state.passengers}`, {
            method: 'GET'
        });

        if (response.ok) {
            const resp = await response.json();

            resp.data.forEach(async (val, idx, arr) => {
                arr[idx].ridestarttime = moment(val.ridestarttime).format("dddd, MMMM Do YYYY, h:mm a");
            })

            this.setState({
                posts: resp.data
            });

            if (this.state.posts.length == 0) {
                alert("No rides found for that route!");
            }

        } else {
            const error = await response.json();
            alert(error.message);
        }
    }


    render() {
        const { posts } = this.state;

        return (
            <div className="advertiseForm">
                <Container className="mt-5">
                    <Row>
                        <Col xs={4}>
                            <Form className="formGroup searchRidesForm" onSubmit={this.handleSubmit}>
                                <h5 className="mb-3">Search for rides</h5>
                                <FormGroup row>
                                    <Label sm={3}>From</Label>
                                    <Col sm={9}>
                                        <Input type="text" name="origin" value={this.state.origin} id="formStartLocation" placeholder="Enter Start Address" onChange={this.handleChange}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={3}>To</Label>
                                    <Col sm={9}>
                                        <Input type="text" name="destination" value={this.state.destination} id="formEndLocation" placeholder="Enter Destination Address" onChange={this.handleChange}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={3}>Passengers</Label>
                                    <Col sm={9}>
                                        <Input type="text" name="passengers" value={this.state.passengers} id="formNumPassenger" min="0" max="5" placeholder="Passengers" onChange={this.handleChange}/>
                                    </Col>
                                </FormGroup>
                                <div className="clearfix">
                                    <Button outline color="success" className="float-right"> Submit</Button>{' '}
                                </div>
                            </Form>
                        </Col>
                        <Col xs="8">


                            <div>
                                {
                                    posts.map(post =>
                                        <div key={post.id} align="start" className="rides-list mb-3 line-separator">
                                            <Container>
                                                <Row>
                                                    <Col xs={3}>
                                                        <Row>
                                                            <h3 className="post-driver">{post.driver}</h3>
                                                        </Row>
                                                        <Row>
                                                            <small className="post-car">{post.car}</small>
                                                        </Row>
                                                    </Col>
                                                    <Col xs={7}>
                                                        <Row>
                                                            <p className="pull-left"><b>Departure: &nbsp;</b></p>
                                                            <p className="pull-right">{post.origin}</p>
                                                        </Row>
                                                        <Row>
                                                            <p className="pull-left"><b>Arrival:&nbsp;</b></p>
                                                            <p className="pull-right">{post.destination}</p>
                                                        </Row>
                                                        <Row>
                                                            <p className="pull-left"><b>Departure Time:&nbsp;</b></p>
                                                            <p className="pull-right">{post.ridestarttime}</p>
                                                        </Row>



                                                    </Col>
                                                    <Col xs={2}>
                                                        <h5 className="post-price">{post.price}</h5>
                                                    </Col>
                                                </Row>


                                            </Container>


                                        </div>
                                    )
                                }
                            </div>



                        </Col>
                    </Row>


                </Container>

            </div >


        )
    }

}

