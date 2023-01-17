import { createContext, useState, useContext } from "react";

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }){

    const [isAuthenticated, setAuthenticated] = useState(false)

    const [username, setUsername] = useState()
    
    function login(username, password){
        if(username==="Shubham" && password==='Password'){
            setUsername(username)
            setAuthenticated(true)
            return true
        }
        else{
            setAuthenticated(false)
            return false
        }
    }

    function logout(){
        setAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={ {isAuthenticated, setAuthenticated, login, logout, username} }>
            {children}
        </AuthContext.Provider>
    )
}