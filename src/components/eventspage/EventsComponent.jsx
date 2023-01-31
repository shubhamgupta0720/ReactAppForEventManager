import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteEventApi } from "../apiservices/eventsapi/DeleteEvent"
import { getAllEventsApi } from "../apiservices/eventsapi/GetAllEvents"
import { createRegistrationApi } from "../apiservices/registrationapi/CreateRegistrationApi"
import { Link } from 'react-router-dom'
import { useAuth } from "../security/AuthContext"
import { getRegistrationByEventAndStudentApi } from "../apiservices/registrationapi/GetRegistrationByEventAndStudentApi"
import { getRegistrationByStudentApi } from "../apiservices/registrationapi/GetRegistrationByStudentApi"

export default function EventsComponent(){

    const navigate = useNavigate()
    const authContext = useAuth()
    const username = authContext.username
    const isAdmin = authContext.admin
    const stdId = authContext.stdId
    const orgId = authContext.orgId
    
    const [events, setEvents] = useState([])
    const [message, setMessage] = useState(null)

    const [orgToggle, setOrgToggle] = useState(false)

    var newEvents = []

    useEffect(
        () => 
            refreshEvents(), []
    )
    
    function refreshEvents(){
        getAllEventsApi()
        .then(response => {
            setEvents(response.data)
        }
        )
        .catch(error => console.log(error))
    }

    function updateEvent(eventId){
        console.log("clicked" + eventId)
        navigate(`/events/${eventId}`)
    }

    function deleteEvent(eventId){
        console.log("deleted" + eventId)
        deleteEventApi(eventId).then(
            () => {
                setMessage("Deleted event " + eventId)
                refreshEvents()
            }
        ).catch(error => console.log(error))
    }

    function createEvent(){
        navigate('/events/-1')
    }

    function goToRegistrations(eventId){
        navigate(`/viewregistrations/${eventId}`)
    }

    // function getAllStudentRegs(stdId){
    //     getRegistrationByStudentApi(stdId)
    //     .then(response => {
    //         setStdRegs(response.data)
    //     })
    //     .catch(error => console.log(error))
    // }

    function goToEventDetails(eventId, stdId){
        // getResponseIfRegistered(eventId, stdId)
        // getAllStudentRegs(stdId)
        navigate(`/vieweventdetails/${eventId}`)
    }

    function handleOrgToggleSwitch(){
        var orgToggle = document.getElementById("switch").checked
        setOrgToggle(orgToggle)
        if(orgToggle){
            newEvents = events.filter(getAllOrgCreatedEvents)
            setEvents(newEvents)
        }
        else{
            refreshEvents()
        }
    }

    function getAllOrgCreatedEvents(event){
        if(event.organiser.orgId === orgId){
            return true
        }
        return false
    }
    
    return (
        <div className="container">
            <h1>Events Page</h1>
            {isAdmin && <div className="container">
                <label>All &nbsp; </label>
                <label className="switch">
                    <input type="checkbox" id="switch" onChange={handleOrgToggleSwitch}/>
                    <span className="slider round"></span>
                </label>
                <label>&nbsp; {username}</label>
            </div>}
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className='table'>
                <thead>
                        <tr>
                            <th>Event Id</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Organiser</th>
                            <th>Date of Event</th>
                            {isAdmin && <th>Registrations</th>}
                            {isAdmin && <th>Update</th>}
                            {isAdmin && <th>Delete</th> }
                            {!isAdmin && <th>Register</th> }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            events.map(
                                event => (
                                        <tr key={event.eventId}>
                                <td>{event.eventId}</td>
                                <td><Link className="nav-link" to={`/vieweventdetails/${event.eventId}`}>{event.title}</Link></td>
                                <td>{event.content}</td>
                                <td>{event.organiser.orgName}</td>
                                <td>{event.dateOfEvent.toString()}</td>
                                {isAdmin && <td><button className="btn btn-warning" onClick={() => goToRegistrations(event.eventId)} >View Registrations</button></td>}
                                {isAdmin && (orgId === event.organiser.orgId) && <td><button className="btn btn-primary" onClick={() => updateEvent(event.eventId)}>Update</button></td>}
                                {isAdmin && (orgId === event.organiser.orgId) && <td><button className="btn btn-danger" onClick={() => deleteEvent(event.eventId)}>Delete</button></td>}
                                {!isAdmin && <td><button className="btn btn-success" onClick={() => goToEventDetails(event.eventId, stdId)} >View Event Details</button></td>}
                            </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
            {isAdmin && <div className="btn btn-success m-5" onClick={createEvent}>Create An Event</div>}
        </div>
    )
}