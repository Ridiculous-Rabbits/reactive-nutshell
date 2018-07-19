import { Route } from 'react-router-dom'
import React, { Component } from 'react'
import Login from './Login'
import EventList from "./Events/EventList"
import FriendList from "./Friends/FriendList"
import News from "./News/News"
import AddFriendForm from './Friends/AddFriendForm';

export default class ApplicationViews extends Component {

    isAuthenticated = () => localStorage.getItem("credentials") !== null ||
        sessionStorage.getItem("credentials") !== null

    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={props => {
                    if (this.isAuthenticated()) {
                        return <EventList />
                    } else {
                        return <Login />
                    }
                }} />
                <Route path="/login" component={Login} />
                <Route exact path="/friends" render={props => {
                    if (this.isAuthenticated()) {
                        return <FriendList />
                    } else {
                        return <Login />
                    }
                }} />
                <Route path="/friends/AddFriendForm" render={(props) => {
                    return <AddFriendForm {...props} />
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