// coded by Jenn
import React, { Component } from "react"
import APIHandler from "./../APIHandler"
import DatePicker from "react-datepicker"
import moment from "moment"
import { Link } from "react-router-dom"

export default class EventForm extends Component {

    constructor(props) {
        super(props)
        console.log(props)
        if (props.eventObject.hasOwnProperty("event")) {
            console.log(props.event)
            let event = this.props.eventObject.event
            let fList = this.props.eventObject.fList
            this.state = {event: event, eventDate: moment(), fList: fList, currentUser: []}
        } else {
            let event = {
                name: "",
                location: "",
                date: "",
                userId: ""
            }
            this.state = {event: event, eventDate: moment(), fList: this.props.eventObject.fList, currentUser: []}
        }
    }

    printEvents = () => {
        APIHandler.getData("events?_sort=date&_order=asc")
        .then(unfilterdEvents => {
                unfilterdEvents.forEach(event => {
                    console.log(event.userId)
                    if (this.state.fList.includes(event.userId)) {
                        let filteredEvents = []
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

    componentDidMount = () => {
        let currentUser
        let sessionUser = JSON.parse(sessionStorage.getItem("credentials"))
        let localUser = JSON.parse(localStorage.getItem("credentials"))
        if (sessionUser !== null) {
            currentUser=  sessionUser.userId
        } else {
            currentUser= localUser.userId
        }
        this.setState({
            currentUser: currentUser
        })
    }

      eventFunction = () => {
          if (this.props.eventObject.hasOwnProperty("event")) {

              console.log("edit")
              let eventName = this.state.event.name
              let eventLocation = this.state.event.location
              let eventDate = this.state.eventDate
              let eventId = this.state.event.id
              let eventUser = this.state.currentUser
              let body = {
                  name: eventName,
                  location: eventLocation,
                  date: eventDate,
                  userId: eventUser
              }
              console.log(body)
              APIHandler.editData("events", eventId, body)
                .then(()=> {
                    this.printEvents()
                    })
                .then(()=>{
                    this.props.history.push("/")
                })
        } else {

            console.log("add")
            let eventName = this.state.event.name
              let eventLocation = this.state.event.location
              let eventDate = this.state.eventDate
              let eventUser = this.state.currentUser
            let body = {
                name: eventName,
                location: eventLocation,
                date: eventDate,
                userId: eventUser
            }
            console.log(eventDate)
            APIHandler.addData("events", body)
            .then(()=>{
                this.printEvents()
            })
            .then(()=>{
                this.props.history.push("/")
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