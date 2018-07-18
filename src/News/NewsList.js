import React, { Component } from "react";
import News from "./News";

export default class NewsList extends Component {
  state = {
    news: []
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
      // When DELETE is finished, retrieve the new list of animals
      .then(() => {
        // Remember you HAVE TO return this fetch to the subsequent `then()`
        return fetch("http://localhost:5002/news");
      })
      // Once the new array of animals is retrieved, set the state
      .then(a => a.json())
      .then(newsList => {
        this.setState({
          news: newsList
        });
      });
  };

  addNewNews = () => {
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
        synopsis: this.state.synopsis
      })
    })
      // When POST is finished, retrieve the new list of animals
      .then(() => {
        // Remember you HAVE TO return this fetch to the subsequenet `then()`
        return fetch("http://localhost:5002/news");
      })
      // Once the new array of animals is retrieved, set the state
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

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.addNewNews}>
          <input
            type="text"
            placeholder="Article Title"
            id="title"
            onChange={this.handleFieldChange}
          />
          <input
            type="text"
            placeholder="Synopsis"
            id="synopsis"
            onChange={this.handleFieldChange}
          />
          <input
            type="url"
            placeholder="Article URL"
            id="url"
            onChange={this.handleFieldChange}
          />
          <button type="submit">Save Article</button>
        </form>
        {this.state.news.map(news => (
          <News key={news.id} news={news} checkOutNews={this.checkOutNews} />
        ))}
      </React.Fragment>
    );
  }
}
