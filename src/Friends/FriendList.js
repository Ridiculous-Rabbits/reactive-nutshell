import React, { Component } from "react"
import Friends from "./Friends"
import APIHandler from "../APIHandler"
import { Link } from "react-router-dom"

import "bootstrap/dist/css/bootstrap.min.css"


export default class GetFriendList extends Component {
    state = {
        friends: [],
        users: []
    }

    componentDidMount() {
        APIHandler.getData(`friends?_expand=user&yourId=1`)
            .then(friends => this.setState({
                friends: friends
            }))
    }



    deleteFriend = (friendId) => {
        APIHandler.deleteData("friends", friendId)
            .then(() => {
                return APIHandler.getData(`friends?_expand=user&yourId=1`)
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