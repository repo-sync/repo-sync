import React from 'react'
import { Text } from '@primer/components'

import SelectRepo from './components/SelectRepo'

import useGlobal from '../store'

const Repos = () => {
  const [globalState] = useGlobal()
  const { repos } = globalState

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
