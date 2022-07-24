import { Button, Card, CardActions, CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'
import api from '../services/api'

function Cart () {
  const { items, removeProduct, emptyCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const createOrder = () => {
    api.post('/orders', { email: user.email, items })
    .then(response => response.json())
    .then(json => {
      api.put(`/carts/${user.cart}/empty`)
      emptyCart()
      navigate('/gracias')
    })
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Stack spacing={2}>
          {items.map(item => (
            <Card key={item._id} variant='outlined' sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
              <Box sx={{ display: 'flex' }}>
              <CardMedia sx={{ width: 100 }} component="img" image={item.picture}></CardMedia>
              <CardContent>
                <Typography>{ item.name }</Typography>
                <Typography>Cantidad: { item.quantity }</Typography>
              </CardContent>
              </Box>
              <CardActions>
                <Button onClick={e => removeProduct(item.id)}>Eliminar</Button>
              </CardActions>
            </Card>
          ))}
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Card variant='outlined'>
            <CardContent>
              <Button variant='contained' disableElevation onClick={createOrder}>Realizar pedido</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default Cart