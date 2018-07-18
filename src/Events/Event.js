import React from "react"

const Event = ({event, children, deleteEvent, editEvent}) => {
    return (
        <div className="event" style={{width: `18rem`}}>
            <div className="card-body">
                <h5 className="card-title">
                    {children.name}
                </h5>
                <p className="card-text">{children.location}</p>
                <p className="card-text">
                {children.date}</p>
                <button onClick={() => deleteEvent(event.id)}>Delete</button>
                <button onClick={() => editEvent(event.id)}>Edit</button>
            </div>
        </div>
    )
}

export default Event