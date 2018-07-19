//William Kimball 2018
//This file builds each news item card

import React from "react";
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import "./News.css";

const News = props => {
  let timeStamp = props.news.timeStamp.slice(0, -11)
  return (
    <div className="card" style={{ width: `18rem` }}>
      {
        <div className="card-body">
          <h5 className="card-title">{props.news.title}</h5> <h6 className="card-text">{timeStamp}</h6>
          <p className="card-text">{props.news.synopsis}</p>
          <a href={props.news.url} target="_blank" className="card-text">Go To Article</a>
          {/* {
            <Link
              className="card-link"
              to={{
                pathname: `/news/${props.news.id}`,
                state: { news: props.news }
              }}
            >
              Go To Article
            </Link>
          } */}
          <a href="#" onClick={() => props.checkOutNews(props.news.id)}>
            Delete
          </a>
        </div>
      }
    </div>
  );
};

export default News;
