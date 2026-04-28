import axios from 'axios'

// axios - держит HTTP-клиент в одном месте: baseURL, заголовки и типизированные ответы без повторов.
export const apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
})
