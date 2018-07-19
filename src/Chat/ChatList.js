import React, { Component } from 'react'
import ChatMsg from './ChatMsg'
import APIHandler from '../APIHandler'
import ChatInput from './ChatInput'

export default class ChatList extends Component {

    state = {
        chatMsgs: []
    }

    refresh = () => {
        APIHandler.getData("messages")
            .then(chatMsgs => {
                // console.log(chatMsgs)
                this.setState({ chatMsgs: chatMsgs })
            })
    }
    componentDidMount() {
        this.refresh()
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.state.chatMsgs.map(chatMsg =>
                        < ChatMsg key={chatMsg.id} chatMsg={chatMsg}>
                            {chatMsg.message}
                        </ChatMsg>
                    )
                }
                <ChatInput refresh={this.refresh} />
            </React.Fragment>
        )
    }

}