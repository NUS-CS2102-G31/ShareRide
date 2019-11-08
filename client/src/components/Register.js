import React from "react";
import "./Register.css";
import {
  Form,
  Button
} from "react-bootstrap";

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

    if (this.validateForm()) {
      let baseurl = "http://localhost:5000";
      if (process.env.NODE_ENV == 'production') {
        baseurl = "http://rideshare-app-nus.herokuapp.com";
      }

      const response = await fetch(`${baseurl}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.email,
          password: this.state.password,
          salt: "this.state.salt"
        })
      });

      if (response.ok) {
        const data = await response.json();
        this.setState({
          email: '',
          password: '',
          errorSubmit: false
        });
        alert(`User was created with ${this.state.email}!`);

        
      } else {
        const err = await response.json();

        this.setState({
          errorSubmit: true
        });

        alert(err.message + " possibly due to existing user account.");
      }
    }
  }

  renderForm() {
    return (
      <div className="form">
        <Form onSubmit={this.handleSubmit}>

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
            <Form.Control required name="email" type="email" value={this.state.email} placeholder="Enter email" onChange={this.handleChange}/>
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
            <Form.Control required name="password" type="password" value={this.state.password} placeholder="Password" onChange={this.handleChange}/>
            <Form.Text className="text-muted">
              {/* Password must be at least 8 characters in length. */}
            </Form.Text>
            <Form.Text style={{
              color: "red"
            }}>
              {this.state.passwordError}
            </Form.Text>
          </Form.Group>          

          <Button variant="primary" type="submit">
            Submit
          </Button>
        
        </Form>
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