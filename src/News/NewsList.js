import React, { Component } from "react";
import News from "./News";
import NewsForm from "./NewNewsForm";
import Moment from 'moment';

export default class NewsList extends Component {
  state = {
    news: [],
    isPressed: ""
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
        // Remember you HAVE TO return this fetch to the subsequent `then()`
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
    let timestamp = Moment().format("YYYY-MM-DD hh:mm:ss a")
    console.log(timestamp)
    // Add new news to the API
    fetch(`http://localhost:5002/news`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        title: this.state.title,
        url: this.state.url,
        userId: this.state.userId,
        synopsis: this.state.synopsis,
        timestamp: timestamp
      })
    })
      // When POST is finished, retrieve the new list of news
      .then(() => {
        // Remember you HAVE TO return this fetch to the subsequenet `then()`
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

  changePressed = () => {
    if (this.state.isPressed === "") {
    this.setState({isPressed : <NewsForm
      addNewNews={this.addNewNews}
      handleFieldChange={this.handleFieldChange}
    />
    })
  } else {this.setState({isPressed : ""
  })}
  };

  render() {
    return (
      <React.Fragment>
        <button onClick={this.changePressed}>Add New News Article</button>
        {this.state.isPressed}
        {this.state.news.map(news => (
          <News key={news.id} news={news} checkOutNews={this.checkOutNews} />
        ))}
      </React.Fragment>
    );
  }
}
