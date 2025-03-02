import { useState, useEffect} from "react";
import { registerRequest, loginRequest, verify } from "../api/auth"
import PropTypes from 'prop-types'
import {AuthContext} from "../helpers/authHelpers.js"

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [errors, setErrors] = useState([])
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkVerify = async () => {
      try {
        const res = await verify()
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

  const signUp = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data)
      setIsAuthenticated(true)
      console.log('👀 👉🏽 ~  res:', res)
      return res
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
      console.log('👀 👉🏽 ~  res:', res)
      // const res = await verify();
      // console.log('👀 👉🏽 ~  res:', res)
      // setUser(res.data.user)
      // setIsAuthenticated(res.data.isAuthenticated)
      return res
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