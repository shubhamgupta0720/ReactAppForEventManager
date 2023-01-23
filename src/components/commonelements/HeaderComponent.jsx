import { Link } from 'react-router-dom'
import { getAllEventsApi } from '../apiservices/eventsapi/GetAllEvents';
import { useAuth } from '../security/AuthContext'

export default function HeaderComponent(){
    const authContext = useAuth()
    const isAuthenticated = authContext.isAuthenticated;
    const username = authContext.username
    const isAdmin = authContext.admin
    function callAllEventsApi(){
        getAllEventsApi()
        .then((response) => successfulResponse(response))
        .catch((error) => errorResponse(error))
        .finally(() =>  console.log('cleanup'))
    }
    function successfulResponse(response){
        console.log(response)
    }
    function errorResponse(response){
        console.log(response)
    }
    return(
        <header className="border-bottom border-light border-5 mb-5 p-2">
        <div className="container">
            <div className="row">
                <nav className="navbar navbar-expand-lg">
                    <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="">EventManager</a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item fs-5">
                                <Link className="nav-link" to="">Home</Link></li>
                            <li className="nav-item fs-5">
                                {isAuthenticated && <Link className="nav-link" to="/events" onClick={callAllEventsApi}>Events</Link>}</li>
                        </ul>
                    </div>
                    <ul className="navbar-nav">
                        <li className="nav-item fs-5">
                            {!isAuthenticated && <Link className="nav-link" to="/login">Login</Link>}</li>
                        <li className="nav-item fs-5">
                            {isAuthenticated && <Link className="nav-link" to="/profile">Welcome {username}</Link>}</li>
                        <li className="nav-item fs-5">
                            {isAuthenticated && <Link className="nav-link" to="/logout">Logout</Link>}</li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
    )
}