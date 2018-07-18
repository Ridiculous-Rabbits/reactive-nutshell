import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import APIHandler from "../APIHandler.js"

const Friend = ({ friend, children }) => {
    return (
        <div className="card" style={{ width: `18rem` }}>
            <div className="card-body">
                <h5 className="card-title">
                    {friend.userId}
                </h5>
                <button type="submit">
                    Delete
                </button>
            </div>
        </div>
    )
}

export default Friend
