import React, { Component } from 'react'
import APIHandler from '../APIHandler'

export default class EditChat extends Component {
    state = {
        message: this.props.chatMsg.message
    };

    handleFieldChange = event => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value;
        this.setState(stateToChange)
    };

    handleEdit = event => {
        event.preventDefault();

        const editedMsg = { message: this.state.message,
        userId: this.props.chatMsg.userId }
        // console.log(editedMsg)
        // console.log(this.props.chatMsg.id)
        APIHandler.editData("messages", this.props.chatMsg.id, editedMsg)
            .then(() => {
                this.props.history.push("/messages")
            })
    };

    render() {
        return (
            <form onSubmit={this.handleEdit}>
                <h3 className="h3 mb-3 font-weight-normal">Edit Message</h3>
                <label htmlFor="type message">
                </label>
                <input
                    value={this.state.message}
                    onChange={this.handleFieldChange} 
                    type="text" 
                    id="message"
                    placeholder="Type Message"
                    required=""
                    autoFocus="" />
                <button type="submit">
                    Save
                </button>
            </form>
        )
    }
}
