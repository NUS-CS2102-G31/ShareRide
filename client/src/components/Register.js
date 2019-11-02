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
      confirmPassword: "",
      phone: "",
      newUser: null,
      isLoading: false
    };

  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  // renderConfirmationForm() {
  //   return (
  //     <form onSubmit={this.handleConfirmationSubmit}>
  //       <FormGroup controlId="confirmationCode" bsSize="large">
  //         <FormLabel>Confirmation Code</FormLabel>
  //         <FormControl
  //           autoFocus
  //           type="tel"
  //           value={this.state.confirmationCode}
  //           onChange={this.handleChange}
  //         />
  //         <HelpBlock>Please check your email for the code.</HelpBlock>
  //       </FormGroup>
  //       <LoaderButton
  //         block
  //         bsSize="large"
  //         disabled={!this.validateConfirmationForm()}
  //         type="submit"
  //         isLoading={this.state.isLoading}
  //         text="Verify"
  //         loadingText="Verifying…"
  //       />
  //     </form>
  //   );
  // }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    // Post request to backend
    event.preventDefault();
    console.log(event)
    fetch('http://localhost:3600/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.email,
        password: this.state.password,
      })
    })
    // .then(res => alert(res.body.message));
    alert(`User has been created`)
  }

  renderForm() {
    return (
      <div className="form">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
          </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
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