import React, { useState, useEffect } from 'react'
import { Text } from '@primer/components'

import SelectRepo from './components/SelectRepo'
import { getRepos } from '../actions'

const Repos = ({ token, onTokenInvalid }) => {
  const [repos, setRepos] = useState(null)

  useEffect(() => {
    getRepos(token)
      .then(repos => {
        setRepos(repos)
      })
      .catch(error => {
        console.error(error)
        onTokenInvalid(error)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {
        repos === null
          ? <Text as='p' fontSize={2} textAlign='center' >Loading...</Text>
          : repos !== null && repos.length === 0
            ? <Text as='p' fontSize={2} textAlign='center' >You have no repositories.</Text>
            : <SelectRepo repos={repos} />
      }
    </>
  )
}

export default Repos
