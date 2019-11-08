import React, { Component } from "react";
import "./signup.css";

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
const formValid = formErrors => {
    let valid = true;

    //if got error, (the formErrors states is >0, got error message)
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false) //shortcut for if va.length, valid - false
    });

    //if no error, return valid which is deafult true
    return valid;
}
export default class Signup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",

            formErrors: {
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            }
        }
    }

    //own copy to modify values for this.state form errors 
    handleChange = e => {
        e.preventDefault();

        //copy the errors from state
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;

        console.log("Name", name);
        console.log("Value", value);

        switch (name) {
            case 'firstName':
                formErrors.firstName = value.length > 0
                    ? "this field cannot be empty"
                    : "";
                break;

            case 'lastName':
                formErrors.lastName = value.length > 0
                    ? "this field cannot be empty"
                    : "";
                break;
            case 'email':
                formErrors.email = emailRegex.test(value) && value.length > 0
                    ? ""
                    : "invalid email address";
                break;
            case 'password':
                formErrors.password = value.length >= 0 && value.length < 6
                    ? "minimum 6 characters required"
                    : "";
                break;
        }

        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    }

    handleSubmit = e => {
        e.preventDefault();

        if (formValid(this.state.formErrors)) {
            console.log(` 
            --submitting--
            firstName: ${this.state.firstName}
            lastName: ${this.state.lastName}
            email: ${this.state.email}
            password: ${ this.state.password}
                `
            )
        } else {
            console.log("FORM INVALID - DISPLAY ERRROR")
        }


    };

    render() {
        return (
            < div className="signupformwrapper" >
                <div className="form-wrapper">
                    <h2 className="text-center">Create Account</h2>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="signup firstName">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" className="" placeholder="First Name" name="firstName" onChange={this.handleChange} />
                        </div>
                        <div className="signup lastName">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" className="" placeholder="LastName" name="lastName" onChange={this.handleChange} />
                        </div>
                        <div className="signup email">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="" placeholder="Email" name="email" onChange={this.handleChange} />
                        </div>
                        <div className="signup password">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="" placeholder="Password" name="password" onChange={this.handleChange} />
                        </div>
                        <div className="createAccount">
                            <button type="submit">Create Account</button>
                            <small>Already Have an Account?</small>
                        </div>

                    </form>
                </div>
            </div >

        );
    }
}

