import { createContext, useContext, useState } from "react";
import { registerRequest } from "../api/auth"


export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)

  const signUp = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log('👀 👉🏽 ~  res.data:', res.data);
      setUser(res.data)
    } catch (error) {
      console.log('👀 👉🏽 ~  erroSignUp:', error)
      
    }
  }

  return (
    <AuthContext.Provider value = {{
      signUp,
      user
    }}>
      {children}
    </AuthContext.Provider>
  )
}