//Natasha Cox
import React, { Component } from 'react'
import APIHandler from '../APIHandler';

export default class Chat extends Component {

    state = {
        message: ""
    }

    handleFieldChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }

    handleChat = (event) => {
        //Stops default action of form reloading
        event.preventDefault()

        let newMessage = document.getElementById("message").value
        let signedInUser = JSON.parse(localStorage.getItem("credentials"));
        if (signedInUser === null) {
            signedInUser = JSON.parse(sessionStorage.getItem("credentials"));
            signedInUser = signedInUser.userId;
        } else {
            signedInUser = signedInUser.userId;
        }


        const newChatMsg = {
            userId: signedInUser,
            message: newMessage
        }

        APIHandler.addData("messages", newChatMsg)
            .then(() => {
                this.props.refresh()
            })

    }


    render() {
        return (
            <form onSubmit={this.handleChat} className="centerMe">
                <label htmlFor="type message">
                </label>
                <input onChange={this.handleFieldChange} type="text" id="message"
                    placeholder="Type Message"
                    required=""
                    autoFocus="" />
                <button type="submit">
                    Send
                    </button>
            </form>
        )
    }
}