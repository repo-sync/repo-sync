export default {
  get: jest.fn((url) => {
    if (url.match(/\/authenticate\/testcode/)) {
      return Promise.resolve({
        data: 'access_token=testtoken&scope=user,repos'
      })
    }

    return Promise.resolve({})
  })
}
