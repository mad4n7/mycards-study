import axios, { type AxiosInstance } from 'axios'

const instance = (token: string, baseUrl: string = '/api'): AxiosInstance => {
  const currentAxios = axios.create({
    baseURL: baseUrl,
    timeout: 9000,
    headers: {
      'Content-Type': 'application/json',
      hmac_key: 'mykey',
    },
  })
  currentAxios.defaults.headers.common.Authorization = token
  return currentAxios
}

export default instance
