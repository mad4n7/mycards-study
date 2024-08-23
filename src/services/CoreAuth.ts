import axios from 'axios'

class CoreAuth {
  constructor(token: string) {
    this.setAuthHeader(token)
  }

  setAuthHeader = (token: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  getAxiosInstance = () => {
    return axios
  }
}

export default CoreAuth
