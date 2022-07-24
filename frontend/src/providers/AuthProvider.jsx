import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext } from '../hooks/useAuth'
import api from '../services/api'

function AuthProvider ({ children }) {
  const initialUser = { email: null, firstName: null, lastName: null, cart: null }
  const navigate = useNavigate()
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(initialUser)

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage.getItem('user')))
    }

    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
      api.setToken(localStorage.getItem('token'))
    }
  }, [])

  const handleRegister = (data) => {
    api.post('/auth/register', data)
    .then(response => response.json())
    .then(json => {
      console.log(json)
      const { token, email, firstName, lastName, cart } = json
      const user = { email, firstName, lastName, cart }
      setToken(token)
      setUser(user)
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      api.setToken(token)
      navigate('/productos')
    })
  }

  const handleLogin = (email, password) => {
    api.post('/auth/login', { email, password })
    .then(response => response.json())
    .then(json => {
      console.log(json)
      const { token, email, firstName, lastName, cart } = json
      const user = { email, firstName, lastName, cart }
      setToken(token)
      setUser(user)
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      api.setToken(token)
      navigate('/productos')
    })
  }

  const handleLogout = () => {
    setToken(null)
    setUser(initialUser)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const value = {
    user,
    token,
    onRegister: handleRegister,
    onLogin: handleLogin,
    onLogout: handleLogout
  }

  return (
    <AuthContext.Provider value={value}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider