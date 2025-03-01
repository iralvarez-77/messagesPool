import { useState, useEffect} from "react";
import { registerRequest, loginRequest } from "../api/auth"
import PropTypes from 'prop-types'
import {AuthContext} from "../helpers/authHelpers.js"
import axios from "axios"

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [errors, setErrors] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true);
  
  const signUp = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data)
      setIsAuthenticated(true)
    } catch (error) {
      console.log('👀 👉🏽 ~  errorSignUp:', error.response.data)
      //arreglar, no funciona
      if (Array.isArray(error.response.data.errors)) {
        setErrors(error.response.data.errors)
      }
      
      setErrors([error.response.data.message])
      
    }
  }
  
  const signIn = async (user) => {
    try {
      const res = await loginRequest(user)
      setIsAuthenticated(true)
      setUser(res.data)
      
      console.log('👀 👉🏽 ~  user:', user)
      console.log('👀 👉🏽 ~  isAuthenticated:', isAuthenticated)
      console.log('👀 👉🏽 ~  res.data:', res.data)
      
      return res
    } catch (error) {
      console.log('👀 👉🏽 ~  error:', error)
      
    }
  }

  //script para eliminar los errores automáticamente
  useEffect(()=> {
    if(errors.length > 0 ){
      setTimeout(()=> {
        setErrors([])
      }, 5000)
    }
  }, [errors])

  useEffect(() => {
    // Hacer la petición al backend para verificar autenticación
    try {
      const data =  await axios.get("'http://localhost:4000/api/v1'/auth", { withCredentials: true })  // Asegúrate de que las cookies se envían
      console.log('👀 👉🏽 ~  data:',data)
    } catch (error) {
      console.log('👀 👉🏽 ~  errorAuth:', error)
    }
      
  }, []);


//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//         setIsAuthenticated(true);
//         // Opcionalmente, podrías hacer una solicitud para obtener los datos del usuario
//     }
// }, []);


  return (
    <AuthContext.Provider value = {{
      signUp,
      signIn,
      isAuthenticated,
      user,
      errors
    }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


