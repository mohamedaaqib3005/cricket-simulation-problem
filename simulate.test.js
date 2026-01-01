const {
  simulateBall,
  simulateOver,
  simulateMatch,
  createInitialGameState
} = require("./simulate");

describe("createInitialGameState()", () => {
  test("returns correct initial structure", () => {
    const state = createInitialGameState();

    expect(state.target).toBe(40);
    expect(state.overs).toBe(4);
    expect(state.battingOrder).toEqual([
      "kirat",
      "nodhi",
      "rumrah",
      "shashi"
    ]);
    expect(state.strikerIndex).toBe(0);
    expect(state.nonStrikerIndex).toBe(1);
    expect(state.nextBatsmanIndex).toBe(2);

    for (const player of state.battingOrder) {
      expect(state.players[player]).toEqual({ runs: 0, balls: 0 });
    }
  });
});

describe("simulateBall()", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("returns a valid outcome", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.99); // force last bucket

    const outcome = simulateBall("kirat");

    expect([0, 1, 2, 3, 4, 5, 6, "W"]).toContain(outcome);
  });

  test("returns wicket when random falls in wicket range", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.999);

    const outcome = simulateBall("shashi");
    expect(outcome).toBe("W");
  });
});

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

    const wicketsRemaining =
      result.battingOrder.length - result.nextBatsmanIndex;

    expect(wicketsRemaining).toBe(1);
  });

  test("over ends early if innings ends", () => {
    const mockBall = jest.fn().mockReturnValue("W");

    const gameState = createInitialGameState();
    const result = simulateOver(gameState, mockBall);

    expect(result.nextBatsmanIndex).toBe(result.battingOrder.length);
  });
});

describe("simulateMatch()", () => {
  test("Bangalore wins when target is achieved", () => {
    const mockBall = jest.fn().mockReturnValue(6);

    const result = simulateMatch(mockBall);

    expect(result.result).toMatch(/Bangalore won/);
  });

  test("Chennai wins when all batsmen are out", () => {
    const mockBall = jest.fn().mockReturnValue("W");

    const result = simulateMatch(mockBall);

    expect(result.result).toBe("Chennai won ");
  });

  test("returns players scorecard", () => {
    const mockBall = jest.fn().mockReturnValue(0);

    const result = simulateMatch(mockBall);

    expect(result.players).toBeDefined();
    expect(result.players.kirat).toHaveProperty("runs");
    expect(result.players.kirat).toHaveProperty("balls");
  });
});


// do unit testing for simulate over
// do unit testing for simulate match
//cypress (userflow)



