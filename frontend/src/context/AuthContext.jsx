import { createContext, useContext, useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import api from '../utils/api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('admin_token'))
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false)
        return
      }
      try {
        // Appliquer le token par défaut pour les futures requêtes Axios
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        const { data } = await api.get('/admin/auth/me') // Suppose qu'une route me existe
        setUser(data)
      } catch (err) {
        console.error('Invalid token', err)
        logout()
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [token])

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    const { token: newToken, user: userData } = data
    localStorage.setItem('admin_token', newToken)
    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
    setToken(newToken)
    setUser(userData)
    return userData
  }

  const logout = async () => {
    try {
      if (token) await api.post('/admin/auth/logout')
    } catch (e) {
      console.error(e)
    } finally {
      localStorage.removeItem('admin_token')
      delete api.defaults.headers.common['Authorization']
      setToken(null)
      setUser(null)
      navigate('/admin/login')
    }
  }

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    login,
    logout,
    loading
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#F4F6F5]">Vérification de la session...</div>
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return null
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />
  return children
}
