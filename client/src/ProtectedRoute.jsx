import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./helpers/authHelpers"


function ProtectedRoute(){
  const {isAuthenticated } = useAuth()
  console.log('👀 👉🏽 ~  isAuthenticated:', isAuthenticated)

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
} 

export default ProtectedRoute