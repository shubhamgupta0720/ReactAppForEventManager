import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../security/AuthContext"

export default function LoginComponent(){
    
    const [username, setUsername] = useState("Shubham")
    const [password, setPassword] = useState("Password")
    const [showErrorMessage, setshowErrorMessage] = useState(false)
    const navigate = useNavigate();
    const authContext = useAuth();

    function handleUsernameFunction(event){
        setUsername(event.target.value)
    }

    function handlePasswordFunction(event){
        setPassword(event.target.value)
    }

    function handleSubmitFunction(){
        if(authContext.login(username, password)){
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
                <div>
                    <label>User Name</label>
                    <input type="text" name="username" defaultValue={username} onChange={handleUsernameFunction} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" defaultValue={password} onChange={handlePasswordFunction}/>
                </div>
                <div>
                    <button type="button" name="Login" onClick={handleSubmitFunction}>Login</button>
                </div>
            </div>
        </div>
        </div>
    )
}