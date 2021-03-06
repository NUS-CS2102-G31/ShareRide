import React from "react";
import "./Register.css";
import {
  Form,
  Button
} from "react-bootstrap";
import { Switch, Route } from 'react-router-dom';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      phone: "",
      name: "",

      passwordError: "",
      phoneError: "",
      nameError: "",

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

    this.setState({
      passwordError: passwordError
    });

    if (passwordError.length) {
      return false;
    }

    return true;
  }

  handleSubmit = async event => {
    // Post request to backend
    event.preventDefault();
    const { history } = this.props;

    if (this.validateForm()) {
      let baseurl = "http://localhost:5000";
      if (process.env.NODE_ENV === 'production') {
        baseurl = "https://rideshare-app-nus.herokuapp.com";
      }

      const response = await fetch(`${baseurl}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "username": this.state.username,
          "password": this.state.password,
          "email": this.state.email,
          "phone": this.state.phone,
          "name": this.state.name
        })
      });

      if (response.ok) {
        const data = await response.json();
        this.setState({
          email: "",
          username: "",
          password: "",
          phone: "",
          name: "",
        });
        alert(data.message);
        history.push('/profile');

      } else {
        const err = await response.json();
        alert(err.error.detail);
      }
    }
  }

  renderForm() {
    return (
      <div className>
        <div className="form">
          <Form onSubmit={this.handleSubmit}>
            <h1 className="text-center signup-text">Sign Up</h1>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control required name="name" type="text" value={this.state.name} placeholder="Enter name" onChange={this.handleChange}>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control required name="username" type="text" value={this.state.username} placeholder="Enter username" onChange={this.handleChange}>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control required name="email" type="email" value={this.state.email} placeholder="Enter email" onChange={this.handleChange} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
            </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control required name="phone" type="text" value={this.state.phone} placeholder="Enter phone number" onChange={this.handleChange}>
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
              Sign Up
          </Button>

          </Form>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="Signup">
        {this.renderForm()}
      </div>
    );
  }
}