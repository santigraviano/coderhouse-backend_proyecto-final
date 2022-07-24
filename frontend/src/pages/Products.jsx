import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import api from '../services/api'

function Products () {
  const { category } = useParams()
  const { token } = useAuth()
  const [products, setProducts] = useState([])

  useEffect(() => {
    const query = category ? `?category=${category}` : '/'
    api.get(`/products${query}`)
    .then(response => response.json())
    .then(json => setProducts(json))
  }, [category])

  return (
    <>
      <Grid container spacing={2}>
      {products.map(product => (
        <Grid item xs={3} key={product._id}>
          <Card variant='outlined'>
            <CardActionArea to={`/producto/${product._id}`} LinkComponent={Link}>
              <CardContent>
                <CardMedia component='img' image={product.picture}></CardMedia>
                <Typography >{ product.name }</Typography>
                <Typography>${ product.price }</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
      </Grid>
    </>
  )
}

export default Products