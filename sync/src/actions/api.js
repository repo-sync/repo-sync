import axios from 'axios'
import Github from 'github-api'

let gh = new Github()

export const login = async (store) => {
  window.location.href = 'https://github.com/login/oauth/authorize?' +
    [
      `client_id=2c3a477a1979104da158`,
      `redirect_uri=${window.location.href}`,
      `scope=user%20repo`
    ].join('&')
}

export const getToken = async (store, code) => {
  const response = await axios.get(
    `https://github-repo-sync-auth.herokuapp.com/authenticate/${code}`, {}
  )
  const { token } = response.data || {}
  if (token) {
    window.localStorage.setItem('token', token)
    store.setState({ token })
    getRepos(store, token)
  } else {
    window.localStorage.removeItem('token')
    window.location.href = '/login'
  }
}

export const getRepos = async (store, token) => {
  try {
    gh = new Github({ token })
    const user = await gh.getUser()

    const profile = (await user.getProfile()).data
    const repos = (await user.listRepos()).data

    store.setState({ profile, repos })
  } catch (error) {
    console.error(error)
    store.setState({ profile: null })
    window.localStorage.removeItem('token')
    window.location.href = '/login'
  }
}

export const getReposByUsername = async (store, username) => {
  const status = 'LOADING'
  store.setState({ status })
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`
    )
    const repos = response.data
    store.setState({ repos })
  } catch (error) {
    console.error(error)
  }
}

export const createFile = async (store, repo, filePath, fileContent) => {
  try {
    const r = await gh.getRepo(repo)
    return r.writeFile(r.default_branch, filePath, fileContent, `Creating ${filePath}`, {
      committer: {
        name: 'Sync App',
        email: 'sync@example.com'
      }
    })
  } catch (error) {
    console.error(error)
  }
}
