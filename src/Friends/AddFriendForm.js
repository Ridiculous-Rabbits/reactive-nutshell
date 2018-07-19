import React, { Component } from "react"
import APIHandler from "../APIHandler"
export default class AddFriendForm extends Component {

    //Set initial state
    state = {
        yourId: "1",
        userExists: false
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
        APIHandler.getData("users")
            .then((userArray) => {
                userArray.forEach(userObject => {
                    if (userObject.name === this.state.newFriend) {
                        fetch(`http://localhost:5002/friends`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json; charset=utf-8"
                            },
                            body: JSON.stringify({
                                userId: this.state.newFriend,
                                yourId: 1,
                                userExists: true
                            })
                        })
                    }
                })
            })
        if (this.state.userExists !== true) {
            alert("Please enter a valid User Name")
        }
    }

    render() {
        return (
            <form onSubmit={this.handleAddFriend}>
                <input
                    onChange={this.handleInputChange}
                    type="text"
                    id="newFriend"
                    placeholder="Friend"
                    required="true"
                    autoFocus=""
                />
                <button type="submit">
                    Save
                </button>
            </form>
        )
    }
}
