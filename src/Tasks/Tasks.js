import React, { Component } from "react";
import APIHandler from "../APIHandler";
import TaskForm from "./TaskForm";
import TaskCard from "./TaskCard";

class Tasks extends Component {
  state = {
    tasks: []
  };

  archiveTaskAndReRenderDOM = () => {
      let updatedData = [];
      taskList.forEach(i => {
        if (i.completed !== true) {
          updatedData.push(i);
          console.log(updatedData);
        }
      })
      this.setState({ tasks: updatedData });
  }

  // gets data from database
  componentDidMount = () => {
    APIHandler.getData("tasks").then(tasks => {
      let updatedData = [];
      tasks.forEach(i => {
        if (i.completed !== true) {
          console.log(i);
          updatedData.push(i);
          console.log(updatedData);
        }
      })
      this.setState({ tasks: updatedData });
    })
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

  handleCheckBox = (e, id) => {

    let archiveTask = {
      completed: true
    }

    let checkBox = e.target.checked;

    if (checkBox) {
      console.log("checkbox WORKS");
      APIHandler.archiveTask(id, archiveTask)
      .then(() => {
        return APIHandler.getData("tasks");
      })
      .then(taskList => {
        let updatedData = [];
        taskList.forEach(i => {
          if (i.completed !== true) {
            updatedData.push(i);
            console.log(updatedData);
          }
        })
        this.setState({ tasks: updatedData });
      });
    } else {
      console.log("checkbox not checked");
    }
  };

  render() {
    return (
      <React.Fragment>
        <TaskForm
          addNewTask={this.addNewTask}
          handleFieldChange={this.handleFieldChange}
        />
        {
          this.state.tasks.map(task => (
          <TaskCard
          key={task.id}
          task={task}
          deleteTask={this.deleteTask}
          handleCheckBox={this.handleCheckBox}>
            {task.task}
          </TaskCard>
        ))
        }
      </React.Fragment>
    );
  }
}

export default Tasks; // exports to ApplicationViews.js
