import axios from 'axios';

const API = 'http://localhost:4000/api/v1';

export const createMessageRequest = async (content) => {
  try {
    const response = await axios.post(`${API}/messages`, content, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    });
    console.log('👀 👉🏽 ~  response:', response)
    return response.data 
  } catch (error) {
    console.log('👀 👉🏽 ~  errorCreateMessageRequest:', error)
  }
};