import { createContext, useContext, useState, useEffect } from 'react'
import { AuthService } from '../services/authService'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const currentUser = AuthService.getCurrentUser()
        if (currentUser) {
          setUser(currentUser.user)
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  // Listen for login events
  useEffect(() => {
    const handleUserLoggedIn = (event) => {
      setUser(event.detail.user)
      setIsAuthenticated(true)
    }

    const handleUserLoggedOut = () => {
      setUser(null)
      setIsAuthenticated(false)
    }

    window.addEventListener('userLoggedIn', handleUserLoggedIn)
    window.addEventListener('userLoggedOut', handleUserLoggedOut)

    return () => {
      window.removeEventListener('userLoggedIn', handleUserLoggedIn)
      window.removeEventListener('userLoggedOut', handleUserLoggedOut)
    }
  }, [])

  const login = async (username, password) => {
    try {
      const result = await AuthService.login(username, password)
      setUser(result.user)
      setIsAuthenticated(true)
      return result
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      await AuthService.logout()
      setUser(null)
      setIsAuthenticated(false)
      window.dispatchEvent(new CustomEvent('userLoggedOut'))
      return true
    } catch (error) {
      console.error('Logout error:', error)
      // Still update state even if logout fails
      setUser(null)
      setIsAuthenticated(false)
      window.dispatchEvent(new CustomEvent('userLoggedOut'))
      return false
    }
  }

  const refreshUser = async () => {
    try {
      const updatedUser = await AuthService.refreshUserData()
      if (updatedUser) {
        setUser(updatedUser)
      }
      return updatedUser
    } catch (error) {
      console.error('Error refreshing user:', error)
      return user
    }
  }

  const getToken = () => {
    return AuthService.getToken()
  }

  const hasRole = (role) => {
    return user?.role === role
  }

  const isAdmin = () => {
    return user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN'
  }

  const isSuperAdmin = () => {
    return user?.role === 'SUPER_ADMIN'
  }

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    refreshUser,
    getToken,
    hasRole,
    isAdmin,
    isSuperAdmin,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}