import { TextField, Button, Stack, Grid, Box } from '@mui/material'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

function Login () {
  const { onLogin } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      <Grid container>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Stack spacing={2}>
            <TextField onChange={e => setEmail(e.target.value)} value={email} type="email" label="Correo electrónico" />
            <TextField onChange={e => setPassword(e.target.value)} value={password} type="password" label="Contraseña"/>
            <Button variant='contained' onClick={e => onLogin(email, password)}>Iniciar sesión</Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}

export default Login