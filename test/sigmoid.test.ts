import { expect, test } from "@jest/globals";

import { sigmoid, sigmoidPrime } from "../src/sigmoid.js";

test("read training images", () => {
  const result = sigmoid([-13, -4, -1.166, 0, 2, 7]) as number[];
  const resultPrime = sigmoidPrime([-13, -4, -1.166, 0, 2, 7]) as number[];

  expect(result[0]).toBeCloseTo(0.000002260324297893255, 12);
  expect(result[1]).toBeCloseTo(0.017986209962066745, 12);
  expect(result[2]).toBeCloseTo(0.23757876394687816, 12);
  expect(result[3]).toBeCloseTo(0.5, 12);
  expect(result[4]).toBeCloseTo(0.8807970779779563, 12);
  expect(result[5]).toBeCloseTo(0.9990889488056016, 12);

  expect(resultPrime[0]).toBeCloseTo(0.0000022603191888273233, 12);
  expect(resultPrime[1]).toBeCloseTo(0.017662706213267196, 12);
  expect(resultPrime[2]).toBeCloseTo(0.1811350948683517, 12);
  expect(resultPrime[3]).toBeCloseTo(0.25, 12);
  expect(resultPrime[4]).toBeCloseTo(0.1049935854034503, 12);
  expect(resultPrime[5]).toBeCloseTo(0.0009102211801195676, 12);
});
