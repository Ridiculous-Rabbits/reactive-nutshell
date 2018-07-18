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

    render() {
        return(
            <React.Fragment>
                Event: <input id="name" />
                Location: <input id="location" />
                Date: <DatePicker selected={this.state.eventDate} onChange={this.handleChange} />
                <button onClick={this.addNewEvent}>Add New Event</button>
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