import { expect, test } from "@jest/globals";

import { readIdx } from "../src/readIdx.js";
import { TEST_IMAGE_FILE, TEST_LABEL_FILE } from "../src/constants.js";

test("read training images", async () => {
  const result = readIdx(TEST_IMAGE_FILE);

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

test("read training labels", async () => {
  const result = readIdx(TEST_LABEL_FILE);

  const dimensions = result.dimensions;
  const data = result.data as number[];

  expect(dimensions).toEqual([10000]);
  expect(data.length).toEqual(10000);

  expect(data.slice(0, 8)).toEqual([7, 2, 1, 0, 4, 1, 4, 9]);
});

test("limit argument", async () => {
  const result = readIdx(TEST_IMAGE_FILE, 3);

  const dimensions = result.dimensions;
  const data = result.data as number[][][];

  expect(dimensions).toEqual([3, 28, 28]);
  expect(data.length).toEqual(3);
  expect(data[0].length).toEqual(28);
  expect(data[0][0].length).toEqual(28);
});
