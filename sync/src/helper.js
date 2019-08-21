export const defaultWorkflowFileName = 'repo-sync.yml'

export const getRepoSSHCloneUrl = repo => `git@github.com:${repo}.git`

export const getRepoSecretsUrl = repo => `https://github.com/${repo}/settings/secrets`

export const getRepoKeysUrl = repo => `https://github.com/${repo}/settings/keys`

export const getWorkflowFile = () =>
  `name: Sync repository

on:
  schedule: 
  - cron: "*/15 * * * *"

jobs:
  repo-sync:
    name: Sync repository
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master
    - uses: wei/github-sync@v1
      name: Sync repository to branch
      env:
        SSH_PRIVATE_KEY: \${{ secrets.SOURCE_REPO_PRIVATE_KEY }}
        SOURCE_REPO: \${{ secrets.SOURCE_REPO }}
        SOURCE_BRANCH: \${{ secrets.SOURCE_BRANCH }}
        DESTINATION_BRANCH: \${{ secrets.DESTINATION_BRANCH }}
        GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
      with:
        args: $SOURCE_REPO $SOURCE_BRANCH:$DESTINATION_BRANCH
    - uses: wei/pull-request@v1
      name: Create pull request
      env:
        SOURCE_BRANCH: \${{ secrets.DESTINATION_BRANCH }}
        DESTINATION_BRANCH: \${{ secrets.PR_DESTINATION_BRANCH }}
        GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
`
