import { Route } from "react-router-dom";
import React, { Component } from "react";
import Login from "./Login";
import PrintFriends from "./Friends/PrintFriends";
import Events from "./Events/Events";
import News from "./News/News";

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
              return <Events />;
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
          path="/News"
          render={props => {
            if (this.isAuthenticated()) {
              return <News />;
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
      </React.Fragment>
    );
  }
}
