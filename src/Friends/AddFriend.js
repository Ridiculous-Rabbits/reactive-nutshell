import React, { Component } from "react"
import APIHandler from "../APIHandler.js"
export default class AddFriend extends Component {

    //Set initial state
    state = {
        FriendName: ""
    }

    //Update state whenever and input field is changed
    handleInputChange = (e) => {
        const stateToChange = {}
        stateToChange[e.target.id] = e.target.value
        this.setState(stateToChange)
    }

    //Handle add friend function
    handleAddFriend = (e) => {
        //function goes here
        e.preventDefault()
        APIHandler.addData("friends", this.state.FriendName)
    }

    render() {
        return (
            <form onSubmit={this.handleAddFriend}>
                <input onChange={this.handleInputChange} type="text"
                    placeholder="Friend"
                    required=""
                    autoFocus=""
                />
                <button type="submit">
                    Add Friend
                </button>
            </form>
        )
    }
}

