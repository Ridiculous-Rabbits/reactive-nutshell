import React, { Component } from "react";

class TaskForm extends Component {
  render() {
    return (
      <React.Fragment>
        <form
          id="taskForm"
          onSubmit={this.props.addNewTask}
        >
          <h1>Add Task: </h1>

          {/* Name Input Field */}
          <label htmlFor="taskNameVal">Name: </label>
          <input
            type="text"
            id="taskNameVal"
            name="taskNameVal"
            autoFocus=""
            placeholder="Task Name"
            onChange={this.props.handleFieldChange}
          />

          {/* Due Date Input Field */}
          <label htmlFor="taskDueDateVal">Due Date: </label>
          <input
            type="date"
            id="taskDueDateVal"
            name="taskDueDateVal"
            onChange={this.props.handleFieldChange}
          />

          {/* Submit Button */}
          <input type="submit" id="taskSubmitBtn" />
        </form>
      </React.Fragment>
    );
  }
}

export default TaskForm; // exports to Tasks.js
