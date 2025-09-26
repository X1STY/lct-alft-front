import axios from 'axios'

import type { AxiosResponse } from 'axios'

const DEFAULT_URL = import.meta.env.VITE_API_HOST

const api = axios.create({
  baseURL: DEFAULT_URL,
  withCredentials: true,
})

api.interceptors.request.use(
  (config) => {
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  async (error) => Promise.reject(error),
)

api.interceptors.response.use(async (response: AxiosResponse) => Promise.resolve(response.data))

export { api }
