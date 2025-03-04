import apiClient from '../api/axios';


export const createMessageRequest = async (content) => {
  try {
    const response = await apiClient.post(`/messages`, content);
    console.log('👀 👉🏽 ~  response:', response)
    return response.data 
  } catch (error) {
    console.log('👀 👉🏽 ~  errorCreateMessageRequest:', error)
  }
};