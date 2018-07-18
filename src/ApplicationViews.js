import { Route } from 'react-router-dom'
import React, { Component } from 'react'
import Login from './Login'
import Events from  "./Events/Events"
import News from  "./News/News"
import NewsList from './News/NewsList';

export default class ApplicationViews extends Component {
    
    isAuthenticated = () => localStorage.getItem("credentials") !== null || 
sessionStorage.getItem("credentials") !== null

    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={props =>{
                    if(this.isAuthenticated()) {
                        return <Events />
                    } else {
                        return <Login />
                    }
                }} />
                <Route path="/login" component={Login} />
                <Route exact path="/news" render={props =>{
                    if(this.isAuthenticated()) {
                        return <NewsList />
                    } else {
                        return <Login />
                    }
                }} />
                <Route path="/login" component={Login} />
            </React.Fragment>
        )
    }
}