import axios from 'axios'
import { isNil } from 'es-toolkit'

import type { AxiosRequestConfig, AxiosResponse } from 'axios'

const DEFAULT_URL = import.meta.env.VITE_API_HOST

const axiosInstance = axios.create({
  baseURL: DEFAULT_URL,
  withCredentials: false,
})

axiosInstance.interceptors.request.use(
  (config) => {
    if (isNil(config.headers['Content-Type'])) {
      config.headers['Content-Type'] = 'application/json'
    }
    return config
  },
  async (error) => Promise.reject(error),
)

axiosInstance.interceptors.response.use(async (response: AxiosResponse) => Promise.resolve(response.data))

const api = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => axiosInstance.get(url, config),
  post: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.post(url, data, config),
  postForm: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.postForm(url, data, config),
  put: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.put(url, data, config),
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => axiosInstance.delete(url, config),
  patch: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.patch(url, data, config),
}

export { api }
