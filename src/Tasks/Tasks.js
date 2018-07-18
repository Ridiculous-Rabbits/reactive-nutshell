import React, { Component } from "react";
import APIHandler from "../APIHandler";
import TaskForm from "./TaskForm";
import TaskCard from "./TaskCard";

class Tasks extends Component {
    state = {
        tasks: []
    }

    // gets data from database
    componentDidMount = () => {
        APIHandler.getData(tasks)
        .then(tasks => this.setState(
            { tasks: tasks }
        ));
    }

    // onChange - capture change in data user is entering in input fields
    handleFieldChange = e => {
        const stateToChange = {};
        stateToChange[e.target.id] = e.target.value;
        this.setState(stateToChange);
    }

    // onSubmit - add new task to Database and re-render DOM
    addNewTask = () => {
        APIHandler.addData(tasks, tasks)
        .then(() => {
            return APIHandler.getData(tasks);
        })

        .then(tasks => {
            this.setState(
                { tasks: tasks}
            )
        })
    }

    // onClick - delete a task from Database and re-render DOM
    deleteTask = () => {
        APIHandler.deleteData(tasks, id)
        .then(() => {
            APIHandler.getData(tasks)
        })
        .then(tasks => {
            console.log(tasks);
            this.setState({
              tasks: tasks
            });
          });
    }

    // onClick - edit a task, submit changes to database and re-render DOM
    editTask = () => {
        APIHandler.editData(tasks, id, tasks)
    }

    render() {
        return (
            <TaskForm handleFieldChange={this.handleFieldChange} />

            <React.Fragment>
                <TaskCard />
            </React.Fragment>
        )
    }
}

export default Tasks; // exports to ApplicationViews.js
