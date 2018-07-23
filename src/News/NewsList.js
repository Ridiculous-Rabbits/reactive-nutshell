//William Kimball 2018
//This file handles the functions for adding news items, state for the overall news component, deleting news items (for now), and rendering each card based off its time stamp//
import React, { Component } from "react";
import News from "./News";
import NewsForm from "./NewNewsForm";
import Moment from "moment";
import APIHandler from "./../APIHandler"

export default class NewsList extends Component {
  state = {
    news: [],
    newsForm: "",
    userId: "1"
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
        return fetch("http://localhost:5002/news");
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
    // console.log(timestamp);
    // Add new news to the API
    fetch(`http://localhost:5002/news`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        title: this.state.title,
        url:  this.state.url,
        userId: this.state.userId,
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
        alert("Added New Article Sucessfully")
        return fetch("http://localhost:5002/news");
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
    fetch("http://localhost:5002/news")
      .then(e => e.json())
      .then(news => this.setState({ news: news }));
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
    console.log(APIHandler.allFriends())
    return (
      <React.Fragment>
        <button onClick={this.changePressed}>Add New News Article</button>
        {this.state.newsForm}
        {this.state.news
          .sort(function(left, right) {
            return Moment.utc(right.timeStamp).diff(Moment.utc(left.timeStamp));
          })
          .filter(itm => {
            if (itm.userId === this.state.userId) {
              return itm;
            } else {
              return "";
            }
          })
          .map(news => (
            <News key={news.id} news={news} checkOutNews={this.checkOutNews} />
          ))}
      </React.Fragment>
    );
  }
}
