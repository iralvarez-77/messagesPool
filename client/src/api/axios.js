import axios from "axios"

const API = 'http://localhost:4000/api/v1';

const apiClient = axios.create({
  baseURL: API,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
})

export default apiClient