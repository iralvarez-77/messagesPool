import { useState, useEffect} from "react";
import { registerRequest, loginRequest } from "../api/auth"
import PropTypes from 'prop-types'
import {AuthContext} from "../helpers/authHelpers.js"
import axios from "axios"

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [errors, setErrors] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkVerify = async () => {
      try {
        //cambiar a la carpeta api e importar 
        const res = await axios.get("http://localhost:4000/api/v1/verify", { withCredentials: true });
        setUser(res.data.user)
        setIsAuthenticated(res.data.isAuthenticated);
      } catch (error) {
        console.log('👀 👉🏽 ~  errorcheckVerify:', error)
        setIsAuthenticated(false)
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkVerify();
  }, []);
  
  //pasar estas funciones a otro archivo
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
      await loginRequest(user)
      const res = await axios.get("http://localhost:4000/api/v1/verify", { withCredentials: true });
      setUser(res.data.user)
      setIsAuthenticated(true)
      
      return res.data
    } catch (error) {
      console.log('👀 👉🏽 ~  error:', error)
      
    }
  }

  return (
    <AuthContext.Provider value = {{
      signUp,
      signIn,
      isAuthenticated,
      user,
      errors,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

  //script para eliminar los errores automáticamente
  // useEffect(()=> {
  //   if(errors.length > 0 ){
  //     setTimeout(()=> {
  //       setErrors([])
  //     }, 5000)
  //   }
  // }, [errors])