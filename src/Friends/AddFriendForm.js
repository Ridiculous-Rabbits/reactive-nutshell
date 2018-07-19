import React, { Component } from "react"

export default class AddFriendForm extends Component {

    //Set initial state
    state = {}

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
        // if (document.getElementById("add-friend-input") === "") {
        //     alert("Please enter a valid friend name.")
        // } else {
        //     APIHandler.addData("friends", this.state.FriendName)
        // }
    }

    render() {
        return (
            <form onSubmit={this.handleAddFriend}>
                <input onChange={this.handleInputChange} type="text"
                    id="add-friend-input"
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
