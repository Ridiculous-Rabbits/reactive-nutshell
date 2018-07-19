//William Kimball 2018
//This file builds each news item card

import React from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./News.css";

const News = props => {
  return (
    <div className="card" style={{ width: `18rem` }}>
      {
        <div className="card-body">
          <h5 className="card-title">{props.news.title}</h5>
          <p className="card-text">{props.news.synopsis}</p>
          <a href={props.news.url} target="_blank" className="card-text">www.{props.news.url}</a>
          {/* <Link to={props.news.url}>{props.news.url}</Link>  */}
          {
            <Link
              className="card-link"
              to={{
                pathname: `/news/${props.news.id}`,
                state: { news: props.news }
              }}
            >
              Details
            </Link>
          }
          <a href="#" onClick={() => props.checkOutNews(props.news.id)}>
            Delete
          </a>
        </div>
      }
    </div>
  );
};

export default News;
