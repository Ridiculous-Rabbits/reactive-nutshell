import React, { Component } from "react";
import APIHandler from "../APIHandler";
import TaskForm from "./TaskForm";
import TaskCard from "./TaskCard";

class Tasks extends Component {
  state = {
    tasks: []
  };

  // archiveTaskAndReRenderDOM = arr => {
  //   let updatedData = [];
  //   arr.forEach(i => {
  //     // if (i.completed !== true) {
  //       updatedData.push(i);
  //       console.log(updatedData);
  //     // }
  //   });
  //   this.setState({ tasks: updatedData });
  // };

  getUserTasks = () => {
    let sessionUser = JSON.parse(sessionStorage.getItem("credentials"));
    let localUser = JSON.parse(localStorage.getItem("credentials"));

    if (sessionUser !== null) {
      APIHandler.getTaskUserId(sessionUser.userId).then(taskList => {
        this.setState({ tasks: taskList });
      });
    } else if (localUser !== null) {
      APIHandler.getTaskUserId(localUser.userId).then(taskList => {
        this.setState({ tasks: taskList });
      });
    }
  };

  // gets data from database
  componentDidMount = () => {
   return this.getUserTasks();
  };

  // onChange - capture change in data user is entering in input fields
  handleFieldChange = e => {
    const stateToChange = {};
    stateToChange[e.target.id] = e.target.value;
    this.setState(stateToChange);
  };

  getUserId = () => {
    let sessionUser = JSON.parse(sessionStorage.getItem("credentials"));
    let localUser = JSON.parse(localStorage.getItem("credentials"));

    if (sessionUser !== null) {
      return sessionUser.userId;
    } else {
      return localUser.userId;
    }
  };

  // onSubmit - add new task to Database and re-render DOM
  addNewTask = () => {
    let newTask = {
      task: this.state.taskNameVal,
      date: this.state.taskDueDateVal,
      userId: this.getUserId(),
      completed: false
    };

    APIHandler.addData("tasks", newTask)
      .then(() => {
        this.getUserTasks();
      })

      .then(taskList => {
        this.setState({ tasks: taskList });
      });
  };

  // onClick - delete a task from Database and re-render DOM
  deleteTask = id => {
    APIHandler.deleteData("tasks", id)
      .then(() => {
        this.getUserTasks();
      })
      // .then(taskList => {
      //   console.log(taskList);
      //   this.setState({ tasks: taskList });
      // });
  };

  handleCheckBox = (e, id) => {
    let archiveTask = {
      completed: true
    };

    let checkBox = e.target.checked;

    if (checkBox) {
      APIHandler.archiveTask(id, archiveTask)
        .then(() => {
          this.getUserTasks();
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
            handleCheckBox={this.handleCheckBox}
          >
            {task.task}
          </TaskCard>
        ))}
      </React.Fragment>
    );
  }
}

export default Tasks; // exports to ApplicationViews.js
