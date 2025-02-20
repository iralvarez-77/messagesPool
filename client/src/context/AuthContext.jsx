import { createContext, useState } from "react";
import { registerRequest } from "../api/auth"
import PropTypes from 'prop-types';


const AuthContext = createContext()

// export const useAuth = () => {
//   const context = useContext(AuthContext)
//   console.log('👀 👉🏽 ~  context:', context)
//   return context
// }

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

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext