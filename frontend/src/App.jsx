import { Routes, Route, Navigate } from 'react-router-dom'
import { Container, Box } from '@mui/material'
import AuthProvider from './providers/AuthProvider'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Products from './pages/Products'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Navigation from './components/Navigation'
import GuestRoute from './components/GuestRoute'
import Register from './pages/Register'
import Chat from './pages/Chat'
import CartProvider from './providers/CartProvider'
import Thanks from './pages/Thanks'

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Navigation></Navigation>
          <Container>
            <Box mt={5}>
              <Routes>

                <Route path='/' element={<Navigate to='/productos' replace/>} />

                <Route path="register" element={
                  <GuestRoute>
                    <Register />
                  </GuestRoute>
                }></Route>

                <Route path="login" element={
                  <GuestRoute>
                    <Login />
                  </GuestRoute>
                }></Route>

                <Route path="/productos" element={
                  <ProtectedRoute>
                    <Products />
                  </ProtectedRoute>
                }></Route>

                <Route path="/productos/:category" element={
                  <ProtectedRoute>
                    <Products />
                  </ProtectedRoute>
                }></Route>

                <Route path="/producto/:id" element={
                  <ProtectedRoute>
                    <Product />
                  </ProtectedRoute>
                }></Route>

                <Route path="/chat/:email" element={
                  <ProtectedRoute>
                    <Chat />
                  </ProtectedRoute>
                }></Route>

                <Route path="/chat" element={
                  <ProtectedRoute>
                    <Chat />
                  </ProtectedRoute>
                }></Route>

                <Route path="/carrito" element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }></Route>

                <Route path="/gracias" element={
                  <ProtectedRoute>
                    <Thanks/>
                  </ProtectedRoute>
                }></Route>

              </Routes>
            </Box>
          </Container>
        </CartProvider>
      </AuthProvider>
    </>
  )
}

export default App
