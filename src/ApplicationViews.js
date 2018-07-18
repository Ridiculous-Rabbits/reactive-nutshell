import { Route } from 'react-router-dom'
import React, { Component } from 'react'
import Login from './Login'
import EventList from  "./Events/EventList"
import PrintFriends from "./Friends/PrintFriends"
import News from "./News/News"

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
                <Route exact path="/friends" render={props => {
                    if (this.isAuthenticated()) {
                        return <PrintFriends />
                    } else {
                        return <Login />
                    }
                }} />
                <Route exact path="/News" render={props => {
                    if (this.isAuthenticated()) {
                        return <News />
                    } else {
                        return <Login />
                    }
                }} />

            </React.Fragment>
        )
    }
}