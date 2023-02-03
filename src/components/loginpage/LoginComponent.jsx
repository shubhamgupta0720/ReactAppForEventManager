import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../security/AuthContext"

export default function LoginComponent(){
    
    const [username, setUsername] = useState("Shubham")
    const [password, setPassword] = useState("Gupta")
    const [admin, setAdmin] = useState(false)
    const [showErrorMessage, setshowErrorMessage] = useState(false)
    const navigate = useNavigate();
    const authContext = useAuth();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        const isUserAdmin = localStorage.getItem("isAdmin");
        if (loggedInUser) {
          authContext.setUsername(loggedInUser)
          authContext.setAuthenticated(true)
          if(isUserAdmin == "true"){
            authContext.setAdmin(true)

          }
          navigate('/')
        }
      }, []);

    function handleUsernameFunction(event){
        setUsername(event.target.value)
    }

    function handlePasswordFunction(event){
        setPassword(event.target.value)
    }

    function handleAdminCheckFunction(){
        var isAdmin = document.getElementById("isAdmin").checked
        setAdmin(isAdmin)
    }

    function handleSubmitFunction(){
        if(authContext.login(username, password, admin)){
            navigate('/')
        }
        else{
            setshowErrorMessage(true)
        }
    }
    
    return (
        <div className="Login">
            <div className="Login">
            {/* {true && "name" will give name}
            {false && "name" will give false} */}
            {showErrorMessage && <div className='failureMessage'>Authentication Failed</div>}
            <div className="LoginForm">
                <h1 id="loginpageheader">Login Page</h1>
                <div>
                    <label>User Name</label>
                    <input type="text" name="username" defaultValue={username} onChange={handleUsernameFunction} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" defaultValue={password} onChange={handlePasswordFunction}/>
                </div>
                <div>
                <label>Admin Login</label>
                    <input type="checkbox" name="isAdmin" id="isAdmin" onClick={handleAdminCheckFunction}></input>
                </div>
                <div>
                    <button type="button" name="Login" onClick={handleSubmitFunction}>Login</button>
                </div>
            </div>
        </div>
        </div>
    )
}