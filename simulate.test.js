const {
  simulateBall,
  simulateMatch,
  createInitialGameState
} = require("./simulate");

describe("createInitialGameState()", () => {
  test("returns correct initial structure", () => {
    const state = createInitialGameState();

    expect(state.target).toBe(40);
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
    jest.spyOn(Math, "random").mockReturnValue(0.5);

    const outcome = simulateBall("kirat");

    expect([0, 1, 2, 3, 4, 5, 6, "W"]).toContain(outcome);
  });

  test("returns wicket when random falls in wicket range", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.999);

    const outcome = simulateBall("shashi");

    expect(outcome).toBe("W");
  });
});

describe("simulateMatch()", () => {
  test("Bangalore wins when target is achieved", () => {
    // Every ball scores 6 → target reached quickly
    const mockBall = jest.fn().mockReturnValue(6);

    const result = simulateMatch(mockBall);

    expect(result.result).toMatch(/Bangalore won/);
  });

  test("Chennai wins when all batsmen are out", () => {
    // Every ball is a wicket
    const mockBall = jest.fn().mockReturnValue("W");

    const result = simulateMatch(mockBall);

    expect(result.result).toBe("Chennai won ");
  });

  test("match stops after 24 balls if target not reached", () => {
    const mockBall = jest.fn().mockReturnValue(0);

    const result = simulateMatch(mockBall);

    // No one scores runs
    expect(result.result).toBe("Chennai won ");

    const totalBalls = Object.values(result.players)
      .reduce((sum, p) => sum + p.balls, 0);

    expect(totalBalls).toBe(24);
  });

  test("returns players scorecard with runs and balls", () => {
    const mockBall = jest.fn().mockReturnValue(1);

    const result = simulateMatch(mockBall);

    expect(result.players).toBeDefined();

    for (const player of Object.values(result.players)) {
      expect(player).toHaveProperty("runs");
      expect(player).toHaveProperty("balls");
    }
  });
});

// do unit testing for simulate over
// do unit testing for simulate match
//cypress (userflow)



