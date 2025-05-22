import { sumTest } from "../sumTest";

test("Description of the test: Sum Function should calculate the sum of two numbers", () => {
  // code to be tested
  //   const result = sumTest(2, 2);
  const result = sumTest(1, 2);
  // expected result or assertion
  expect(result).toBe(3);
});
