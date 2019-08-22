import React from 'react'
import { Text, Button } from '@primer/components'

const Login = ({ onLoginClick }) => {
  return (
    <>
      <Text as='p' textAlign='center'>
        <Button onClick={onLoginClick}>Login with Github</Button>
      </Text>
    </>
  )
}

export default Login
