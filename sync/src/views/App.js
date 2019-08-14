import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { BaseStyles, Heading } from '@primer/components'
// import logo from '../logo.svg'
import './App.css'

import useGlobal from '../store'

import Login from './Login'
import Repos from './Repos'

function Index () {
  return <Heading>Home</Heading>
}

function App () {
  const [, globalActions] = useGlobal()

  useEffect(() => {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      globalActions.api.getRepos(token)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Router>
      <BaseStyles>
        {/* <Heading>
          <Text>Sync</Text>
        </Heading> */}
        {/* <UnderlineNav aria-label="Main">
          <UnderlineNav.Link to="/" exact as={NavLink}>Home</UnderlineNav.Link>
          <UnderlineNav.Link to="/repos/" as={NavLink}>Repos</UnderlineNav.Link>
          <UnderlineNav.Link to="/login/" as={NavLink}>Login</UnderlineNav.Link>
        </UnderlineNav> */}

        <Route path='/' exact component={Index} />
        <Route path='/repos/' component={Repos} />
        <Route path='/login/' component={Login} />
      </BaseStyles>
    </Router>
  )
}

export default App
