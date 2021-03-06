//William Kimball 2018
//This file handles the functions for adding news items, state for the overall news component, deleting news items (for now), and rendering each card based off its time stamp//
import React, { Component } from "react";
import News from "./News";
import NewsForm from "./NewNewsForm";
import Moment from "moment";
import APIHandler from "./../APIHandler";

export default class NewsList extends Component {
  state = {
    news: [],
    newsForm: ""
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  checkOutNews = newsId => {
    // Delete the specified animal from the API
    fetch(`http://localhost:5002/news/${newsId}`, {
      method: "DELETE"
    })
      // When DELETE is finished, retrieve the new list of news
      .then(() => {
        return fetch("http://localhost:5002/news?_expand=user");
      })
      // Once the new array of news is retrieved, set the state
      .then(a => a.json())
      .then(newsList => {
        this.setState({
          news: newsList
        });
      });
  };

  addNewNews = event => {
    event.preventDefault();
    let timestamp = Moment().format("YYYY-MM-DD hh:mm:ss a");

    // Add new news to the API
    fetch(`http://localhost:5002/news?_expand=user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        title: this.state.title,
        url: this.state.url,
        userId: this.state.user,
        synopsis: this.state.synopsis,
        timeStamp: timestamp
      })
    })
      // When POST is finished, retrieve the new list of news
      .then(() => {
        // Remember you HAVE TO return this fetch to the subsequenet `then()`
        this.setState({
          newsForm: ""
        });
        alert("Added New Article Sucessfully");
        return fetch("http://localhost:5002/news?_expand=user");
      })
      // Once the new array of news is retrieved, set the state
      .then(a => a.json())
      .then(newsList => {
        this.setState({
          news: newsList
        });
      });
  };

  componentDidMount() {
    let currentUser = JSON.parse(localStorage.getItem("credentials"));
    if (currentUser === null) {
      currentUser = JSON.parse(sessionStorage.getItem("credentials"));
      currentUser = currentUser.userId;
    } else {
      currentUser = currentUser.userId;
    }

    fetch("http://localhost:5002/news?_expand=user")
      .then(e => e.json())
      .then(news => this.setState({ news: news }))
      .then(this.setState({ user: currentUser }))
      .then(
        APIHandler.myFriends().then(fList => {
          this.setState({
            friends: fList
          });
        })
      );
  }
  //this function
  changePressed = () => {
    if (this.state.newsForm === "") {
      this.setState({
        newsForm: (
          <NewsForm
            addNewNews={this.addNewNews}
            handleFieldChange={this.handleFieldChange}
          />
        )
      });
    } else {
      this.setState({
        newsForm: ""
      });
    }
  };

  //renders the new news button, the form conditionally, and each news card sorted based on their timestamp
  render() {
    return (
      <React.Fragment>
        <button onClick={this.changePressed} className="pleaseCenter">Add New News Article</button>
        {this.state.newsForm}
        {this.state.news
          .sort(function(left, right) {
            return Moment.utc(right.timeStamp).diff(Moment.utc(left.timeStamp));
          })
          .filter(itm => {
            let friends = []
            if (itm.userId === this.state.user) {
              return itm;
            } else {
              for (let key in this.state.friends) {
                if (itm.userId == this.state.friends[key]) {
                  friends.push(itm);
                }  return friends
              } 
            }
          })
          .map(news => (
            <News key={news.id} news={news} user={this.state.user} checkOutNews={this.checkOutNews} />
          ))}
      </React.Fragment>
    );
  }
}
