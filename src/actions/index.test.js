import { getGH, login, getToken, getRepos, createFile } from './'

describe('login redirect', () => {
  const originalLocation = window.location

  beforeEach(() => {
    delete window.location
    window.location = {
      href: ''
    }
  })

  afterEach(() => {
    window.location = originalLocation
  })

  it('should redirect to login', () => {
    window.location = { href: '' }
    login()
    expect(window.location.href).toMatchSnapshot()
  })
})

it('should get token with code', async () => {
  const token = await getToken('testcode')
  expect(token).toMatchSnapshot('testtoken')
})

it('should fail to get token with bad code', async () => {
  const token = await getToken('badcode')
  expect(token).toBeNull()
})

it('should fail to get token without code', async () => {
  const token = await getToken()
  expect(token).toBeNull()
})

it('should get repos with token', async () => {
  const repos = await getRepos('testtoken').data
  expect(repos).toMatchSnapshot()
  const gh = getGH()
  expect(gh.getToken()).toBe('testtoken')
  expect(gh.getUser).toBeCalled()
  expect(gh.listRepos).toBeCalled()
})

it('should fail when getting repos without token', async () => {
  await expect(getRepos()).rejects.toMatchSnapshot()
})

it('should create file', async () => {
  const result = await createFile('owner/repo', '.github/workflows/repo-sync.yml', '<yaml-body>')
  const gh = getGH()
  expect(gh.getUser).toBeCalled()
  expect(gh.getRepo).toBeCalledWith('owner/repo')
  expect(gh.writeFile).toBeCalled()
  expect(gh.writeFile).toMatchSnapshot()
  expect(result).toMatchSnapshot()
})

it('should fail to create file when repo is missing', async () => {
  await expect(createFile(undefined, '.github/workflows/repo-sync.yml', '<yaml-body>')).rejects.toMatchSnapshot()
  const gh = getGH()
  expect(gh.getUser).toBeCalled()
  expect(gh.getRepo).toBeCalledWith(undefined)
})
