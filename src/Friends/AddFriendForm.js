import React, { Component } from "react"
import APIHandler from "../APIHandler"

export default class AddFriendForm extends Component {

    //Set initial state
    state = {
        userId: "1"
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
                console.log(userArray)
                userArray.forEach(userObject => {
                    console.log(userObject.id)

                    if (userObject.name === this.state.newFriend) {
                        fetch(`http://localhost:5002/friends`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json; charset=utf-8"
                            },
                            body: JSON.stringify({
                                userId: userObject.id,
                                yourId: 1
                            })
                        }).then(() => {
                            return APIHandler.getData(`friends?_expand=user&yourId=1`)
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
                }


            </React.Fragment>

        )
    }
}
