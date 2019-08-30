import React from 'react'
import { Box, BorderBox, Heading, ButtonOutline, Text, Link } from '@primer/components'

import { getRepoSecretsUrl, getRepoCloneUrl, getCreateUserTokenUrl } from '../../helper'

const AddSecrets = ({ config, isPrivate }) => {
  if (!config) return null

  return (
    <>
      <BorderBox mt={4} overflow='hidden'>
        <BorderBox bg='gray.1' px={3} py={3} mx='-1px' mt='-1px' borderRadius={0}>
          <Heading fontSize={2}>
            Step 1. Add
            <Link href={getRepoSecretsUrl(config.destinationRepo)} target='_blank'> Secrets</Link>
          </Heading>
        </BorderBox>
        <Box px={3} py={2}>
          <table>
            <thead>
              <tr>
                <th><Text fontWeight='bold'>Name</Text></th>
                <th><Text fontWeight='bold'>Value</Text></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><Text fontFamily='mono' pr={4}>SOURCE_REPO</Text></td>
                <td><Text fontFamily='mono' pr={4}>{
                  isPrivate
                    ? getRepoCloneUrl(config.sourceRepo, true)
                    : config.sourceRepo
                }</Text></td>
                <td>{
                  isPrivate
                    ? <ButtonOutline ml={3} onClick={() => window.open(getCreateUserTokenUrl(), '_blank')}>Generate token</ButtonOutline>
                    : null
                }</td>
              </tr>
              <tr>
                <td><Text fontFamily='mono' pr={4}>INTERMEDIATE_BRANCH</Text></td>
                <td><Text fontFamily='mono' pr={4}>{config.intermediateBranch}</Text></td>
                <td><Text ml={3}>Pick a new branch name</Text></td>
              </tr>
            </tbody>
          </table>
        </Box>
      </BorderBox>
    </>
  )
}

export default AddSecrets
