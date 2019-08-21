import React, { useEffect } from 'react'
import { Text, Button } from '@primer/components'

import useGlobal from '../store'

const Login = () => {
  const [, globalActions] = useGlobal()

  const login = e => {
    e.preventDefault()
    globalActions.api.login('wei')
  }

  useEffect(() => {
    const code = window.location.search.replace(/\??code=/, '')
    if (code) {
      window.history.replaceState(null, null, window.location.pathname)
      globalActions.api.getToken(code)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Text as='p' textAlign='center'>
        <Button onClick={login}>Login with Github</Button>
      </Text>
    </>
  )
}

export default Login
