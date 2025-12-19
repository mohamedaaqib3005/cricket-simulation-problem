// simulate.test.js

const { simulateBall } = require("./simulate");

describe("simulateBall()", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("kirat scores DOT when random is low", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.01);
    expect(simulateBall("kirat")).toBe(0);
  });

  test("kirat scores SINGLE when random is mid", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.2);
    expect(simulateBall("kirat")).toBe(1);
  });

  test("kirat gets OUT when random is high", () => {
    jest.spyOn(Math, "random").mockReturnValue(0.98);
    expect(simulateBall("kirat")).toBe("W");
  });
});
