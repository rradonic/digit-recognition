import { expect, test } from "@jest/globals";

import { readImages } from "../src/readImages.js";
import { TRAINING_IMAGE_FILE } from "../src/constants.js";

test("reading training data", async () => {
  const result = readImages(TRAINING_IMAGE_FILE);

  const dimensions = result.dimensions;
  const data = result.data as number[][][];

  expect(dimensions).toEqual([10000, 28, 28]);
  expect(data.length).toEqual(10000);
  expect(data[0].length).toEqual(28);
  expect(data[0][0].length).toEqual(28);

  expect(data[0][0]).toEqual([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  expect(data[0][7]).toEqual([
    0, 0, 0, 0, 0, 0, 84, 185, 159, 151, 60, 36, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
});

test("limit", async () => {
  const result = readImages(TRAINING_IMAGE_FILE, 3);

  const dimensions = result.dimensions;
  const data = result.data as number[][][];

  expect(dimensions).toEqual([3, 28, 28]);
  expect(data.length).toEqual(3);
  expect(data[0].length).toEqual(28);
  expect(data[0][0].length).toEqual(28);
});
