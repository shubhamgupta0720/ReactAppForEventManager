import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HeaderComponent from './commonelements/HeaderComponent'
import LoginComponent from './loginpage/LoginComponent'
import LogoutComponent from './logoutpage/LogoutComponent'
import WelcomeComponent from './welcomepage/WelcomeComponent'
import AuthProvider, { useAuth } from './security/AuthContext'
import ErrorComponent from './commonelements/ErrorComponent'

function AuthenticatedRoute({children}){
    const authContext = useAuth()
    if(authContext.isAuthenticated)
        return children

    return <Navigate to="/" />
}

export default function EventManager(){
    return (
        <div className="EventManager">
            <AuthProvider>
            <BrowserRouter>
            <HeaderComponent/>
                <Routes>
                    <Route path="/" element={<WelcomeComponent/>}/>
                    <Route path='/login' element={<LoginComponent/>}/>
                    <Route path='/logout' element={<LogoutComponent/>}/>
                    <Route path='*' element={<ErrorComponent/>}/>
                </Routes>
            </BrowserRouter>
            </AuthProvider>
        </div>
    )
}