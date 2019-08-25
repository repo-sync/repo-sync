import React, { useState, useEffect } from 'react'
import { Box, Heading, Text } from '@primer/components'

import { login, getToken } from '../actions'

import Login from './Login'
import Repos from './Repos'

function App () {
  const [loadingToken, setLoadingToken] = useState(true)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const code = window.location.search.replace(/\??code=/, '')
    const token = window.sessionStorage.getItem('token')
    if (code) {
      window.history.replaceState(null, null, window.location.pathname)
      setLoadingToken(true)
      getToken(code)
        .then(token => {
          setToken(token)
          setLoadingToken(false)
        })
        .catch(error => {
          console.error(error)
          setToken(null)
          setLoadingToken(false)
        })
    } else if (token) {
      setToken(token)
      setLoadingToken(false)
    } else {
      setLoadingToken(false)
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
      <Heading textAlign='center' mb={4}>
        Sync <img alt='Sync' src='https://cdn.jsdelivr.net/gh/feathericons/feather@v4/icons/git-pull-request.svg' />
      </Heading>
      {
        loadingToken ? <Text as='p' fontSize={2} textAlign='center' >Loading...</Text>
          : token ? <Repos token={token} onTokenInvalid={onTokenInvalid} /> : <Login onLoginClick={onLoginClick} />
      }
    </Box>
  )
}

export default App
