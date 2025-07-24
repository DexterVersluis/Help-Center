import { supabase } from '../lib/supabase'

const API_BASE_URL = import.meta.env.VITE_ENBOQ_API_BASE_URL || 'https://dev-dexter.riddlestory.com/api'

export class AuthService {
  static async login(username, password) {
    try {
      // Step 1: Authenticate with Enboq API
      const response = await fetch(`${API_BASE_URL}/auth/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.code || 'Login failed')
      }

      const { data } = await response.json()
      const { user, organization, token } = data

      // Step 2: Store/update user in Supabase
      // Map role to ensure it matches database constraints
      const mapRole = (apiRole) => {
        if (!apiRole) return 'user'
        
        const roleMap = {
          'ADMIN': 'admin',
          'SUPER_ADMIN': 'super_admin'
        }
        return roleMap[apiRole] || apiRole.toLowerCase() || 'user'
      }

      const userData = {
        enboq_user_id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: mapRole(user.role),
        is_email_verified: user.isEmailVerified,
        is_onboarding_completed: user.isOnboardingCompleted,
      }

      // Upsert user data
      const { data: supabaseUser, error: userError } = await supabase
        .from('users')
        .upsert(userData, { 
          onConflict: 'enboq_user_id',
          ignoreDuplicates: false 
        })
        .select()
        .single()

      if (userError) {
        console.error('Error storing user data:', userError)
        throw new Error('Failed to store user data')
      }

      // Step 3: Create session record
      const sessionData = {
        user_id: supabaseUser.id,
        jwt_token: token,
        expires_at: this.getTokenExpiration(token),
        is_active: true,
      }

      const { error: sessionError } = await supabase
        .from('user_sessions')
        .insert(sessionData)

      if (sessionError) {
        console.error('Error creating session:', sessionError)
        throw new Error('Failed to create session')
      }

      // Step 4: Update organization settings
      await supabase
        .from('organization_settings')
        .upsert({ is_stripe_enabled: organization.isStripeEnabled })

      // Step 5: Store token in localStorage for client-side access
      localStorage.setItem('enboq_token', token)
      localStorage.setItem('enboq_user', JSON.stringify(supabaseUser))

      return {
        user: supabaseUser,
        token,
        organization,
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  static async logout() {
    try {
      const token = localStorage.getItem('enboq_token')
      
      if (token) {
        // Mark session as inactive
        await supabase
          .from('user_sessions')
          .update({ is_active: false })
          .eq('jwt_token', token)
      }

      // Clear localStorage
      localStorage.removeItem('enboq_token')
      localStorage.removeItem('enboq_user')

      return true
    } catch (error) {
      console.error('Logout error:', error)
      // Still clear localStorage even if Supabase update fails
      localStorage.removeItem('enboq_token')
      localStorage.removeItem('enboq_user')
      return false
    }
  }

  static getCurrentUser() {
    try {
      const userStr = localStorage.getItem('enboq_user')
      const token = localStorage.getItem('enboq_token')
      
      if (!userStr || !token) {
        return null
      }

      const user = JSON.parse(userStr)
      
      // Check if token is expired
      if (this.isTokenExpired(token)) {
        this.logout()
        return null
      }

      return { user, token }
    } catch (error) {
      console.error('Error getting current user:', error)
      return null
    }
  }

  static isAuthenticated() {
    const current = this.getCurrentUser()
    return current !== null
  }

  static getToken() {
    const current = this.getCurrentUser()
    return current?.token || null
  }

  static async refreshUserData() {
    try {
      const current = this.getCurrentUser()
      if (!current) return null

      // Fetch updated user data from Supabase
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', current.user.id)
        .single()

      if (error) {
        console.error('Error refreshing user data:', error)
        return current.user
      }

      // Update localStorage
      localStorage.setItem('enboq_user', JSON.stringify(user))
      return user
    } catch (error) {
      console.error('Error refreshing user data:', error)
      return this.getCurrentUser()?.user || null
    }
  }

  // Helper method to decode JWT and get expiration
  static getTokenExpiration(token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return new Date(payload.exp * 1000)
    } catch (error) {
      // If we can't decode the token, set expiration to 24 hours from now
      return new Date(Date.now() + 24 * 60 * 60 * 1000)
    }
  }

  // Helper method to check if token is expired
  static isTokenExpired(token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return Date.now() >= payload.exp * 1000
    } catch (error) {
      // If we can't decode the token, consider it expired
      return true
    }
  }

  // Helper method to get user sessions
  static async getUserSessions(userId) {
    try {
      const { data, error } = await supabase
        .from('user_sessions')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching user sessions:', error)
        return []
      }

      return data
    } catch (error) {
      console.error('Error fetching user sessions:', error)
      return []
    }
  }

  // Helper method to revoke all sessions for a user
  static async revokeAllSessions(userId) {
    try {
      const { error } = await supabase
        .from('user_sessions')
        .update({ is_active: false })
        .eq('user_id', userId)

      if (error) {
        console.error('Error revoking sessions:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error revoking sessions:', error)
      return false
    }
  }
}