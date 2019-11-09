import React, { Component } from "react";
import "./login.css";
import {
    Form,
    Button
} from "react-bootstrap";
import { Switch, Route } from 'react-router-dom';


export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",

            passwordError: "",
            usernameError: "",

            errorSubmit: null
        };
    }


    handleChange = event => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    validateForm = () => {
        let passwordError;
        if (this.state.password.length < 8) {
            passwordError = "Password should be at least 8 characters in length.";
        } else {
            passwordError = "";
        }

        let usernameError;
        if (this.state.username.length == 0) {
            usernameError = "Invalid Username"
        } else {
            usernameError = "";
        }

        this.setState({
            passwordError: passwordError,
            usernameError: usernameError
        });

        if (passwordError.length || usernameError.length) {
            return false;
        }

        return true;
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { history } = this.props;


        // history.push('/');

        // this.props.history.push("/");
        // console.log('DICKBIG');
        // alert('kontol');



        if (this.validateForm()) {



            let baseurl = "http://localhost:5000";
            // if (process.env.NODE_ENV == 'production') {
            baseurl = "http://rideshare-app-nus.herokuapp.com";
            // }

            const response = await fetch(`${baseurl}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": this.state.username,
                    "password": this.state.password
                })
            });

            if (response.ok) {


                const data = await response.json();
                localStorage.setItem('myUsernameStorage', this.state.username);

                this.setState({
                    username: '',
                    password: '',
                    errorSubmit: false
                });
                //HISTORY PUSH IS A REACT ROUTER LIBRARY THAT 
                alert('Login Succesful');
                history.push('/profile');





            } else {
                const err = await response.json();

                this.setState({
                    errorSubmit: true
                });

                alert(err.message + " possibly due to wrong username and password");
            }
        }
    }



    render() {
        return (
            <div className="login-form-wrapper" >
                <div className="form loginform">

                    <Form onSubmit={this.handleSubmit}>
                        <h1 className="text-center signup-text">Log In</h1>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control required name="username" type="text" value={this.state.username} placeholder="Enter username" onChange={this.handleChange}>
                            </Form.Control>
                        </Form.Group>


                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required name="password" type="password" value={this.state.password} placeholder="Password" onChange={this.handleChange} />
                            <Form.Text className="text-muted">
                                {/* Password must be at least 8 characters in length. */}
                            </Form.Text>
                            <Form.Text style={{
                                color: "red"
                            }}>
                                {this.state.passwordError}
                            </Form.Text>
                        </Form.Group>



                        <Button variant="success" type="submit">
                            Log In
                    </Button>
                    </Form>


                    {/* <form onSubmit={this.handleSubmit} noValidate>

                        <div className="login email">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="" placeholder="Email" name="email" onChange={this.handleChange} />
                        </div>
                        <div className="login password">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="" placeholder="Password" name="password" onChange={this.handleChange} />
                        </div>
                        <div className="createAccount">
                            <Button variant="success" type="submit">
                                Log In
                             </Button>

                        </div>




                    </form> */}
                </div>
            </div >

        );
    }
}

