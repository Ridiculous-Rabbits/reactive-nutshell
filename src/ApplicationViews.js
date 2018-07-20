import { Route } from "react-router-dom";
import React, { Component } from "react";
import Login from "./Login";
import Tasks from "./Tasks/Tasks";
import EditTask from "./Tasks/EditTask";
import EventList from "./Events/EventList";
import News from "./News/News";
import FriendList from "./Friends/FriendList";
import AddFriendForm from "./Friends/AddFriendForm";
import EventForm from "./Events/EventForm";
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
              return <FriendList />;
            } else {
              return <Login />;
            }
          }}
        />
        <Route
          path="/friends/AddFriendForm"
          render={props => {
            return <AddFriendForm {...props} />;
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
        <Route
          exact
          path="/eventForm"
          render={props => {
            return <EventForm {...props} />;
          }}
        />
        <Route
          exact
          path="/Tasks"
          render={props => {
            if (this.isAuthenticated()) {
              return <Tasks />;
            } else {
              return <Login />;
            }
          }}
        />
        <Route
          path="/tasks/:taskId/edit"
          render={props => {
            return <EditTask task={props.location.state.task} {...props} />;
          }}
        />
      </React.Fragment>
    );
  }
}
