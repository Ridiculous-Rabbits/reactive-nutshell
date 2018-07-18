import React, {Component} from "react"
import Event from "./Event"
import APIHandler from "./../APIHandler"
import DatePicker from "react-datepicker"
import moment from "moment"

import 'react-datepicker/dist/react-datepicker.css';

export default class EventList extends Component {
    state = {
        events: [],
        eventDate: moment()
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

    addNewEvent = () => {
        let eventName = document.getElementById("name").value
        let eventLocation = document.getElementById("location").value
        let eventDate = this.state.eventDate._d
        let body = {
            name: eventName,
            location: eventLocation,
            date: eventDate
        }
        console.log(eventDate)
        APIHandler.addData("events", body)
        .then(()=>{
            return APIHandler.getData("events")
        })
        .then(eventList =>{
            this.setState({
                events: eventList
            })
        })
    }

    handleChange = (date) => {
        this.setState({
          eventDate: date
        });
        console.log(this.state.eventDate._d)
      }

      editEvent = (id) => {
        console.log("edit")
      }

    render() {
        return(
            <React.Fragment>
                <div id="eventInput">
                    Event: <input class="event-input" id="name" />
                    Location: <input class="event-input" id="location" />
                    Date: <DatePicker class="event-input" selected={this.state.eventDate} onChange={this.handleChange} />
                    <button class="event-input" onClick={this.addNewEvent}>Add New Event</button>
                </div>
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