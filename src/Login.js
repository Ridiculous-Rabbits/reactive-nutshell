import React, { Component } from 'react'

export default class Login extends Component {

    state = {
        email: "",
        password: ""
    }

    handleFieldChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    handleLogin = (event) => {
       //Stops default action of form reloading
        event.preventDefault()

        const checkbox = document.getElementById('checkbox')
        if (checkbox.checked) {
            localStorage.setItem(
                "credentials",
                JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            )
        } else {
            sessionStorage.setItem(
                "credentials",
                JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            )
        }
    }
        render() {
            return(
                <form onSubmit={this.handleLogin}>
                    <h1 className="h3 mb-3 font-weight-normal">Please Sign-In</h1>
                    <label htmlFor="inputEmail">
                        Email Address
                    </label>
                    <input onChange={this.handleFieldChange} type="email" id="email" 
                    placeholder="Email Address" 
                    required=""
                    autoFocus=""/>
                    <label htmlFor="inputPassword">
                        password
                    </label>
                    <input onChange={this.handleFieldChange} type="password" id="password"
                    placeholder="Password"
                    required=""/>
                    <label>
                        Remember Me
                    </label>
                    <input type="checkbox" id="checkbox"/>
                    <button type="submit">
                    Submit
                    </button>
                </form>
            )
        }
    }
