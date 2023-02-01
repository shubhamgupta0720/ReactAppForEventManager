import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllOrganisersApi } from "../apiservices/organizerapi/GetAllOrganiserApi";
import { getAllStudentsApi } from "../apiservices/studentapi/GetAllStudentsApi";

export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }){

    const [organisers, setOrganisers] = useState([])

    const [students, setStudents] = useState([])

    const [orgId, setOrgId] = useState()

    const [stdId, setStdId] = useState()

    const [isAuthenticated, setAuthenticated] = useState(false)

    const [username, setUsername] = useState()

    const [admin, setAdmin] = useState(false)

    // const navigate = useNavigate()

    useEffect(
        () => refreshData(), []
    )

    function refreshData(){
        getAllOrganisersApi()
        .then(response => {
            setOrganisers(response.data)
        }
        )
        .catch(error => console.log(error))

        getAllStudentsApi()
        .then(response => {
            setStudents(response.data)
        }
        )
        .catch(error => console.log(error))
    }
    
    function login(username, password, admin){
        console.log(admin)

        if(admin === true){
            console.log("in admin")
            for(let i = 0; i < organisers.length; i++){
                if(organisers[i].orgName == username && organisers[i].email == password){
                    console.log("found admin")
                    setUsername(username)
                    setOrgId(organisers[i].orgId)
                    console.log(orgId)
                    setAuthenticated(true)
                    setAdmin(true)
                    localStorage.setItem('user', username)
                    localStorage.setItem('isAdmin', true)
                    localStorage.setItem('id', organisers[i].orgId)
                    return true
                }
            }
            setAuthenticated(false)
            return false
        }
        else if(admin === false){
            console.log("in std")
            for(let i = 0; i < students.length; i++){
                if(username == students[i].firstName && password == students[i].lastName){
                    console.log("found student")
                    setUsername(username)
                    setStdId(students[i].stdId)
                    console.log(stdId)
                    setAuthenticated(true)
                    setAdmin(false)
                    localStorage.setItem('user', username)
                    localStorage.setItem('isAdmin', false)
                    localStorage.setItem('id', students[i].stdId)
                    return true
                }
            }
            setAuthenticated(false)
            return false
        }
    }

    function logout(){
        setAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={ {isAuthenticated, setAuthenticated, setUsername, setAdmin, login, logout, username, orgId, setOrgId, stdId, setStdId, admin} }>
            {children}
        </AuthContext.Provider>
    )
}