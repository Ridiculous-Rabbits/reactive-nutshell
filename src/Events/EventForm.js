import React, { Component } from "react"
import APIHandler from "./../APIHandler"
import DatePicker from "react-datepicker"
import moment from "moment"
import { Link } from "react-router-dom"

export default class EventForm extends Component {

    constructor(props) {
        super(props)
        console.log(props)
        if (this.props.location.state.hasOwnProperty("event")) {
            this.state = {event:this.props.location.state.event, eventDate: moment()}
        } else {
            this.state = {event: {}, eventDate: moment()}
        }
    }




      eventFunction = () => {
          if (this.props.location.state.hasOwnProperty("event")) {

              console.log("edit", this.state.events)
              let eventName = document.getElementById("name").value()
              let eventLocation = document.getElementById("location").value()
              let eventDate = document.getElementById("datePicker").value()
              let eventId = this.props.location.state.event.id
              let body = {
                  name: eventName,
                  location: eventLocation,
                  date: eventDate,
                  id: eventId
              }
        } else {

            console.log("add", this.state.events)
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
                <div id="eventInput">
                    Event: <input class="event-input" id="name" value={this.state.event.name}/>
                    Location: <input class="event-input" id="location" value={this.state.event.location}/>
                    Date: <DatePicker class="event-input" selected={this.state.eventDate} onChange={this.handleChange} id="datePicker" value={this.state.event.date} />
                    <button onClick={this.eventFunction}>
                       Submit
                    </button>
                </div>
            </React.Fragment>
        )
    }
}