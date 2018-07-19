// coded by Jenn
import React, { Component } from "react"
import APIHandler from "./../APIHandler"
import DatePicker from "react-datepicker"
import moment from "moment"
import { Link } from "react-router-dom"

export default class EventForm extends Component {

    constructor(props) {
        super(props)
        if (props.eventObject.hasOwnProperty("event")) {
            console.log(props.event)
            let event = this.props.eventObject.event
            this.state = {event: event, eventDate: moment()}
        } else {
            let event = {
                name: "",
                location: "",
                date: ""
            }
            this.state = {event: event, eventDate: moment()}
        }
    }





      eventFunction = () => {
          if (this.props.eventObject.hasOwnProperty("event")) {

              console.log("edit")
              let eventName = this.state.event.name
              let eventLocation = this.state.event.location
              let eventDate = this.state.eventDate
              let eventId = this.state.event.id
              let body = {
                  name: eventName,
                  location: eventLocation,
                  date: eventDate
              }
              console.log(body)
              APIHandler.editData("events", eventId, body)
                .then(()=> {
                    return APIHandler.getData("events")
                    })
                .then(eventList =>{
                    this.setState({
                        events: eventList
                    })
                })
        } else {

            console.log("add")
            let eventName = this.state.event.name
              let eventLocation = this.state.event.location
              let eventDate = this.state.eventDate
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

    handleFieldChange = (evt) => {
        const stateToChange = Object.assign({}, this.state.event)

        stateToChange[evt.target.id] = evt.target.value
        this.setState({event: stateToChange})
        console.log(stateToChange)
    }


    handleChange = (date) => {
        this.setState({
          eventDate: date
        });

        console.log(this.state.eventDate)
      }

    render() {
        return(
            <React.Fragment>
                <div id="eventInput">
                    Event: <input class="event-input" onChange={this.handleFieldChange} id="name" value={this.state.event.name}/>

                    Location: <input class="event-input" onChange={this.handleFieldChange} id="location" value={this.state.event.location}/>

                    Date: <DatePicker class="event-input" selected={this.state.eventDate} onChange={this.handleChange} id="datePicker" value={this.state.event.eventDate} />

                    <button onClick={this.eventFunction}>
                       Submit
                    </button>
                </div>
            </React.Fragment>
        )
    }
}