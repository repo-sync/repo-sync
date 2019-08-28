# Repo Sync
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

> Keep a pair of GitHub repos in sync.

:bulb::construction::bulb: Work in progress. Use at your own risk! :bulb::construction::bulb:

## Features

- Sync from a repo
- Syncing between a private and public repo
- Syncing between two private repos
- Syncing from a third-party repo to a Github repo
- Uses Github Actions and a scheduled job. No external service required!

## Requirements

- Your two repos must share a commit history.
- Your repos must be using GitHub Actions v2. Sign up at [github.com/features/actions](https://github.com/features/actions)

## Interactive Installation

The easiest way to set up Repo Sync is using the [interactive installation page](https://github-repo-sync.herokuapp.com). This page will ask you to authenticate with your GitHub account. Fill out the form, specifying source repo, target repo, and an intermediate branch name to use for pull requests. Once you've submitted this form, the page will generate [Actions workflow files](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file) for you, and can optionally automatically commit them directly to your repository.

## Manual Installation

If you'd prefer to set up your Actions workflows manually, that's also an option:

### 1. Set up secrets

Go to Settings > Secrets under the destination repo, and add the following secrets:

If source repo is a public Github repo:

| Name | Example Value | Description |
| --- | --- | --- |
| SOURCE_REPO	| `owner/repo` | Repository slug |
| INTERMEDIATE_BRANCH | `repo-sync` | Pick a new branch name |

If source repo is private or not hosted on GitHub:

| Name | Example Value | Description |
| --- | --- | --- |
| SOURCE_REPO	| `https://<access_token>@github.com/owner/repo.git` | HTTP clone url with access_token. [Get token](https://github.com/settings/tokens/new?description=repo-sync&scopes=repo) |
| INTERMEDIATE_BRANCH | `repo-sync` | Pick a new branch name |

> :warning: `INTERMEDIATE_BRANCH` should NOT already exist in destination repo as it will be overwritten.

### 2. Create workflow yaml

Add the following to `.github/workflow/repo-sync.yml` under the destination repo:

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

#### cron

The default cron is every 15 minutes. This can be easily adjusted by changing the cron string.

#### External events

Instead of triggering workflows using the cron scheduler, you can setup [external events](https://help.github.com/en/articles/events-that-trigger-workflows#external-events) to trigger the workflow when the source repo changes.

#### Workflow steps

You can add/remove workflow steps to meet your needs. For example, the "Create pull request" step can be removed, or perhaps a "Merge pull request" step can be added.

#### Customize pull request

You can customize PR title, body, label, reviewer, assingee, milestone by setting environment variables as explained at [repo-sync/pull-request](https://github.com/repo-sync/pull-request#advanced-options).

#### Use SSH clone url and deploy keys

You can use SSH clone url and specify `SSH_PRIVATE_KEY` environment variable instead of using the https clone url.
## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://whe.me"><img src="https://avatars3.githubusercontent.com/u/5880908?v=4" width="100px;" alt="Wei He"/><br /><sub><b>Wei He</b></sub></a><br /><a href="#design-wei" title="Design">🎨</a> <a href="https://github.com/repo-sync/repo-sync/commits?author=wei" title="Code">💻</a> <a href="https://github.com/repo-sync/repo-sync/commits?author=wei" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!