import { expect, test, jest } from "@jest/globals";

import { shuffle } from "../src/shuffle.js";

test("shuffle", async () => {
  const array1 = [1, 2, 3, 4, 5];
  const array2 = [1, 2, 3, 4, 5];

  shuffle(
    array1,
    jest.fn(() => {
      return 0.2;
    })
  );

  expect(array1).toEqual([5, 3, 4, 1, 2]);

  shuffle(
    array2,
    jest.fn(() => {
      return 0.55;
    })
  );

  expect(array2).toEqual([1, 4, 2, 5, 3]);
});
