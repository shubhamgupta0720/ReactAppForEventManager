import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";

export default function WelcomeComponent(){

    const authContext = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        const isUserAdmin = localStorage.getItem("isAdmin");
        if (loggedInUser) {
          authContext.setUsername(loggedInUser)
          authContext.setAuthenticated(true)
          console.log(typeof isUserAdmin)
          if(isUserAdmin === "true"){
            const orgId = localStorage.getItem("id");
            authContext.setAdmin(true)
            authContext.setOrgId(Number(orgId))
          }
          else{
            const stdId = localStorage.getItem("id");
            authContext.setAdmin(false)
            authContext.setStdId(Number(stdId))
          }
          navigate('/')
        }
      }, []);

    return (
        <div className="Welcome">Welcome to Event Manager</div>
    )
}