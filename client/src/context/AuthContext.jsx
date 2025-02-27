import { createContext, useState, useEffect } from "react";
import { registerRequest, loginRequest } from "../api/auth"
import PropTypes from 'prop-types'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [errors, setErrors] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
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

export default AuthContext