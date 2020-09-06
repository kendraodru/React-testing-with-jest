import { sum } from "./practice_files";

describe("sum", () => {
  test("sums up two values", () => {
    expect(sum(2, 4)).toBe(6);
  });
});
