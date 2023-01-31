import { useEffect } from "react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getEventApi } from "../apiservices/eventsapi/GetEventApi"
import { createRegistrationApi } from "../apiservices/registrationapi/CreateRegistrationApi"
import { deleteRegistrationByEventAndStudentApi } from "../apiservices/registrationapi/DeleteRegistrationByEventAndStudentIdApi"
import { getRegistrationByEventAndStudentApi } from "../apiservices/registrationapi/GetRegistrationByEventAndStudentApi"
import { useAuth } from "../security/AuthContext"

export default function ViewEventComponent(){
    const {eventId} = useParams()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [dateOfEvent, setDateOfEvent] = useState('')
    const [orgName, setOrgName] = useState('')
    const [orgEmail, setOrgEmail] = useState('')
    const [alreadyRegistered, setAlreadyRegistered] = useState(false)

    const navigate = useNavigate()
    const authContext = useAuth()
    const stdId = authContext.stdId

    const[message, setMessage] = useState(null)

    useEffect(
        () => getEvent(), []
    )

    useEffect(
        () => 
        getResponseIfRegistered(eventId, stdId), [eventId, stdId]
    )
    
    function getEvent(){
            getEventApi(eventId)
            .then(response => {
                setTitle(response.data.title)
                setContent(response.data.content)
                setDateOfEvent(response.data.dateOfEvent)
                setOrgName(response.data.organiser.orgName)
                setOrgEmail(response.data.organiser.orgEmail)
            })
            .catch(error => console.log(error))
    }

    function confirmRegistrationPage(eventId){
        navigate(`/registration/${eventId}`)
    }
    // function registerEvent(eventId, stdId){

    //     const registration = {
            
    //     }
    //     createRegistrationApi(registration, eventId, stdId).then(
    //         () => {
    //             setMessage("Registered for event " + eventId)
    //             getResponseIfRegistered(eventId, stdId)
    //         }
    //     ).catch(error => console.log(error.message))
    // }

    function cancelRegistration(eventId, stdId){
        deleteRegistrationByEventAndStudentApi(eventId, stdId)
        .then(() => {
            setMessage("Cancelled Registration for event " + eventId)
            getResponseIfRegistered(eventId, stdId)
        }
        )
        .catch(error => console.log(error))
    }

    function getResponseIfRegistered(eventId, stdId){
        getRegistrationByEventAndStudentApi(eventId, stdId)
        .then(() => {
            setAlreadyRegistered(true)
        })
        .catch(error => {
            console.log(error)
            setAlreadyRegistered(false)
        })
    }

    return (
        <div className="container">View The event details here {eventId}
        {message && <div className="alert alert-warning">{message}</div>}
            <div className="container">{title}</div>
            <div className="container">{content}</div>
            <div className="container">{dateOfEvent}</div>
            <div className="container">{orgName}</div>
            {!alreadyRegistered && <div className="container"><button className="btn btn-warning" onClick={() => confirmRegistrationPage(eventId)}>Register</button></div>}
            {alreadyRegistered && <div className="container"><button className="btn btn-secondary" onClick={() => cancelRegistration(eventId, stdId)}>Cancel Registration</button></div>}
            <div className="container"><button className="btn btn-danger">Contact Organiser</button></div>
        </div>
    )
}