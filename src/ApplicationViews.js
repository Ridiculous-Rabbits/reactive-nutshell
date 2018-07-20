import { Route } from 'react-router-dom'
import React, { Component } from 'react'
import Login from './Login'
import EventList from "./Events/EventList"
import FriendList from "./Friends/FriendList"
import News from "./News/News"
import AddFriendForm from './Friends/AddFriendForm';
import EventForm from "./Events/EventForm"
import NewsList from "./News/NewsList";

export default class ApplicationViews extends Component {
    isAuthenticated = () =>
        localStorage.getItem("credentials") !== null ||
        sessionStorage.getItem("credentials") !== null;


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
                <Route
                    exact
                    path="/news"
                    render={props => {
                        if (this.isAuthenticated()) {
                            return <NewsList />;
                        } else {
                            return <Login />;
                        }
                    }}
                />
                <Route
                    exact
                    path="/news/:articleId"
                    render={props => {
                        if (this.isAuthenticated() || this.seshIsAuthenticated()) {
                            return (
                                <News news={props.location.state.news} {...props}>
                                    {props.location.state.news.title}
                                </News>
                            );
                        } else {
                            return <Login />;
                        }
                    }}
                />
                <Route exact path="/eventForm" render={(props) => {
                    return <EventForm eventObject={props.location.state} {...props} />
                }} />
            </React.Fragment>
        );
    }
}

