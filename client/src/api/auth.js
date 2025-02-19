import axios from 'axios';

const API = 'http://localhost:4000/api/v1';

export const registerRequest = async (user) => {
  console.log('👀 👉🏽 ~  user:', user)
  try {
    const response = await axios.post(`${API}/register`, user, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data; 
  } catch (error) {
    console.log('👀 👉🏽 ~  error:', error)
    throw error
  }
};
