import * as tf from "@tensorflow/tfjs";

import { Network } from "./network.js";
import { readIdx } from "./readIdx.js";

import {
  TRAINING_IMAGE_FILE,
  TRAINING_LABEL_FILE,
  TEST_IMAGE_FILE,
  TEST_LABEL_FILE,
} from "./constants.js";

import type { TrainingPair, TestPair } from "./types.js";

tf.env().set("PROD", true);

const network = new Network([784, 30, 10]);

const trainingImages = readIdx(TRAINING_IMAGE_FILE);
const trainingLabels = readIdx(TRAINING_LABEL_FILE);

const trainingData = (trainingImages.data as number[][][]).map((image, i) => {
  const labelVector = new Array(10);

  for (let j = 0; j < 10; j++) {
    if (j === (trainingLabels.data as number[])[i]) {
      labelVector[j] = 1;
    } else {
      labelVector[j] = 0;
    }
  }

  return [
    tf.tensor(
      image.flat().map((el) => el / 255),
      [784, 1]
    ),
    tf.tensor(labelVector, [10, 1]),
  ] as TrainingPair;
});

const testImages = readIdx(TEST_IMAGE_FILE);
const testLabels = readIdx(TEST_LABEL_FILE);

const testData = (testImages.data as number[][][]).map((image, i) => {
  return [
    tf.tensor(
      image.flat().map((el) => el / 255),
      [784, 1]
    ),
    (testLabels.data as number[])[i],
  ] as TestPair;
});

network.stochasticGradientDescent(trainingData, 30, 10, 3.0, testData);
