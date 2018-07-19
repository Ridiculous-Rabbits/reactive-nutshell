import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css"

const Friend = ({ friend, children, deleteFriend }) => {
    return (
        <div className="card" style={{ width: `18rem` }}>
            <div className="card-body">
                <h5 className="card-title">
                    {friend.userId}
                </h5>
                <button type="submit" onClick={() => deleteFriend(friend.id)}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default Friend
