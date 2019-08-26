export const defaultWorkflowFileName = 'repo-sync.yml'

export const getRepoCloneUrl = (repo, token) => `https://${token ? `<access_token>@` : ''}github.com/${repo}.git`

export const getRepoSecretsUrl = repo => `https://github.com/${repo}/settings/secrets`

export const getCreateUserTokenUrl = repo => `https://github.com/settings/tokens/new?description=repo-sync&scopes=repo`

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
        SOURCE_REPO: \${{ secrets.SOURCE_REPO }}
        SOURCE_BRANCH: "master"
        INTERMEDIATE_BRANCH: \${{ secrets.INTERMEDIATE_BRANCH }}
        GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
      with:
        args: $SOURCE_REPO $SOURCE_BRANCH:$INTERMEDIATE_BRANCH
    - uses: wei/pull-request@v1
      name: Create pull request
      env:
        SOURCE_BRANCH: \${{ secrets.INTERMEDIATE_BRANCH }}
        DESTINATION_BRANCH: "master"
        GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
`
