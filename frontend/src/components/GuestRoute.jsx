import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function ProtectedRoute ({ children }) {
  const { token } = useAuth()

  if (token) {
    return <Navigate to="/productos" replace />
  }

  return children
}

export default ProtectedRoute