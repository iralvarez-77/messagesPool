import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./helpers/authHelpers"


function ProtectedRoute(){
  console.log("protec")
  const {isAuthenticated, user } = useAuth()
  console.log('👀 👉🏽 ~  isAuth:', isAuthenticated)
  console.log('👀 👉🏽 ~  user:', user)

  if (isAuthenticated === null) {
    return <div>Cargando...</div>; // O un spinner
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
} 

export default ProtectedRoute