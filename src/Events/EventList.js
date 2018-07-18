import React, {Component} from "react"
import Event from "./Event"
import APIHandler from "./../APIHandler"


export default class EventList extends Component {
    state = {
        events: []
    }

    componentDidMount=() => {
        APIHandler.getData("events")
            .then(events => this.setState({
                events: events
            }))
    }

    deleteEvent = (id) => {
        APIHandler.deleteData("events", id)
        .then(()=>{
            return APIHandler.getData("events")
        })
        .then(eventList => {
            this.setState({
                events: eventList
            })
        })
    }

    addNewEvent = (id, body) => {
        APIHandler.addData("events", id, body)
        .then(()=>{
            return APIHandler.getData("events")
        })
        .then(eventList =>{
            this.setState({
                events: eventList
            })
        })
    }

    render() {
        return(
            <React.Fragment>
            {
                this.state.events.map(event =>
                    <Event key={event.id} event={event} deleteEvent={this.deleteEvent}>
                        {event}
                    </Event>
                )
            }
            </React.Fragment>
        )
    }
}