import { jest, expect, test } from "@jest/globals";

import { PPM_DIRECTORY } from "../src/constants.js";

test("writing PPM files", async () => {
  const output = new Map<string, string>();

  const originalFsModule = await import("node:fs");

  jest.unstable_mockModule("node:fs", () => ({
    default: {
      ...originalFsModule,
      writeFileSync: (path: string, content: string) => {
        output.set(path, content);
      },
    },
  }));

  jest.unstable_mockModule("../src/readIdx.js", () => ({
    readIdx: () => {
      return {
        dimensions: [2, 2, 3],
        data: [
          [
            [1, 2, 3],
            [4, 5, 6],
          ],
          [
            [7, 8, 9],
            [10, 11, 12],
          ],
        ],
      };
    },
  }));

  const { writeImagesToPpm } = await import("../src/writeImagesToPpm.js");

  // silence console output, we don't need to see progress indicators from writeImagesToPpm here
  const original = console.log;

  console.log = jest.fn();
  writeImagesToPpm(PPM_DIRECTORY);
  console.log = original;

  const header = "P3\n28 28\n255\n";
  const pixels1 = "1 1 1\n2 2 2\n3 3 3\n4 4 4\n5 5 5\n6 6 6\n";
  const pixels2 = "7 7 7\n8 8 8\n9 9 9\n10 10 10\n11 11 11\n12 12 12\n";

  expect([...output.keys()].length).toEqual(2);
  expect(output.get(`${PPM_DIRECTORY}/1.ppm`)).toEqual(header + pixels1);
  expect(output.get(`${PPM_DIRECTORY}/2.ppm`)).toEqual(header + pixels2);
});
