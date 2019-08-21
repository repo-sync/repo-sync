import React, { useState } from 'react'
import { Box, BorderBox, Text, StyledOcticon, ButtonPrimary, TextInput } from '@primer/components'
import { GitCompare, ArrowLeft, Play } from '@primer/octicons-react'
import AddSecrets from './AddSecrets'
import CreateWorkflow from './CreateWorkflow'

const SelectRepo = ({ repos }) => {
  const [workflowConfig, setWorkflowConfig] = useState(null)

  const submitForm = e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    setWorkflowConfig({
      destinationRepo: formData.get('destination-repo'),
      destinationRepoBranch: formData.get('destination-repo-branch'),
      sourceRepo: formData.get('source-repo'),
      sourceRepoBranch: formData.get('source-repo-branch')
    })
  }

  const isSourceRepoPrivate = workflowConfig && (repos.find(r => r.full_name === workflowConfig.sourceRepo) || {}).private

  return (
    <Box as='form' mt={2} onSubmit={submitForm}>
      <BorderBox bg='gray.1' px={3} py={2}>
        <Text as='p' m={0} textAlign='center'>
          <Text mr={3}>
            <StyledOcticon icon={GitCompare} color='gray.6' />
          </Text>
          <TextInput name='destination-repo' placeholder='Destination Repo' width={145} py={0} mr={1} list='repos' required />
          <TextInput name='destination-repo-branch' placeholder='Branch' width={90} py={0} required />
          <Text mx={3}>
            <StyledOcticon icon={ArrowLeft} color='gray.6' />
          </Text>
          <TextInput name='source-repo' placeholder='Source Repo' width={145} py={0} mr={1} list='repos' required />
          <TextInput name='source-repo-branch' placeholder='Branch' width={90} py={0} />
          <datalist id='repos'>
            {repos.map(r => <option key={r.full_name}>{r.full_name}</option>)}
          </datalist>
          <ButtonPrimary type='submit' ml={3}><StyledOcticon icon={Play} mr={1} /> Generate workflow</ButtonPrimary>
        </Text>
      </BorderBox>

      <AddSecrets key={`add-secrets-${JSON.stringify(workflowConfig)}`} config={workflowConfig} isPrivate={isSourceRepoPrivate} />
      <CreateWorkflow key={`create-workflow-${JSON.stringify(workflowConfig)}`} config={workflowConfig} />
    </Box>
  )
}

export default SelectRepo
