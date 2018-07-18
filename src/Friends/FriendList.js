import React, { Component } from "react"
import Friends from "./Friends"
import APIHandler from "../APIHandler"

export default class GetFriendList extends Component {
    state = {
        friends: []
    }

    componentDidMount() {
        APIHandler.getData("friends")
            .then(friends => this.setState({
                friends: friends
            }))
    }

    deleteFriend = (friendId) => {
        APIHandler.deleteData("friends", friendId)
            .then(() => {
                return APIHandler.getData("friends")
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