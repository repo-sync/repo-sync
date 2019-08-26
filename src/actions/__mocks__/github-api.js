export default function Github (opts = {}) {
  const _token = opts.token

  const listRepos = jest.fn(() =>
    _token ? 
    Promise.resolve({
      data: [
        { full_name: 'owner/repo-1', private: false },
        { full_name: 'owner/repo-2', private: true }
      ]
    }) : 
    Promise.reject()
  )

  const getProfile = jest.fn(() => {
    return Promise.resolve({
      data: {
        name: 'Committer Name',
        email: 'committer@example.com'
      }
    })
  })

  const writeFile = jest.fn(() => {
    return Promise.resolve({
      data: {
        content: {
          html_url: 'https://github.com/commit-url'
        }
      }
    })
  })

  return {
    getToken: () => _token,
    getUser: jest.fn(() =>
      Promise.resolve({
        listRepos,
        getProfile
      })
    ),
    getRepo: jest.fn(repo =>
      repo ? 
      Promise.resolve({
        writeFile
      }) : 
      Promise.reject()
    ),
    listRepos,
    getProfile,
    writeFile
  }
}
