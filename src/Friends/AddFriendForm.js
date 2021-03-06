import React, { Component } from "react"
import APIHandler from "../APIHandler"

export default class AddFriendForm extends Component {

    //Set initial state
    state = {}



    //Update state whenever and input field is changed
    handleInputChange = (e) => {
        const stateToChange = {}
        stateToChange[e.target.id] = e.target.value
        this.setState(stateToChange)
    }

    handleAddFriend = (e) => {
        //function goes here
        e.preventDefault()
        let signedInUser = JSON.parse(localStorage.getItem("credentials"));
        if (signedInUser === null) {
            signedInUser = JSON.parse(sessionStorage.getItem("credentials"));
            signedInUser = signedInUser.userId;
        } else {
            signedInUser = signedInUser.userId;
        }
        // let signedInUser = JSON.parse(sessionStorage.getItem("credentials"))

        let yourId = signedInUser

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
                                userId: userObject.id,
                                yourId: yourId
                            })
                        }).then(() => {
                            return APIHandler.getData(`friends?_expand=user&yourId=${yourId}`)
                        }).then(() => {
                            this.props.history.push("/friends")
                        })
                    }
                })
            })
    }

    render() {
        return (

            <React.Fragment>
                {
                    <form onSubmit={this.handleAddFriend}>
                        <button type="submit" className="friend-button">
                            Save
                        </button>

                        <input
                            onChange={this.handleInputChange}
                            type="text"
                            id="newFriend"
                            placeholder="Friend"
                            required="true"
                            autoFocus=""
                            className="friend-input"
                        />



                    </form>
                }


            </React.Fragment>

        )
    }
}
