import React, { Component } from 'react'
import AddFriend from './AddFriend'
import FriendList from "./FriendList"

import "bootstrap/dist/css/bootstrap.min.css"

export default class Friends extends Component {
    render() {
        return (
            <React.Fragment>
                <AddFriend />
                <FriendList />
            </React.Fragment>
        )
    }
}
