import React, { Component } from 'react'
import AddFriend from './AddFriend'

import "bootstrap/dist/css/bootstrap.min.css"

export default class Friends extends Component {
    render() {
        return (
            <React.Fragment>
                <AddFriend />
            </React.Fragment>
        )
    }
}