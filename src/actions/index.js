import axios from 'axios'
import Github from 'github-api'

let gh = new Github()
let ghUser = null

export const login = async () => {
  window.location.href = 'https://github.com/login/oauth/authorize?' +
    [
      `client_id=${window.CLIENT_ID}`,
      `redirect_uri=${window.location.href}`,
      `scope=user%20repo`
    ].join('&')
}

export const getToken = async code => {
  const response = await axios.get(`${window.AUTH_ENDPOINT}${code}`)
  const data = response.data || ''

  // Cleanup full response from Github to get access_token
  const token = (data.match(/access_token=(\w+)/) || {})[1]
  if (token) {
    window.sessionStorage.setItem('token', token)
    return token
  } else {
    window.sessionStorage.removeItem('token')
    return null
  }
}

export const getRepos = async token => {
  try {
    gh = new Github({ token })
    ghUser = await gh.getUser()
    const repos = (await ghUser.listRepos()).data
    return repos
  } catch (error) {
    console.error(error)
    window.sessionStorage.removeItem('token')
    throw error
  }
}

export const createFile = async (repo, filePath, fileContent) => {
  try {
    const [{ data: { name, email } }, r] = await Promise.all([
      ghUser.getProfile(),
      gh.getRepo(repo)
    ])

    // Undefined defaults to repo's default branch (master)
    return r.writeFile(undefined, filePath, fileContent, `Creating ${filePath}`, {
      committer: { name: name, email: email }
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}
