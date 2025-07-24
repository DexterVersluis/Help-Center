import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthService } from '../services/authService'

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await AuthService.login(formData.username, formData.password)
      navigate('/')
      window.dispatchEvent(new CustomEvent('userLoggedIn', { detail: result }))
    } catch (err) {
      console.error('Login failed:', err)
      if (err.message === 'auth/invalid-credentials') {
        setError('Invalid username or password')
      } else {
        setError(err.message || 'Login failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      {/* Background Elements */}
      <div className="login-bg-gradient"></div>
      <div className="login-bg-pattern"></div>
      
      {/* Floating Elements */}
      <div className="floating-element floating-element-1"></div>
      <div className="floating-element floating-element-2"></div>
      <div className="floating-element floating-element-3"></div>
      
      <div className="login-content">
        <div className="login-card">
          {/* Logo Section */}
          <div className="login-header">
            <div className="login-logo">
              <img 
                src="/assets/Enboq-Logo-NoPayoff-Svg.svg" 
                alt="Enboq" 
                className="logo-image"
              />
            </div>
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Sign in to access your admin dashboard</p>
          </div>

          {/* Form Section */}
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  autoComplete="username"
                  className="form-input"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <circle cx="12" cy="16" r="1"></circle>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="forgot-password-section">
              <a 
                href="https://start.enboq.com/admin/reset-password" 
                target="_blank" 
                rel="noopener noreferrer"
                className="forgot-password-link"
              >
                Forgot your password?
              </a>
            </div>

            {error && (
              <div className="error-message">
                <div className="error-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                  </svg>
                </div>
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="login-button"
            >
              {loading ? (
                <div className="button-loading">
                  <div className="loading-spinner"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="button-content">
                  <span>Sign In</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </div>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="login-footer">
            <p>Need help? <a href="/docs" className="help-link">Visit our documentation</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}