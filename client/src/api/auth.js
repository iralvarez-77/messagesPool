import axios from 'axios';

const API = 'http://localhost:4000/api/v1';

export const registerRequest = async (user) => {
  try {
    const response = await axios.post(`${API}/register`, user, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
    return response.data 
  } catch (error) {
    console.log('👀 👉🏽 ~  errorRegisterRequest:', error)
  }
};

export const loginRequest = async (user) => {
  try {
    const response = await axios.post(`${API}/login`, user, {
      headers: {'Content-Type': 'application/json'},
      withCredentials: true
    })

    return response.data
  } catch (error) {
    console.log('👀 👉🏽 ~  errorLoginRequest:', error)
  }
}

export const verify = async () => {
  try {
    const response = await axios.get(`${API}/verify`, {withCredentials: true})
    console.log('👀 👉🏽 ~  response:', response)
    return response 
  } catch(error) {
    console.log('👀 👉🏽 ~  error:verify', error)
    
  }
}