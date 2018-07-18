import { Route } from 'react-router-dom'
import React, { Component } from 'react'
import Login from './Login'
import Events from "./Events/Events"
import Friends from "./Friends/Friends"

export default class ApplicationViews extends Component {

    isAuthenticated = () => localStorage.getItem("credentials") !== null ||
        sessionStorage.getItem("credentials") !== null

    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={props => {
                    if (this.isAuthenticated()) {
                        return <Events />
                    } else {
                        return <Login />
                    }
                }} />
                <Route path="/login" component={Login} />
                <Route path="/friends" component={Friends} />
            </React.Fragment>
        )
    }
}