import React, { useEffect } from 'react'
import { Heading, Box } from '@primer/components'

import useGlobal from '../store'

import Login from './Login'
import Repos from './Repos'

function App () {
  const [globalState, globalActions] = useGlobal()

  useEffect(() => {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      globalActions.api.getRepos(token)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box px={3} maxWidth={1012} mx={'auto'}>
      <Heading textAlign='center' mb={4}>Sync App</Heading>
      {
        globalState.token ? <Repos /> : <Login />
      }
    </Box>
  )
}

export default App
