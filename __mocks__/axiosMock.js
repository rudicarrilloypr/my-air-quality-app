// __mocks__/axiosMock.js
export default {
  get: jest.fn(() => Promise.resolve({ data: {} })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
  // ... puedes agregar otros métodos si lo necesitas
};
