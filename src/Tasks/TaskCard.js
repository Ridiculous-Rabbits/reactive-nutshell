import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default props => {
        return (
        <div className="card" style={{width: `18rem`}}>
            <div className="card-body">
                <h5 className="card-title">
                    <u>{props.children}</u>
                </h5>
                <p className="card-text"><b>Due Date: </b>{props.task.date}</p>
                {
                    <button><Link className="card-link"
                    to={{
                        pathname: `/tasks/${props.task.id}/edit`,
                        state: { task: props.task }
                    }}>
                        Edit
                    </Link></button>
                }
                <button onClick={() => props.deleteTask(props.task.id)}>Delete</button>
                <br/>
                <label htmlFor="checkBox">Complete:</label>
                <br/>
                <input
                type="checkbox"
                name="checkBox"
                className="isChecked"
                onClick={(event) => props.handleCheckBox(event, props.task.id)}
                />
            </div>
        </div>
    )
}

// exports to Tasks.js
