import { useContext } from "react"
import { AuthContext } from "../../Context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

function ProtectedRoute() {
  const {userToken} = useContext(AuthContext)
  if(userToken){
    return <Outlet/>
  }else{
    return <Navigate to="/login" replace/>
  }
}

export default ProtectedRoute
