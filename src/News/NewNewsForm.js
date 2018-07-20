//William Kimball 2018
//This file builds an input form for adding a new news item

import React from "react";

const NewsForm = props => {
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
        type="text"
        placeholder="Article URL"
        id="url"
        onChange={props.handleFieldChange}
      />
      <button type="submit">Save Article</button>
    </form>
  );
};

export default NewsForm;
