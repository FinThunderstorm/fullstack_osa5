import '@testing-library/jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
}
global.localStorage = localStorageMock