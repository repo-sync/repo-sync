export const defaultWorkflowFileName = 'repo-sync.yml'

export const getRepoCloneUrl = (repo, token) => `https://${token ? `<access_token>@` : ''}github.com/${repo}.git`

export const getRepoSecretsUrl = repo => `https://github.com/${repo}/settings/secrets`

export const getCreateUserTokenUrl = repo => `https://github.com/settings/tokens/new?description=repo-sync&scopes=repo`

export const getWorkflowFile = () =>
  `name: Repo Sync

on:
  schedule: 
  - cron: "*/15 * * * *"

jobs:
  repo-sync:
    name: Repo Sync
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v1
    - uses: repo-sync/github-sync@v2
      name: Sync repository to branch
      with:
        source_repo: \${{ secrets.SOURCE_REPO }}
        source_branch: "master"
        destination_branch: \${{ secrets.INTERMEDIATE_BRANCH }}
        github_token: \${{ secrets.GITHUB_TOKEN }}
    - uses: repo-sync/pull-request@v2
      name: Create pull request
      with:
        source_branch: \${{ secrets.INTERMEDIATE_BRANCH }}
        destination_branch: "master"
        github_token: \${{ secrets.GITHUB_TOKEN }}
`
