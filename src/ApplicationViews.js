
import { Route } from "react-router-dom";
import React, { Component } from "react";
import Login from "./Login";
import PrintFriends from "./Friends/PrintFriends";
import EventList from  "./Events/EventList"
import EventForm from "./Events/EventForm"
import News from "./News/News";
import NewsList from "./News/NewsList";
import ChatList from './Chat/ChatList'
import EditChat from "./Chat/EditChat";
import ChatMsg from './Chat/ChatMsg'

export default class ApplicationViews extends Component {
  isAuthenticated = () =>
    localStorage.getItem("credentials") !== null ||
    sessionStorage.getItem("credentials") !== null;

   
                               
  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            if (this.isAuthenticated()) {
              return <EventList />;
            } else {
              return <Login />;
            }
          }}
        />
        <Route path="/login" component={Login} />
        <Route
          exact
          path="/friends"
          render={props => {
            if (this.isAuthenticated()) {
              return <PrintFriends />;
            } else {
              return <Login />;
            }
          }}
        />
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
        <Route 
        exact 
        path='/messages' 
        render={props => {
                    if(this.isAuthenticated()) {
                        return <ChatList />
                    } else {
                        return <Login />
                    }
                }} />
        <Route path="/chatMsg/:chatMsgId/EditChat" render={(props) => {
            return (<EditChat chatMsg={props.location.state.chatMsg} {...props} />)
        }}/>
        <Route exact path="/eventForm" render={(props) => {
            return <EventForm {...props}/>
        }} />
      </React.Fragment>
    );
  }
}
