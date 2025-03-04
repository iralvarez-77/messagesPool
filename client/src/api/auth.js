import apiClient from '../api/axios';


export const registerRequest = async (user) => {
  try {
    const response = await apiClient.post(`/register`, user);
    return response.data 
  } catch (error) {
    console.log('👀 👉🏽 ~  errorRegisterRequest:', error)
  }
};

export const loginRequest = async (user) => {
  try {
    const response = await apiClient.post(`/login`, user)
    return response.data
  } catch (error) {
    console.log('👀 👉🏽 ~  errorLoginRequest:', error)
  }
}

export const verify = async () => {
  try {
    const response = await apiClient.get(`verify`)
    console.log('👀 👉🏽 ~  response:', response)
    return response 
  } catch(error) {
    console.log('👀 👉🏽 ~  error:verify', error)
    
  }
}