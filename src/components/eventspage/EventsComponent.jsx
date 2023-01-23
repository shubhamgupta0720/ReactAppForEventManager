import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteEventApi } from "../apiservices/eventsapi/DeleteEvent"
import { getAllEventsApi } from "../apiservices/eventsapi/GetAllEvents"
import { createRegistrationApi } from "../apiservices/registrationapi/CreateRegistrationApi"
import { useAuth } from "../security/AuthContext"

export default function EventsComponent(){

    const navigate = useNavigate()
    const authContext = useAuth()
    const isAdmin = authContext.admin
    const stdId = authContext.stdId
    
    const [events, setEvents] = useState([])
    const[message, setMessage] = useState(null)

    useEffect(
        () => refreshEvents(), []
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

    function registerEvent(eventId, stdId){
        console.log("here")
        const registration = {
            
        }
        createRegistrationApi(registration, eventId, stdId).then(
            () => {
                setMessage("Registered for event " + eventId)
                refreshEvents()
            }
        ).catch(error => console.log(error))
    }

    function createEvent(){
        navigate('/events/-1')
    }
    
    return (
        <div className="container">
            <h1>All Events</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className='table'>
                <thead>
                        <tr>
                            <th>Event Id</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Date of Event</th>
                            {isAdmin && <th>Update</th>}
                            {isAdmin && <th>Delete</th> }
                            {isAdmin && <th>Registrations</th>}
                            {!isAdmin && <th>Register</th> }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            events.map(
                                event => (
                                        <tr key={event.eventId}>
                                <td>{event.eventId}</td>
                                <td>{event.title}</td>
                                <td>{event.content}</td>
                                <td>{event.dateOfEvent.toString()}</td>
                                {isAdmin && <td><button className="btn btn-primary" onClick={() => updateEvent(event.eventId)}>Update</button></td>}
                                {isAdmin && <td><button className="btn btn-danger" onClick={() => deleteEvent(event.eventId)}>Delete</button></td>}
                                {isAdmin && <td><button className="btn btn-warning">View Registrations</button></td>}
                                {!isAdmin && <td><button className="btn btn-warning" onClick={() => registerEvent(event.eventId, stdId)} >Register</button></td>}
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