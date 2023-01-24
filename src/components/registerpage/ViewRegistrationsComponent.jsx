import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { getRegistrationByEventApi } from "../apiservices/registrationapi/GetRegistrationByEventApi"

export default function ViewRegistrationsComponent(){

    const {eventId} = useParams()
    const [registrations, setRegistrations] = useState([])

    useEffect(
        () => refreshRegistrations(), []
    )

    function refreshRegistrations(){
        getRegistrationByEventApi(eventId)
        .then(response => {
            setRegistrations(response.data)
        }
        )
        .catch(error => console.log(error))
        console.log(registrations)
    }

    return(
        <div className="container">
            <h1>All Registrations</h1>
            {/* {message && <div className="alert alert-warning">{message}</div>} */}
            <div>
                <table className='table'>
                <thead>
                        <tr>
                            <th>Registration Id</th>
                            <th>StudentName</th>
                            <th>Student Id</th>
                            <th>Student Department</th>
                            {/* <th>Date of Event</th> */}
                            {/* {isAdmin && <th>Update</th>}
                            {isAdmin && <th>Delete</th> }
                            {isAdmin && <th>Registrations</th>}
                            {!isAdmin && <th>Register</th> } */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            registrations.map(
                                reg => (
                                        <tr key={reg.regId}>
                                <td>{reg.regId}</td>
                                <td>{reg.event.title}</td>
                                <td>{reg.student.firstName}</td>
                                <td>{reg.student.dept}</td>
                                {/* <td>{event.dateOfEvent.toString()}</td>
                                {isAdmin && <td><button className="btn btn-primary" onClick={() => updateEvent(event.eventId)}>Update</button></td>}
                                {isAdmin && <td><button className="btn btn-danger" onClick={() => deleteEvent(event.eventId)}>Delete</button></td>}
                                {isAdmin && <td><button className="btn btn-warning" onClick={() => goToRegistrations()} >View Registrations</button></td>}
                                {!isAdmin && <td><button className="btn btn-warning" onClick={() => registerEvent(event.eventId, stdId)} >Register</button></td>} */}
                            </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
            {/* {isAdmin && <div className="btn btn-success m-5" onClick={createEvent}>Create An Event</div>} */}
        </div>
    )
}