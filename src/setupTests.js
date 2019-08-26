const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
}
global.sessionStorage = sessionStorageMock

global.CLIENT_ID = 'test_client_id'
global.AUTH_ENDPOINT = '/authenticate/'
