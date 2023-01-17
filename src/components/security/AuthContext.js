import { createContext, useState, useContext } from "react";

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }){

    const [isAuthenticated, setAuthenticated] = useState(false)

    function login(username, password){
        if(username==="Shubham" && password==='Password'){
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
        <AuthContext.Provider value={ {isAuthenticated, setAuthenticated, login, logout} }>
            {children}
        </AuthContext.Provider>
    )
}