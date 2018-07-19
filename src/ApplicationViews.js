import { Route } from "react-router-dom";
import React, { Component } from "react";
import Login from "./Login";
import Events from "./Events/Events";
import News from "./News/News";
import Tasks from "./Tasks/Tasks";
import EditTask from "./Tasks/EditTask";
import PrintFriends from "./Friends/PrintFriends";
import EventList from "./Events/EventList";
import News from "./News/News";
import NewsList from "./News/NewsList";

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
        <Route path="/login" component={Login} />
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
            return (
              <EditTask task={props.location.state.task} {...props} />
            );
          }}
        />
      </React.Fragment>
    );
  }
}
