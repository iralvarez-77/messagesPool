import { createContext, useState } from "react";
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
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data)
      }
      setErrors([error.response.data.message])
    }
  }

  const signIn = async (user) => {
    try {
      const res = await loginRequest(user)
      console.log('👀 👉🏽 ~  res:', res)
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