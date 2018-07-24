import React, { Component } from "react";
import APIHandler from "../APIHandler";
import TaskForm from "./TaskForm";
import TaskCard from "./TaskCard";

export default class Tasks extends Component {
  // sets the state to be passed as props to children.
  state = {
    tasks: [] // tasks is an empty array bc we will be creating data from within the app and posting into DB
  };

  // called in componentDidMount(), addNewTask(), DeleteTask() & handleCheckBox() - queries the database for all tasks that are incomplete ("complete": false) and re-renders the DOM. checks whether user is in local or sessionStorage
  getUserTasks = () => {
    let sessionUser = JSON.parse(sessionStorage.getItem("credentials")); // gets sessionStorage
    let localUser = JSON.parse(localStorage.getItem("credentials")); // gets localStorage

    if (sessionUser !== null) { // if sessionStorage is populated with data (ie. user has logged in with sessionStorage)
      APIHandler.getTaskUserId(sessionUser.userId).then(taskList => {
        this.setState({ tasks: taskList });
      });
    } else if (localUser !== null) { // if localStorage is populated with data (ie. user has logged in with localStorage)
      APIHandler.getTaskUserId(localUser.userId).then(taskList => {
        this.setState({ tasks: taskList });
      });
    }
  };

  // called in addNewTask() - gets current session/localStorage data and assigns the logged in user's userId to the task(s) they've created
  getUserId = () => {
    let sessionUser = JSON.parse(sessionStorage.getItem("credentials")); // gets sessionStorage
    let localUser = JSON.parse(localStorage.getItem("credentials")); // gets localStorage

    if (sessionUser !== null) { // if sessionStorage is populated with data (ie. user has logged in with sessionStorage)
      return sessionUser.userId;
    } else { // if localStorage is populated with data (ie. user has logged in with localStorage)
      return localUser.userId;
    }
  };

  // queries database and re-renders the DOM. should only render tasks that are incomplete ("complete": false)
  componentDidMount = () => {
   return this.getUserTasks();
  };

  // onChange - capture change in data user is entering in input fields. is a PROP in TaskForm.js
  handleFieldChange = e => {
    const stateToChange = {};
    stateToChange[e.target.id] = e.target.value; // adds values from input fields into empty object
    this.setState(stateToChange); // updates database with the new data that has been passed in via stateToChange object
  };

  // onSubmit - add new task to Database and re-render DOM. is a PROP in TaskForm.js
  addNewTask = () => {
    let newTask = {
      task: this.state.taskNameVal, // gets the id of the name input field
      date: this.state.taskDueDateVal, // gets the id of the due date input field
      userId: this.getUserId(), // calls function that assigns each task a userId
      completed: false // sets initial task to incomplete
    };

    APIHandler.addData("tasks", newTask) // adds to new task data to database. notice that the newTask object is being passed in as an argument
      .then(() => {
        this.getUserTasks();
      })

      .then(taskList => {
        this.setState({ tasks: taskList }); // re-render DOM
      });
  };

  // onClick - delete a task from Database and re-render DOM. is a PROP in TaskCard.js
  deleteTask = id => {
    APIHandler.deleteData("tasks", id) 
      .then(() => {
        this.getUserTasks();
      })
  };

  // onClick - archive a task when box is checked and re-render DOM. is a PROP in TaskCard.js
  handleCheckBox = (e, id) => {
    let archiveTask = {
      completed: true // changes task from false to true
    };

    let checkBox = e.target.checked; // targeting the checkbox event - .checked is assuming that the checkbox has been checked

    if (checkBox) { // if checkbox is checked by user
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

// exports to ApplicationViews.js
