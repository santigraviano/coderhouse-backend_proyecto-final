import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { CartContext } from '../hooks/useCart'
import api from '../services/api'

function CartProvider ({ children }) {
  const { user } = useAuth()
  const [items, setItems] = useState([])

  useEffect(() => {
    if (user.cart) {
      loadItems()
    }
  }, [user])

  const loadItems = () => {
    api.get(`/carts/${user.cart}`)
    .then(response => response.json())
    .then(json => setItems(json.items))
  }

  const getItem = (id) => items.find(i => i.productId === id)

  const addProduct = (productId, quantity) => {
    api.post(`/carts/${user.cart}/items`, { productId, quantity })
    .then(response => response.json())
    .then(json => setItems(json.items))
  }

  const updateProduct = (productId, quantity) => {
    const item = getItem(productId)
    api.put(`/carts/${user.cart}/items`, { itemId: item.id, quantity })
    .then(response => response.json())
    .then(json => setItems(json.items))
  }

  const removeProduct = (itemId) => {
    api.delete(`/carts/${user.cart}/items`, { itemId })
    .then(response => response.json())
    .then(json => setItems(json.items))
  }

  const emptyCart = () => {
    setItems([])
  }

  const value = {
    items,
    loadItems,
    addProduct,
    updateProduct,
    removeProduct,
    getItem,
    emptyCart
  }

  return (
    <CartContext.Provider value={value}>
      { children }
    </CartContext.Provider>
  )
}

export default CartProvider