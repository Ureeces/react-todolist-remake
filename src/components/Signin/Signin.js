import React, { Component } from 'react';
import validator from "validator";

import "./Signin.css";

export default class Signin extends Component {
    state ={
        email: "",
        password: "",
        emailErrorMessage: "",
        passwordErrorMessage: "",
        submitErrorMessage: "",
        isEmailError: false,
        isPasswordError: false,
        isSubmitError: false,
        isAuth: false
    };

    /* *************************************************************
    email handles
    ************************************************************* */
    handleEmailOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
            isSubmitError: false,
            submitErrorMessage: ""
        },
        () => {
            const { email } = this.state;

            let isValidEmail = validator.isEmail(email);

            if(isValidEmail) {
                this.setState({
                    isEmailError: false,
                    emailErrorMessage: ""
                });
            } else {
                this.setState({
                    isEmailError: true,
                    emailErrorMessage: "Hey buddy, that email isn't valid"
                });
            }
        });
    }

    /* *************************************************************
    Password handles
    ************************************************************* */
    handlePasswordOnChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value,
        isSubmitError: false,
        submitErrorMessage: ""
    },
    () => {
        const { password } = this.state;

        let isValidPassword = validator.matches(
            password,
            "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#!@#$%^&*-]).{8,}$"
        );

        if(isValidPassword) {
            this.setState({
                isPasswordError: false,
                passwordErrorMessage: ""
            });
        } else {
            this.setState({
                isPasswordError: true,
                passwordErrorMessage: "sorry buddy, you can't pass with that word. You need 8 consisting of a capital, lowercase, and a 'special' character"
            })
        }
    });
}

    /* *************************************************************
    Submit handles
    ************************************************************* */
    handleOnSubmit = (event) => {
        event.preventDefault();

        const { 
            email, 
            password,
            isEmailError,
            isPasswordError,
            isSubmitError
        } = this.state;

        if(validator.isEmpty(email) && validator.isEmpty(password)) {
            this.setState({
                isSubmitError: true,
                submitErrorMessage: "Wow. You must be feeling 'empty' inside. "
            })
        }

        else if(validator.isEmpty(email)) {
            this.setState({
                isSubmitError: true,
                submitErrorMessage: "Sorry buddy, mailing to that address will be mailing to the void"
            })
        }

        else if(validator.isEmpty(password)) {
            this.setState({
                isSubmitError: true,
                submitErrorMessage: "Sorry buddy, ya can't pass with ''"
            })
        }

        else {
            if(
                isEmailError === false &&
                isPasswordError === false &&
                isSubmitError === false
            ) {
                this.setState({
                    isAuth: true
                },
                () => {
                    this.props.history.push("/todo");
                })
            }
        }
    }

    render() {
        const {
            email,
            password,
            emailErrorMessage,
            passwordErrorMessage,
            submitErrorMessage,
            isEmailError,
            isPasswordError,
            isSubmitError
        } = this.state;

        return (
            <div>
                <h1>The best todo list maker</h1>
                <form onSubmit={this.handleOnSubmit}>
                    {isSubmitError ? 
                    <div className="error">{submitErrorMessage}<br /></div> : null}
                    {isEmailError ? 
                    <div className="error">{emailErrorMessage}</div> : null}

                    <input 
                        type="text" 
                        placeholder="enter email"
                        name="email"
                        onChange={this.handleEmailOnChange}
                        value={email}
                    /><br />
                    {isPasswordError ? 
                    <div className="error">{passwordErrorMessage}</div> : null}


                    <input 
                        type="password" 
                        placeholder="enter password"
                        name="password"
                        onChange={this.handlePasswordOnChange}
                        value={password}
                    /><br />{" "}
                    <button type="submit">Sign In</button>
                </form>
            </div>
        );
    }
}

