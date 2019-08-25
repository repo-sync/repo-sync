import React, { useState } from 'react'
import { Box, BorderBox, Heading, Text, StyledOcticon, ButtonPrimary, BranchName, Label, Flash } from '@primer/components'
import { Play, FileCode } from '@primer/octicons-react'

import { createFile } from '../../actions'
import { defaultWorkflowFileName, getWorkflowFile } from '../../helper'

const CreateWorkflow = ({ config }) => {
  const [newCommit, setNewCommit] = useState(null)
  let workflowField = null

  const createFileClick = e => {
    e.preventDefault()

    createFile(
      config.destinationRepo,
      `.github/workflows/${defaultWorkflowFileName}`,
      workflowField.innerText)
      .then(result => {
        setNewCommit(result)
      }, error => {
        console.error(error)
        setNewCommit(error)
      })
  }

  const openNewFileClick = e => {
    e.preventDefault()

    window.open(newCommit.data.content.html_url, '_blank')
  }

  if (!config) return null

  return (
    <>
      <BorderBox mt={3} mb={3}>
        <BorderBox bg='gray.1' px={3} py={3} overflow='hidden'>
          <Heading fontSize={2} mb={2} mx='-1px' mt='-1px' borderRadius={0}>
            Step 2. Create Workflow
          </Heading>
          <Text fontFamily='mono' fontSize={12} fontWeight='bold' >
            <Label>Draft</Label> .github/workflows/{defaultWorkflowFileName}
          </Text>
        </BorderBox>
        <Box px={3} py={2}>
          <pre ref={ref => { workflowField = ref }} contentEditable>
            { getWorkflowFile(config) }
          </pre>
        </Box>
      </BorderBox>
      {
        newCommit === null
          ? <Flash scheme='yellow'>
            <ButtonPrimary mr={2} onClick={createFileClick}><StyledOcticon icon={FileCode} mr={1} /> Create workflow</ButtonPrimary>
            <Text><strong>Create/Overwrite</strong> this file in the default branch of <BranchName>{`${config.destinationRepo}`}</BranchName>.</Text>
          </Flash>
          : newCommit && newCommit.data && newCommit.data.content
            ? <Flash scheme='green'>
              <ButtonPrimary mr={2} onClick={openNewFileClick}><StyledOcticon icon={Play} mr={1} /> View workflow</ButtonPrimary>
              <Text>The workflow has been created in <BranchName>{`${config.destinationRepo}`}</BranchName>.</Text>
            </Flash>
            : <Flash scheme='red'>
              <Text>There was an error creating the workflow, please manually create it in <BranchName>{`${config.destinationRepo}`}</BranchName>.</Text>
            </Flash>
      }
    </>
  )
}

export default CreateWorkflow
