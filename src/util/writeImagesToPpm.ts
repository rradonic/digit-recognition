import { readImages } from "../readImages.js";
import { TRAINING_IMAGE_FILE, PPM_DIRECTORY } from "../../src/constants.js";

function writeImagesToPpm(outputDirectory: string) {
  const result = readImages(TRAINING_IMAGE_FILE, 3);

  console.log(`../../${PPM_DIRECTORY}`);
  console.table(result);
}

writeImagesToPpm(`../../${PPM_DIRECTORY}`);
