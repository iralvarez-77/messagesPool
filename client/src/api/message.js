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

export const getMessageRequest = async (messageId) => {
  try {
    const response = await apiClient.get(`/message/${messageId}`)
    console.log('👀 👉🏽 ~  response:', response)
    
  } catch (error) {
    console.log('👀 👉🏽 ~  errorgetMessageRequest:', error)
    
  }
}
export const getMessagesRequest = async (numPage = 1, pageSize = 10) => {
  try {
    const response = await apiClient.get(`/message`, {
      params: {numPage, pageSize}
    })
    console.log('👀 👉🏽 ~  response.data:', response.data)
    return response.data
  } catch (error) {
    console.log('👀 👉🏽 ~  errorgetMessagesRequest:', error)
    
  }
}
