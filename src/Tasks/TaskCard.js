import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default props => {
        return (
        <div className="card" style={{width: `18rem`}}>
            <div className="card-body">
                <h5 className="card-title">
                    {props.children}
                </h5>
                <p className="card-text">{props.task.date}</p>
                {
                    <Link className="card-link"
                    to={{
                        pathname: `/tasks/${props.task.id}/edit`,
                        state: { task: props.task }
                    }}>
                        Edit
                    </Link>
                }
                <button onClick={() => props.deleteTask(props.task.id)}>Delete</button>
                <br/>
                <input
                type="checkbox"
                className="isChecked"
                onClick={(event) => props.handleCheckBox(event, props.task.id)}
                />
            </div>
        </div>
    )
}

// exports to Tasks.js
