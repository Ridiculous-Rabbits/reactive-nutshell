import React from 'react'
import { Link } from 'react-router-dom'
import "./ChatStyle.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import APIHandler from "../APIHandler"
import AddFriendFunc from "../AddFriendFunc"




export default props => {
    let message = {}
    

// Check if the data is in `props.animal`
if (props.hasOwnProperty("chatMsg")) {
    message = props.chatMsg
    
    // If not, data will be in `props.location.state.message`
} else {
    message = props.location.state.chatMsg
}
let currentUser = JSON.parse(sessionStorage.getItem("credentials"))
let yourId = currentUser.userId
let addNewFriend = () => {
    APIHandler.getData("users")
                .then((userArray) => {

                    userArray.forEach(userObject => {
                        if (userObject.name === message.user.name) {
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

                            })
                        }
                    })
                })
        }


console.log("message.userId", message.userId)
console.log(currentUser.userId)
if (message.userId == currentUser.userId) {
    message.className = "message"
} else {
    message.className = "friendmessage"
}
return (
        <div className="card" style={{width: `18rem`}}>
            <div className="card-body">
                <button onClick={addNewFriend} id={message.user.name} className={message.user.name}>
                {message.user.name}:
                </button>
                <h3 className={message.className}>
                    {message.message}
                </h3>
                {
                <Link className="card-link"
                to={{
                    pathname: `/chatMsg/${props.chatMsg.id}/EditChat`,
                    state: { chatMsg: props.chatMsg }
                }}>
                Edit
                </Link>  
                }
            </div>
        </div>
    )
}