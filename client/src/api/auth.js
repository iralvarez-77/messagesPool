import axios from 'axios';

const API = 'http://localhost:4000/api/v1';

export const registerRequest = async (user) => {
  try {
    const response = await axios.post(`${API}/register`, user, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data 
  } catch (error) {
    console.log('👀 👉🏽 ~  errorRegisterRequest:', error)
    throw error
  }
};

export const loginRequest = async (user) => {
  try {
    const response = await axios.post(`${API}/login`, user, {
      headers: {'Content-Type': 'application/json'},
      withCredentials: true
    })

    console.log('👀 👉🏽 ~  response:', response.data)
    return response.data
  } catch (error) {
    console.log('👀 👉🏽 ~  errorLoginRequest:', error)
  }
}