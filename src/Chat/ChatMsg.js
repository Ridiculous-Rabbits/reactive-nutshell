import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'


export default props => {
    let message = {}

// Check if the data is in `props.animal`
if (props.hasOwnProperty("chatMsg")) {
    message = props.chatMsg

// If not, data will be in `props.location.state.message`
} else {
    message = props.location.state.chatMsg
}
   return (
        <div className="card" style={{width: `18rem`}}>
            <div className="card-body">
                <h6 className="card-title">
                    {message.message}
                </h6>
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