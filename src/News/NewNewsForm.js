import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NewsForm = props => {
  // console.log(props)
  // if (props.buttonClicked === true) {
    return (
      <form onSubmit={props.addNewNews}>
        <input
          type="text"
          placeholder="Article Title"
          id="title"
          onChange={props.handleFieldChange}
        />
        <input
          type="text"
          placeholder="Synopsis"
          id="synopsis"
          onChange={props.handleFieldChange}
        />
        <input
          type="url"
          placeholder="Article URL"
          id="url"
          onChange={props.handleFieldChange}
        />
        <button type="submit">Save Article</button>
      </form>
    );
  }
// };

// News.propTypes = {
//   // This rule ensures that `news` is passed a property
//   // and that is an object - not a string or number
//   news: PropTypes.object.isRequired,
//   id: PropTypes.number,
//   name: PropTypes.string
// }

export default NewsForm;
