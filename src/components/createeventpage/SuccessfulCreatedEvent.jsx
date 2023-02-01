import { useNavigate, useParams } from "react-router-dom"

export default function SuccessfulCreatedEvent(){
    const {status} = useParams()
    const navigate = useNavigate()

    function goToEventsPage(){
        navigate('/events')
    }
    return(
        <div className="container">
            <h1>Successfully {status} Event</h1>
            <button className="btn btn-success" onClick={goToEventsPage}>Go back to Events Page</button>
        </div>
    )
}