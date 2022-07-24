import { Box, Button, Grid, Stack, TextField } from '@mui/material'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

function Register () {
  const { onRegister } = useAuth()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const handleSubmit = () => {
    if (!(firstName && lastName && email && phone && password && passwordConfirmation)) {
      return alert('Falta completar uno de los campos')
    }

    if (password != passwordConfirmation) {
      return alert('El campo contraseña y su confirmación no coinciden')
    }
    
    onRegister({
      firstName,
      lastName,
      email,
      phone,
      password
    })
  }

  return (
    <>
      <Grid container>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Stack spacing={2}>
            <TextField value={firstName} onChange={e => setFirstName(e.target.value)} type='string' label='Nombre' />
            <TextField value={lastName} onChange={e => setLastName(e.target.value)} type='string' label='Apellido' />
            <TextField value={email} onChange={e => setEmail(e.target.value)} type='email' label='Correo electrónico' />
            <TextField value={phone} onChange={e => setPhone(e.target.value)} type='string' label='Teléfono' />
            <TextField value={password} onChange={e => setPassword(e.target.value)} type='password' label='Contraseña' />
            <TextField value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} type='password' label='Confirmar contraseña' />
            <Button variant='contained' onClick={handleSubmit}>Registrarse</Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}

export default Register