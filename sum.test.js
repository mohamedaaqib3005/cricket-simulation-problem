const { simulateBall } = require("./simulateBall");

describe("simulateBall()", () => {

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("kirat scores DOT when random is low", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.01);

    const result = simulateBall("kirat");

    expect(result).toBe(0);
  });

  test("kirat scores SINGLE when random is mid", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.2);

    const result = simulateBall("kirat");

    expect(result).toBe(1);
  });

  test("kirat gets OUT when random is high", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.98);

    const result = simulateBall("kirat");

    expect(result).toBe("W");
  });

});
