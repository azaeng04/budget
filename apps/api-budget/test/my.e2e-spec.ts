import * as myFunc from './module';

jest.mock('./module', () => {
  const actual = jest.requireActual<typeof import('./module')>('./module');

  return {
    ...actual,
    spyOnMe: jest.fn(),
  }
})

describe.only(`Test spying`, () => {
  test('should ', async () => {
    myFunc.myFunc();

    expect(myFunc.spyOnMe).toHaveBeenCalled();
  });
});
