import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import APIManager from "./../APIHandler";
import { Redirect } from "react-router-dom";
// import history from './../history'

export default class NavBar extends Component {
  state = {
    search: ""
  };

  // setRedirect = () => {
  //   this.setState({
  //     redirect: true
  //   })
  // }

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  handleSubmit = event => {
    event.preventDefault();
    APIManager.getAllResults(this.state.search)
      .then(results => this.setState({ results: results }))
      .then(() => {
        // history.push('/search')
      });
    //do something...
  };

  render() {
    // const { redirect } = this.state.redirect;

    // if (redirect) {
    //   return <Redirect to={{
    //     pathname: "/search",
    //     state: state.results
    //   }}/>;
    // }
    return (
      <nav>
        <Link to="/">Events</Link>
        <Link to="/news">News</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/friends">Friends</Link>
        <Link to="/messages">Messages</Link>
      </nav>
    );
  }
}
