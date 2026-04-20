import axios from 'axios'

/* -------------------------------------------------------
   Axios instance
------------------------------------------------------- */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api/v1',
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

/* -------------------------------------------------------
   REQUEST interceptor — inject Bearer token
------------------------------------------------------- */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

/* -------------------------------------------------------
   RESPONSE interceptor — handle 401 Unauthorized
------------------------------------------------------- */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear stale credentials
      localStorage.removeItem('token')
      localStorage.removeItem('user')

      // Redirect to admin login (avoid redirect loop)
      if (!window.location.pathname.startsWith('/admin/login')) {
        window.location.href = '/admin/login'
      }
    }

    // Let callers handle other errors
    return Promise.reject(error)
  },
)

export default api

/* -------------------------------------------------------
   Named helpers (optional DX convenience)
------------------------------------------------------- */

/** GET /v1/{resource} */
export const fetchAll  = (resource, params)         => api.get(`/${resource}`, { params })

/** GET /v1/{resource}/{id} */
export const fetchOne  = (resource, id)             => api.get(`/${resource}/${id}`)

/** POST /v1/{resource} */
export const create    = (resource, data)           => api.post(`/${resource}`, data)

/** PUT /v1/{resource}/{id} */
export const update    = (resource, id, data)       => api.put(`/${resource}/${id}`, data)

/** DELETE /v1/{resource}/{id} */
export const destroy   = (resource, id)             => api.delete(`/${resource}/${id}`)

/** POST multipart/form-data (file uploads) */
export const upload    = (resource, formData)       =>
  api.post(`/${resource}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
