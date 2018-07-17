import React, { Component } from "react";

class TaskForm extends Component {
    render() {
        return (
            <React.Fragment>
                <form>
                    {/* Name Input Field */}
                    <label htmlFor="taskNameVal">Name: </label>
                    <input
                    type="text"
                    id="taskNameVal"
                    name="taskNameVal"
                    autofocus=""
                    />
                    {/* Due Date Input Field */}
                    <label htmlFor="taskDueDateVal">Due Date: </label>
                    <input
                    type="text"
                    id="taskDueDateVal"
                    name="taskDueDateVal"/>
                    {/* Submit Button */}
                    <input 
                    type="submit"
                    id="taskSubmitBtn"
                    />
                </form>

            </React.Fragment>
        )
    }
}

export default TaskForm // exports to Tasks.js