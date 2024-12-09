Testing

- To run tests: `npm run test dist/test`

Mocking ESM modules

- You need to use jest.unstable_mockModule(), not jest.mock()

- You need to use a dynamic import() statement afterward in order to pick up the mocked module

Unmocking ESM modules

- Bleeding edge Jest (30.0.x) needed to get jest.unstable_unmockModule()

- After calling jest.unstable_unmockModule() you need to call jest.resetModules() to clear the
  module cache. After this dynamic imports will load the real module, not the mock.
