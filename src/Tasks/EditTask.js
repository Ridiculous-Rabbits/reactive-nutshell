import React, { Component } from "react";
import APIHandler from "../APIHandler";

export default class EditTask extends Component {
  state = {
    task: this.props.task.task,
    date: this.props.task.date
  };

  // onChange - capture change in data user is entering in input fields. called within this file
  handleFieldChange = e => {
    const stateToChange = {};
    stateToChange[e.target.id] = e.target.value; // adds values from input fields into empty object
    this.setState(stateToChange); // updates database with the new data that has been passed in via stateToChange object
  };

  // onSubmit - edit task data and re-render DOM
  handleUpdate = e => {
    e.preventDefault(); // stops default action of form reloading

    // when editing data, you need to include all keys in the data table, even if you are not going to edit all of the data values
    const updatedTask = {
      task: this.state.task,
      date: this.state.date,
      userId: this.props.task.userId,
      completed: this.props.task.completed
    };

    APIHandler.editData("tasks", this.props.task.id, updatedTask).then(() => { // passing in updatedTask object as an argument
      this.props.history.push("/tasks"); // what's going on here?
    });
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleUpdate}>
          <h1>Edit Task: </h1>

          {/* EDIT Name Input Field */}
          <label htmlFor="editTaskNameVal">Name: </label>
          <input
            type="text"
            id="task"
            name="editTaskNameVal"
            value={this.state.task}
            onChange={this.handleFieldChange}
          />

          {/* EDIT Due Date Input Field */}
          <label htmlFor="editTaskDueDateVal">Due Date: </label>
          <input
            type="date"
            id="date"
            name="editTaskDueDateVal"
            value={this.state.date}
            onChange={this.handleFieldChange}
          />

          {/* EDIT Submit Button */}
          <input type="submit" id="taskSubmitBtn" />
        </form>
      </React.Fragment>
    );
  }
}

// exports to ApplicationViews.js