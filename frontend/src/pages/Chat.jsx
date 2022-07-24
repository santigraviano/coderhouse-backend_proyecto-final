import { Button, Grid, Stack, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { io } from 'socket.io-client'
import { useAuth } from '../hooks/useAuth'
import api from '../services/api'

function Chat() {
  const { user } = useAuth()
  const { email } = useParams()
  const [messages, updateMessages] = useState([])
  const [messageInput, updateMessageInput] = useState('')

  useEffect(() => {
    const query = email ? `?email=${email}`: ''
    api.get(`/messages${query}`)
      .then(response => response.json())
      .then(data => {
        updateMessages(data)
      })
  }, [email])

  useEffect(() => {
    const socket = io('http://localhost:8080')

    socket.on('message:create', data => {
      updateMessages(messages => [...messages, JSON.parse(data)])
    })

    return () => {
      socket.off('message:create')
    }
  }, [])

  const handleSend = () => {
    api.post('/messages', {
      email: user.email,
      type: 'user',
      content: messageInput
    })
    .then(response => response.json())
    .then(json => {
      updateMessageInput('')
    })
  }

  return (
    <Grid container>
      <Grid item xs={3}></Grid>
      <Grid item xs={6}>
        <Box paddingBottom={2}>
          <Stack spacing={1}>
            {messages.map(message => (
              <Box key={message._id}>
                <Typography color='gray' fontSize={12}>
                  { `${message.email} ${message.type === 'user' ? 'usuario' : 'sistema'}` }
                </Typography>
                <Typography>{ message.content }</Typography>
              </Box>
            ))}
          </Stack>
        </Box>
        <Grid container>
          <Grid item xs={true}>
            <TextField fullWidth size='small' type="text" value={messageInput} onChange={e => updateMessageInput(e.target.value)}/>
          </Grid>
          <Grid item xs='auto' marginLeft={1}>
            <Button variant='contained' disableElevation onClick={handleSend}>Enviar</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Chat