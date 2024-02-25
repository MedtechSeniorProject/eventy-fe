import { Outlet, Navigate } from "react-router-dom"
import useAuth from "@/_auth/hook/useAuth"

type RequireAuthProps = {
    role: string
}

const RequireAuth = ({role}: RequireAuthProps) => {

  const { user, isAuthenticated } = useAuth()
  const userRole = user?.isSuperAdmin ? "SUPERADMIN" : "EVENTMANAGER"

  if(!isAuthenticated){
    return <Navigate to="/login"/>
  }

  return (
    userRole === role 
        ? <Outlet />
        : <Navigate to="/unauthorized" />
  )

}

export default RequireAuth