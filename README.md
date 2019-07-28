# Sync

> Keep a pair of GitHub repos in sync.

:bulb::construction::bulb: This is currently an aspirational design document. :bulb::construction::bulb:

## Minimum Viable Product (MVP)

- Syncing between a private and public repo
- Tests / Coverage
- Documentation
- Secrets live in ENV
- Private repo, only used by GitHub docs team

## Stretch Goals

- Open-source
- Syncing between two _private_ repos
- hosted instance of the service can be re-used for multiple installations/customers
- GitHub Marketplace

## Stack

These languages and tools should be used to build, test, and deploy the app:

- Node.js
- Docker
- Travis CI
- Heroku
- Shell scripts (if needed)

## Dependencies

Many of the npm dependencies used in @wei/pull are also used by the docs team! :tada:

- `probot` :+1:
- `jest` :+1:
- `standard` :+1:

Consider alternatives to:

- `request` is in [maintenance mode](https://github.com/request/request/issues/3142), consider `got`, `bent`, etc.

## Implementation

- [Scripts to Rule Them All](https://github.com/github/scripts-to-rule-them-all)
- [12 factor](https://12factor.net) methodology