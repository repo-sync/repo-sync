import React, { useEffect } from 'react'
import { Button, Heading, Text } from '@primer/components'

import useGlobal from '../store'

const Login = () => {
  const [globalState, globalActions] = useGlobal()
  const { repos } = globalState

  const login = e => {
    e.preventDefault()
    globalActions.api.login('wei')
  }

  useEffect(() => {
    const code = window.location.search.replace(/\??code=/, '')
    if (code) {
      globalActions.api.getToken(code)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (repos) {
    window.location.href = '/repos'
    return null
  }

  return (
    <>
      <Heading>
        <Text>Login</Text>
      </Heading>
      <Button onClick={login}>Login with Github</Button>
    </>
  )
}

export default Login
