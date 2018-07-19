
// coded by Jenn
import React, { Component } from "react"
import Event from "./Event"
import APIHandler from "./../APIHandler"
import EventForm from "./EventForm"
import { Link } from "react-router-dom"

// import 'react-datepicker/dist/react-datepicker.css';

export default class EventList extends Component {
    state = {
        events: []
    }

    componentDidMount=() => {
        APIHandler.getData("events?_sort=date&_order=asc")
            .then(events => this.setState({
                events: events
            }))
    }

    deleteEvent = (id) => {
        APIHandler.deleteData("events", id)
        .then(()=>{
            return APIHandler.getData("events?_sort=date&_order=asc")
        })
        .then(eventList => {
            this.setState({
                events: eventList
            })
        })
    }

    render() {
        return (
            <React.Fragment>
                {
                    <button>
                        <Link className="card-link"
                            to={{
                                pathname: "/eventForm",
                                state: {}
                            }}>
                            New Event
                        </Link>
                    </button>
                }
                {
                    this.state.events.map(event =>
                        <Event key={event.id} event={event} deleteEvent={this.deleteEvent} editEvent={this.editEvent}>
                            {event}
                        </Event>
                    )
                }
            </React.Fragment>
        )
    }
}