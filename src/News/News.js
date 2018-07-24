//William Kimball 2018
//This file builds each news item card

import React from "react";
import "./News.css";



const News = props => {
  let thisNews = "";
  if (props.news.userId == props.user) {
      thisNews = "yourNews news"
  } else {
      thisNews = "theirNews news"
  }

  console.log(props)

  return (
    <div className="card"  >
      {
        <div className="card-body" className={thisNews} >
          <h5 className="card-title">{props.news.title}</h5>
          <h6 className="card-text">{props.news.timeStamp}</h6>
          <p className="card-text">Added by: {props.news.user.name}</p>
          <p className="card-text">Synopsis: {props.news.synopsis}</p>
          <a className="card-text" target="_blank" href={props.news.url}>Go To Article</a>
          <a href="#" onClick={() => props.checkOutNews(props.news.id)}>
            Delete
          </a>
        </div>
      }
    </div>
  );
};

export default News;
