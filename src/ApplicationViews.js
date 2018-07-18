import { Route } from 'react-router-dom'
import React, { Component } from 'react'
import Login from './Login'
import Events from  "./Events/Events"
import News from  "./News/News"

export default class ApplicationViews extends Component {

    isAuthenticated = () => localStorage.getItem("credentials") !== null ||
sessionStorage.getItem("credentials") !== null

    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={props =>{
                    if(this.isAuthenticated()) {
                        return <EventList />
                    } else {
                        return <Login />
                    }
                }} />
                <Route path="/login" component={Login} />
                <Route exact path="/News" render={props =>{
                    if(this.isAuthenticated()) {
                        return <News />
                    } else {
                        return <Login />
                    }
                }} />
                <Route path="/login" component={Login} />
            </React.Fragment>
        )
    }
}