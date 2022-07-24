import { Grid, Typography, Divider, Select, MenuItem, FormControl, InputLabel, Button, Stack } from "@mui/material"
import { Box } from "@mui/system"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useCart } from '../hooks/useCart'
import api from "../services/api"

export default function Product() {
  const { id } = useParams()
  const { addProduct, updateProduct, getItem } = useCart()
  const [product, setProduct] = useState({})
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    
    api.get(`/products/${id}`)
      .then(response => response.json())
      .then(json => setProduct(json))

  }, [id])

  useEffect(() => {
    const item = getItem(product.id)

    if (item) {
      setQuantity(item.quantity)
    }

  }, [product])

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <img src={product.picture} width='100%' height='100%'/>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">{ product.name }</Typography>
          <Typography variant="h5">${ product.price }</Typography>
          <Typography>{ product.description }</Typography>
          <Box marginY={3}>
            <FormControl>
              <InputLabel id='quantityLabel'>Cantidad</InputLabel>
              <Select labelId='quantityLabel' label='Cantidad' value={quantity} onChange={e => setQuantity(e.target.value)}>
                <MenuItem value={1}>1 unidad</MenuItem>
                <MenuItem value={2}>2 unidades</MenuItem>
                <MenuItem value={3}>3 unidades</MenuItem>
                <MenuItem value={4}>4 unidades</MenuItem>
                <MenuItem value={5}>5 unidades</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {!getItem(id) && <Button variant="contained" disableElevation onClick={e => addProduct(product.id, quantity)}>Agregar al carrito</Button> }
          {getItem(id) && <Button variant="contained" disableElevation onClick={e => updateProduct(product.id, quantity)}>Actualizar carrito</Button> }
        </Grid>
      </Grid>
    </>
  )
}