import { NavLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'
import { AppBar, Badge, Button, Toolbar } from '@mui/material'
import { Container } from '@mui/system'
import { ShoppingCart } from '@mui/icons-material'

function Navigation () {
  const { onLogout, token, user } = useAuth()
  const { items } = useCart()

  return (
    <>
      <AppBar position='static'>
        <Container>
          <Toolbar>
            {token && <Button color="inherit" to="/chat" LinkComponent={NavLink}>Chat</Button>}
            {token && <Button color="inherit" to={`/chat/${user.email}`} LinkComponent={NavLink}>Mis mensajes</Button>}
            {token && <Button color="inherit" to="/productos" LinkComponent={NavLink}>Productos</Button>}
            {!token && <Button color="inherit" to="/register" LinkComponent={NavLink}>Registro</Button>}
            {!token && <Button color="inherit" to="/login" LinkComponent={NavLink}>Ingresar</Button>}
            {token && <Button color="inherit" to={`/carrito`} LinkComponent={NavLink}>
              <Badge badgeContent={items.length}>
                <ShoppingCart/>
              </Badge>
            </Button>}
            {token && <Button color="inherit" onClick={onLogout}>Cerrar sesión</Button>}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}

export default Navigation