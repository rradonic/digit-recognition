import { expect, test } from "@jest/globals";

import { readImages } from "../src/readImages.js";

test("reading training data", async () => {
  const idxFile = "./data/t10k-images-idx3-ubyte";
  const result = readImages(idxFile);

  const dimensions = result.dimensions;
  const data = result.data as number[][][];

  expect(dimensions).toEqual([10000, 28, 28]);
  expect(data.length).toEqual(10000);
  expect(data[0].length).toEqual(28);
  expect(data[0][0].length).toEqual(28);
});
