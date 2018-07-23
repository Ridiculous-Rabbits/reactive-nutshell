import React, { Component } from "react"
import Friends from "./Friends"
import APIHandler from "../APIHandler"
import { Link } from "react-router-dom"

import "bootstrap/dist/css/bootstrap.min.css"


export default class GetFriendList extends Component {
    state = {
        friends: [],
        userId: ""
    }

    componentDidMount() {
        let signedInUser = JSON.parse(localStorage.getItem("credentials"));
        if (signedInUser === null) {
            signedInUser = JSON.parse(sessionStorage.getItem("credentials"));
            signedInUser = signedInUser.userId;
        } else {
            signedInUser = signedInUser.userId;
        }
        // let signedInUser = JSON.parse(sessionStorage.getItem("credentials"))
        let yourId = signedInUser

        APIHandler.getData(`friends?_expand=user&yourId=${yourId}`)
            .then(friends => this.setState({
                friends: friends
            }))
    }



    deleteFriend = (friendId) => {
        let signedInUser = JSON.parse(sessionStorage.getItem("credentials"))
        let yourId = signedInUser.userId
        APIHandler.deleteData("friends", friendId)
            .then(() => {
                return APIHandler.getData(`friends?_expand=user&yourId=${yourId}`)
                    .then(friendList => {
                        this.setState({
                            friends: friendList
                        })
                    })
            })
    }

    render() {
        return (
            <React.Fragment>
                {
                    <button type="submit">
                        <Link type="card-link"
                            to={{
                                pathname: "/friends/AddFriendForm",
                                state: { friends: this.state.friends }
                            }}>
                            Add Friend
                        </Link>
                    </button>
                }
                {
                    this.state.friends.map(friend =>
                        <Friends key={friend.id}
                            friend={friend}
                            deleteFriend={this.deleteFriend}
                        />
                    )
                }
            </React.Fragment>
        )
    }
}