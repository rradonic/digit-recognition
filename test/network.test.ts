import { jest, expect, test } from "@jest/globals";

import * as tf from "@tensorflow/tfjs";

test("feed forward", async () => {
  // mock the sigmoid function so we can test nice round numbers
  jest.unstable_mockModule("../src/sigmoid.js", () => ({
    sigmoid: jest.fn((x) => {
      return x;
    }),
  }));

  const { Network } = await import("../src/network.js");

  const network = new Network(
    [5, 4, 3],
    [
      tf.tensor([
        [2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2],
      ]),
      tf.tensor([
        [3, 3, 3, 3],
        [3, 3, 3, 3],
        [3, 3, 3, 3],
      ]),
    ],
    [tf.tensor([[3], [3], [3], [3]]), tf.tensor([[4], [4], [4]])]
  );

  const output = network.feedForward(tf.tensor([[1], [1], [1], [1], [1]]));

  expect(output.shape).toEqual([3, 1]);

  const outputArray = output.arraySync() as number[][];

  expect(outputArray[0][0]).toEqual(160);
  expect(outputArray[1][0]).toEqual(160);
  expect(outputArray[2][0]).toEqual(160);
});
