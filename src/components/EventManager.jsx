import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import WelcomeComponent from './welcomepage/WelcomeComponent'

export default function EventManager(){
    return (
        <div className="EventManager">
            Event Manager
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<WelcomeComponent/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}