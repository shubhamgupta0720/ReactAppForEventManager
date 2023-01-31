import { useNavigate, useParams } from "react-router-dom"
import { createRegistrationApi } from "../apiservices/registrationapi/CreateRegistrationApi"
import { useAuth } from "../security/AuthContext"

export default function RegistrationComponent(){
    const {eventId} = useParams()
    const authContext = useAuth()
    const navigate = useNavigate()
    const stdId = authContext.stdId
    function successRegister(){
        const registration = {
            
        }
        createRegistrationApi(registration, eventId, stdId).then(
            () => {
                navigate(-1)
            }
        ).catch(error => console.log(error.message))
    }
    function unsuccessRegister(){
        navigate(-1)
    }
    
    return (
        <div>
            <h1>Are you sure you want to Register?</h1>
            <div>
                <button className="button" onClick={() => successRegister()}>YES</button>
                <button className="button" onClick={() => unsuccessRegister()}>NO</button>
            </div>
        </div>
    )
}