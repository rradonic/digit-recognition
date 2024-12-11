import { expect, test } from "@jest/globals";

import { readLabels } from "../src/readLabels.js";
import { TRAINING_LABEL_FILE } from "../src/constants.js";

test("reading training data", async () => {
  const result = readLabels(TRAINING_LABEL_FILE);

  const dimensions = result.dimensions;
  const data = result.data;

  expect(dimensions).toEqual([10000]);
  expect(data.length).toEqual(10000);

  expect(data.slice(0, 8)).toEqual([7, 2, 1, 0, 4, 1, 4, 9]);
});

// test("limit", async () => {
//   const result = readImages(TRAINING_IMAGE_FILE, 3);

//   const dimensions = result.dimensions;
//   const data = result.data as number[][][];

//   expect(dimensions).toEqual([3, 28, 28]);
//   expect(data.length).toEqual(3);
//   expect(data[0].length).toEqual(28);
//   expect(data[0][0].length).toEqual(28);
// });
