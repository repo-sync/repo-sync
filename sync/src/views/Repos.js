import React, { useState } from 'react'
import { Box, BorderBox, Heading, Text, StyledOcticon, ButtonPrimary, BranchName, Label, Flash, TextInput } from '@primer/components'
import { GitCompare, ArrowLeft, Play, FileCode } from '@primer/octicons-react'

import useGlobal from '../store'

const getWorkflowFile = workflowConfig =>
  `name: "Sync ${workflowConfig.sourceRepo}:${workflowConfig.sourceRepoBranch} to ${workflowConfig.destinationRepoBranch}"

on:
  schedule:
  - cron: "*/15 * * * *"

jobs:
  repo-sync:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master
    - uses: wei/github-sync@master
      name: repo-sync
      env:
        SOURCE_REPO: "${workflowConfig.sourceRepo}"
        SOURCE_BRANCH: "${workflowConfig.sourceRepoBranch}"
        DESTINATION_BRANCH: "${workflowConfig.destinationRepoBranch}"
        GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
      with:
        args: $SOURCE_REPO $SOURCE_BRANCH:$DESTINATION_BRANCH
`

const SelectRepos = () => {
  const [globalState, globalActions] = useGlobal()
  const [workflowConfig, setWorkflowConfig] = useState(null)
  const [newCommit, setNewCommit] = useState(null)
  const { repos } = globalState
  let workflowField = null

  const submitForm = e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    setWorkflowConfig({
      destinationRepo: formData.get('destination-repo'),
      destinationRepoBranch: formData.get('destination-repo-branch'),
      sourceRepo: formData.get('source-repo'),
      sourceRepoBranch: formData.get('source-repo-branch')
    })
    setNewCommit(null)
  }

  const createFile = e => {
    e.preventDefault()
    console.log(workflowField.innerText)
    globalActions.api.createFile(
      workflowConfig.destinationRepo,
      `.github/workflows/repo-sync.yml`,
      workflowField.innerText)
      .then(result => {
        setNewCommit(result)
      }, error => {
        setNewCommit(false)
      })
  }

  const openNewFile = e => {
    e.preventDefault()
    window.open(newCommit.data.content.html_url, '_blank')
  }

  return (
    <Box as='form' p={4} mt={2} onSubmit={submitForm}>
      <BorderBox bg='gray.1' px={3} py={2}>
        <Text mr={3}>
          <StyledOcticon icon={GitCompare} color='gray.6' />
        </Text>
        {/* <RepoSelecter /> */}
        <TextInput name='destination-repo' placeholder='Destination Repository' list='repos' required />
        <TextInput name='destination-repo-branch' placeholder='Destination Branch' required />
        <Text mx={3}>
          <StyledOcticon icon={ArrowLeft} color='gray.6' />
        </Text>
        <TextInput name='source-repo' placeholder='Source Repository' list='repos' required />
        <TextInput name='source-repo-branch' placeholder='Source Branch' required />
        <datalist id='repos'>
          {repos.map(r => <option key={r.full_name}>{r.full_name}</option>)}
        </datalist>
        <ButtonPrimary type='submit' ml={3}><StyledOcticon icon={Play} mr={1} /> Generate workflow</ButtonPrimary>
      </BorderBox>

      {
        !workflowConfig ? null
          : <>
            <BorderBox mt={4}>
              <BorderBox bg='gray.1' px={3} py={2}>
                <Text fontFamily='mono' fontSize={12} fontWeight='bold'>
                  <Label>Proposed</Label> <BranchName>{`${workflowConfig.destinationRepo}`}</BranchName> .github/workflows/repo-sync.yml
                </Text>
              </BorderBox>
              <Box px={3} py={2}>
                <pre ref={r => { workflowField = r }} contentEditable>
                  {getWorkflowFile(workflowConfig)}
                </pre>
              </Box>
              {
                newCommit === null
                  ? <Flash scheme='yellow'>
                    <ButtonPrimary mr={2} onClick={createFile}><StyledOcticon icon={FileCode} mr={1} /> Create file</ButtonPrimary>
                    <Text>Create/overwrite this file in the default branch of <BranchName>{`${workflowConfig.destinationRepo}`}</BranchName>.</Text>
                  </Flash>
                  : newCommit && newCommit.data && newCommit.data.content
                    ? <Flash scheme='green'>
                      <ButtonPrimary mr={2} onClick={openNewFile}><StyledOcticon icon={Play} mr={1} /> View workflow</ButtonPrimary>
                      <Text>The workflow has been created in <BranchName>{`${workflowConfig.destinationRepo}`}</BranchName>.</Text>
                    </Flash>
                    : <Flash scheme='red'>
                      <Text>There was an error creating the workflow, please manually create it in <BranchName>{`${workflowConfig.destinationRepo}`}</BranchName>.</Text>
                    </Flash>
              }
            </BorderBox>
          </>
      }
    </Box>
  )
}

const Repos = () => {
  const [globalState] = useGlobal()
  const { repos } = globalState

  return (
    <>
      <Heading><Text>Select Repos to Sync</Text></Heading>
      {repos === null && <h4>Loading...</h4>}
      {repos !== null && repos.length === 0 && <h4>This user have zero repos</h4>}
      {repos !== null && repos.length > 0 && <SelectRepos />}
    </>
  )
}

export default Repos
