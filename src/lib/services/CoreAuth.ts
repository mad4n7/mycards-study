import axios, { type AxiosInstance } from 'axios'

class CoreAuth {
  private readonly token: string

  constructor(token: string) {
    this.token = token
  }

  protected getAxiosInstance(): AxiosInstance {
    return axios.create({
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    })
  }
}

export default CoreAuth
