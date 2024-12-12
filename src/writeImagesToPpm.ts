import fs from "node:fs";

import { readIdx } from "./readIdx.js";
import { TRAINING_IMAGE_FILE } from "./constants.js";

export function writeImagesToPpm(outputDirectory: string, limit?: number) {
  const result = readIdx(TRAINING_IMAGE_FILE, limit);

  const data = result.data as number[][][];

  fs.mkdirSync(outputDirectory, { recursive: true });

  data.forEach((values, i) => {
    console.log(`Writing image ${i + 1}`);

    const header = `P3\n28 28\n255\n`;

    const pixels = values
      .map((line) => line.map((value) => `${value} ${value} ${value}`))
      .flat()
      .reduce((s, value) => s + value + "\n", "");

    fs.writeFileSync(`${outputDirectory}/${i + 1}.ppm`, header + pixels);
  });
}
