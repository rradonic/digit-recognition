import { jest, expect, test } from "@jest/globals";

import { matrix } from "mathjs";

test("feed forward", async () => {
  jest.unstable_mockModule("../src/sigmoid.js", () => ({
    sigmoid: jest.fn((x) => {
      return x;
    }),
  }));

  const { Network } = await import("../src/network.js");

  const network = new Network(
    [5, 4, 3],
    [
      matrix([
        [2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2],
      ]),
      matrix([
        [3, 3, 3, 3],
        [3, 3, 3, 3],
        [3, 3, 3, 3],
      ]),
    ],
    [matrix([3, 3, 3, 3]), matrix([4, 4, 4])]
  );

  const output = network.feedForward(matrix([1, 1, 1, 1, 1]));

  expect(output.size()).toEqual([3]);
  expect(output.toArray()[0]).toEqual(160);
  expect(output.toArray()[1]).toEqual(160);
  expect(output.toArray()[2]).toEqual(160);
});
