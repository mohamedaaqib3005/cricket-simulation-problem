const sum = require('./sum');

test('testmockfn', () => {
  const randomValue = 0.8
  const randomSpy = jest.spyOn(global.Math, 'random');

  randomSpy.mockReturnValue(randomValue)

  const expectedValue = 3 + randomValue + randomValue;

  const actualValue = sum(2, 1);
  expect(actualValue).toBe(expectedValue);
});