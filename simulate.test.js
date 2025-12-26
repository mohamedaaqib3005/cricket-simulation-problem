const {
  simulateOver,
  simulateMatch,
  createInitialGameState
} = require("./simulate");

describe("simulateOver()", () => {
  test("over continues after a wicket", () => {
    const mockBall = jest
      .fn()
      .mockReturnValueOnce(1)
      .mockReturnValueOnce("W")
      .mockReturnValue(0);

    const gameState = createInitialGameState();
    const result = simulateOver(gameState, mockBall);

    expect(mockBall).toHaveBeenCalledTimes(6);
    expect(result.wicketsLeft).toBe(3);
  });
});

describe("simulateMatch()", () => {
  test("Bangalore wins when target is achieved", () => {
    const mockBall = jest.fn().mockReturnValue(6);

    const result = simulateMatch(mockBall);

    expect(result.result).toMatch(/Bangalore won/);
  });

  test("Chennai wins when wickets fall first", () => {
    const mockBall = jest.fn().mockReturnValue("W");

    const result = simulateMatch(mockBall);

    expect(result.result).toBe("Chennai won ");
  });
});


// do unit testing for simulate over
// do unit testing for simulate match
//cypress (userflow)



