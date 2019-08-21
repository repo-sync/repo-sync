import React from 'react'
import { Box, BorderBox, Heading, Text, Link } from '@primer/components'

import { getRepoSecretsUrl, getRepoSSHCloneUrl, getRepoKeysUrl } from '../../helper'

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
              </tr>
            </thead>
            <tbody>
              {
                isPrivate
                  ? <tr>
                    <td><Text fontFamily='mono' pr={4}>SOURCE_REPO_PRIVATE_KEY</Text></td>
                    <td><Text>Generate a pair of deploy keys, add private key secret, then add public key <Link href={getRepoKeysUrl(config.sourceRepo)} target='_blank'>here</Link></Text></td>
                  </tr> : null
              }
              <tr>
                <td><Text fontFamily='mono'>SOURCE_REPO</Text></td>
                <td><Text fontFamily='mono'>{
                  isPrivate
                    ? getRepoSSHCloneUrl(config.sourceRepo)
                    : config.sourceRepo
                }</Text></td>
              </tr>
              <tr>
                <td><Text fontFamily='mono'>SOURCE_BRANCH</Text></td>
                <td><Text fontFamily='mono'>{config.sourceRepoBranch}</Text></td>
              </tr>
              <tr>
                <td><Text fontFamily='mono'>DESTINATION_BRANCH</Text></td>
                <td><Text fontFamily='mono'>{config.destinationRepoBranch}</Text></td>
              </tr>
              <tr>
                <td><Text fontFamily='mono' pr={4}>PR_DESTINATION_BRANCH</Text></td>
                <td><Text fontFamily='mono'>master</Text></td>
              </tr>
            </tbody>
          </table>
        </Box>
      </BorderBox>
    </>
  )
}

export default AddSecrets
