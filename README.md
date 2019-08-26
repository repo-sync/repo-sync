# Repo Sync

> Keep a pair of GitHub repos in sync.

:bulb::construction::bulb: Work in progress. Use at your own risk! :bulb::construction::bulb:


## Features

- Sync from a repo
- Syncing between a private and public repo
- Syncing between two private repos
- Syncing from a third-party repo to a Github repo
- Utilizes Github Actions and scheduled job


## Installation

> _Before you start:_ Make sure source and destination repos share a commit history

Use the interactive installation guide [here](https://github-repo-sync.herokuapp.com)

Alternatively, follow these steps:

### 1. Setup secrets

Go to Settings > Secrets under the destination repo, and add the following secrets:

If source repo is a public Github repo:

| Name | Value | Description |
| --- | --- | --- |
| SOURCE_REPO	| `owner/repo` | Repository slug |
| INTERMEDIATE_BRANCH | `repo-sync` | Pick a new branch name |

If source repo is private or hosted elsewhere:

| Name | Value | Description |
| --- | --- | --- |
| SOURCE_REPO	| `https://<access_token>@github.com/owner/repo.git` | HTTP clone url with access_token. [Get token](https://github.com/settings/tokens/new?description=repo-sync&scopes=repo) |
| INTERMEDIATE_BRANCH | `repo-sync` | Pick a new branch name |

> :warning: `INTERMEDIATE_BRANCH` should NOT already exist in destination repo as it will be overwritten.

### 2. Create workflow yaml

Add the following to `.github/workflow/repo-sync.yml` under the destination repo

```yaml
name: Sync repo

on:
  schedule: 
  - cron: "*/15 * * * *"

jobs:
  repo-sync:
    name: Sync repo
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master
    - uses: repo-sync/github-sync@v1
      name: Sync repo to branch
      env:
        SOURCE_REPO: ${{ secrets.SOURCE_REPO }}
        SOURCE_BRANCH: "master"
        INTERMEDIATE_BRANCH: ${{ secrets.INTERMEDIATE_BRANCH }}
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      with:
        args: $SOURCE_REPO $SOURCE_BRANCH:$INTERMEDIATE_BRANCH
    - uses: repo-sync/pull-request@v1
      name: Create pull request
      env:
        SOURCE_BRANCH: ${{ secrets.INTERMEDIATE_BRANCH }}
        DESTINATION_BRANCH: "master"
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Advanced configuration

This workflow file is fully customizable allowing for advanced configurations.

#### Cron

The default cron is every 15 minutes. This can be easily adjusted by changing the cron string.

#### External events

Instead of triggering workflow using the cron scheduler, you can setup [external events](https://help.github.com/en/articles/events-that-trigger-workflows#external-events) to trigger the workflow when the source repo changes.

#### Workflow steps

You can add/remove workflow steps to meet your needs. For example, the "Create pull request" step can be removed, or perhaps a "Merge pull request" step can be added.

#### Customize pull request

You can customize PR title, body, label, reviewer, assingee, milestone by setting environment variables as explained at [repo-sync/pull-request](https://github.com/repo-sync/pull-request#advanced-options).

#### Use SSH clone url and deploy keys

You can use SSH clone url and specify `SSH_PRIVATE_KEY` environment variable instead of using the https clone url.


## Front-end

> This is not required to use Sync

### Development

1. Create a Github OAuth app with callback url `http://localhost:3000`
2. Create .env from .env.example and fill out the values
3. Run `sh script/server`

### Production (Heroku)

1. Create a heroku app
2. Create a Github OAuth App with heroku app domain as the callback url
3. Add config vars from .env under heroku app settings
4. Add build packs `heroku/nodejs` and `https://github.com/wei/heroku-buildpack-static.git` under heroku app settings
5. Deploy to Heroku
