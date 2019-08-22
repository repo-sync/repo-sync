import React, { useState, useEffect } from 'react'
import { Heading, Box } from '@primer/components'

import { login, getToken } from '../actions'

import Login from './Login'
import Repos from './Repos'

function App () {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const code = window.location.search.replace(/\??code=/, '')
    const token = window.sessionStorage.getItem('token')
    if (code) {
      window.history.replaceState(null, null, window.location.pathname)
      getToken(code)
        .then(token => {
          setToken(token)
        })
        .catch(error => {
          console.error(error)
          setToken(null)
        })
    } else if (token) {
      setToken(token)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onTokenInvalid = () => {
    setToken(null)
  }

  const onLoginClick = e => {
    e.preventDefault()

    login()
  }

  return (
    <Box px={3} maxWidth={1012} mx={'auto'}>
      <Heading textAlign='center' mb={4}>Sync App</Heading>
      {
        token ? <Repos token={token} onTokenInvalid={onTokenInvalid} /> : <Login onLoginClick={onLoginClick} />
      }
    </Box>
  )
}

export default App
