import React, { Component } from "react";
import APIHandler from "../APIHandler";
import TaskForm from "./TaskForm";
import TaskCard from "./TaskCard";

class Tasks extends Component {
  state = {
    tasks: []
  };

  // gets data from database
  componentDidMount = () => {
    APIHandler.getData("tasks").then(tasks => this.setState({ tasks: tasks }));
  };

  // onChange - capture change in data user is entering in input fields
  handleFieldChange = e => {
    const stateToChange = {};
    stateToChange[e.target.id] = e.target.value;
    this.setState(stateToChange);
  };

  // onSubmit - add new task to Database and re-render DOM
  addNewTask = () => {
    let newTask = {
      task: this.state.taskNameVal,
      date: this.state.taskDueDateVal
    };

    APIHandler.addData("tasks", newTask)
      .then(() => {
        return APIHandler.getData("tasks");
      })

      .then(taskList => {
        this.setState({ tasks: taskList });
      });
  };

  // onClick - delete a task from Database and re-render DOM
  deleteTask = id => {
    APIHandler.deleteData("tasks", id)
      .then(() => {
        return APIHandler.getData("tasks");
      })
      .then(taskList => {
        console.log(taskList);
        this.setState({ tasks: taskList });
      });
  };

  handleCheckBox = id => {

    let isChecked = document.querySelector(".checkBox");

    if (isChecked === true) {
      APIHandler.archiveTask(id).then(taskList => {
        console.log(taskList);
        this.setState(
            { tasks: taskList }
        )
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <TaskForm
          addNewTask={this.addNewTask}
          handleFieldChange={this.handleFieldChange}
        />
        {this.state.tasks.map(task => (
          <TaskCard
          key={task.id}
          task={task}
          deleteTask={this.deleteTask}
          handleCheckBox={this.handleCheckBox}>
            {task.task}
          </TaskCard>
        ))}
      </React.Fragment>
    );
  }
}

export default Tasks; // exports to ApplicationViews.js
