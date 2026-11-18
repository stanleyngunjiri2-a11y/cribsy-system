import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { authAPI, clearToken, getToken, setToken } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(() => Boolean(getToken()))

  const refreshUser = useCallback(async () => {
    if (!getToken()) return null

    try {
      const response = await authAPI.me()
      const authenticatedUser = response.user || response
      setUser(authenticatedUser)
      return authenticatedUser
    } catch (error) {
      clearToken()
      setUser(null)
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!getToken()) return
    let active = true

    authAPI.me()
      .then(response => {
        if (active) setUser(response.user || response)
      })
      .catch(error => {
        clearToken()
        if (active) setUser(null)
        console.error('Unable to restore the saved session.', error)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  const register = async payload => authAPI.register(payload)

  const login = async (email, password) =>
    authAPI.login({ email, password })

  const verifyLogin = async (email, code) => {
    const response = await authAPI.verify({ email, code })

    if (!response.access_token) {
      throw new Error('The server did not return an authentication token.')
    }

    setToken(response.access_token)
    setUser(response.user || null)

    if (!response.user) await refreshUser()

    return response
  }

  const logout = () => {
    clearToken()
    setUser(null)
  }

  const updateProfile = async payload => {
    const response = await authAPI.updateMe(payload)
    const updatedUser = response.user || response
    setUser(updatedUser)
    return updatedUser
  }

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user && getToken()),
    register,
    login,
    verifyLogin,
    logout,
    refreshUser,
    updateProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider.')
  }

  return context
}
