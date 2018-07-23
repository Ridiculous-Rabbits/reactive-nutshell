
// coded by Jenn
import React, { Component } from "react"
import Event from "./Event"
import APIHandler from "./../APIHandler"
import EventForm from "./EventForm"
import { Link } from "react-router-dom"

import 'react-datepicker/dist/react-datepicker.css';

export default class EventList extends Component {
    state = {
        events: [],
        fList: []
    }

    componentWillMount = () => {
        let currentUser
        let sessionUser = JSON.parse(sessionStorage.getItem("credentials"))
        let localUser = JSON.parse(localStorage.getItem("credentials"))
        if (sessionUser !== null) {
            currentUser=  sessionUser.userId
        } else {
            currentUser= localUser.userId
        }
        APIHandler.allFriends()
        .then(fList => {
            fList.push(currentUser)
            this.setState({
                fList: fList
            })
        })
    }

    componentDidMount=() => {
        APIHandler.getData("events?_sort=date&_order=asc")
        .then(unfilterdEvents => {
            let filteredEvents = []
                unfilterdEvents.forEach(event => {
                    if (this.state.fList.includes(event.userId)) {
                        filteredEvents.push(event)
                        this.setState({
                            events: filteredEvents
                        })
                    } else {
                        this.setState({
                            events: []
                        })
                    }

                })
            })
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
                                state: {fList: this.state.fList}
                            }}>
                            New Event
                        </Link>
                    </button>
                }
                {
                    this.state.events.map(event =>
                        <Event key={event.id} event={event} fList={this.state.fList} deleteEvent={this.deleteEvent} editEvent={this.editEvent} getUser={this.getUser}>
                            {event}
                        </Event>
                    )
                }
            </React.Fragment>
        )
    }
}