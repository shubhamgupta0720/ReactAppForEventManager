import { useAuth } from '../security/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function LogoutComponent(){
    const authContext = useAuth()
    const navigate = useNavigate();
    function successLogout(){
        authContext.logout()
        navigate('/')
    }
    function unsuccessLogout(){
        navigate(-1)
    }
    return (
        <div>
            <h1>Are you sure you want to log out?</h1>
            <div>
                <button className="button" onClick={successLogout}>YES</button>
                <button className="button" onClick={unsuccessLogout}>NO</button>
            </div>
        </div>
    )
}