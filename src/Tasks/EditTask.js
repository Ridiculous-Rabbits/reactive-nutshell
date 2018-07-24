import React, { Component } from "react";
import APIHandler from "../APIHandler";

class EditTask extends Component {
  state = {
    task: this.props.task.task,
    date: this.props.task.date
  };

  handleFieldChange = e => {
    const stateToChange = {};
    stateToChange[e.target.id] = e.target.value;
    this.setState(stateToChange);
  };

  handleUpdate = e => {
    e.preventDefault();

    const updatedTask = {
      task: this.state.task,
      date: this.state.date,
      userId: this.props.task.userId,
      completed: this.props.task.completed
    };

    APIHandler.editData("tasks", this.props.task.id, updatedTask).then(() => {
      this.props.history.push("/tasks");
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

export default EditTask // exports to ApplicationViews.js