import * as tf from "@tensorflow/tfjs";

import { sigmoid, sigmoidPrime } from "./sigmoid.js";
import type { TrainingPair, TestPair } from "./types.js";

export class Network {
  sizes: number[];
  weights: tf.Tensor[];
  biases: tf.Tensor[];

  constructor(sizes: number[]);
  constructor(sizes: number[], weights: tf.Tensor[], biases: tf.Tensor[]);

  constructor(sizes: number[], weights?: tf.Tensor[], biases?: tf.Tensor[]) {
    this.sizes = sizes;

    if (weights && biases) {
      this.weights = weights;
      this.biases = biases;

      return;
    }

    this.weights = [];
    this.biases = [];

    for (let i = 1; i < this.sizes.length; i++) {
      this.biases.push(tf.randomNormal([this.sizes[i], 1]));
      this.weights.push(tf.randomNormal([this.sizes[i], this.sizes[i - 1]]));
    }
  }

  feedForward(a: tf.Tensor) {
    let layer = a;

    for (let i = 0; i < this.sizes.length - 1; i++) {
      layer = sigmoid(tf.add(tf.matMul(this.weights[i], layer), this.biases[i]));
    }

    return layer;
  }

  stochasticGradientDescent(
    trainingData: TrainingPair[],
    epochs: number,
    miniBatchSize: number,
    eta: number,
    testData?: TestPair[]
  ) {
    for (let i = 0; i < epochs; i++) {
      tf.util.shuffle(trainingData);

      for (let j = 0; j < trainingData.length; j += miniBatchSize) {
        const miniBatch = trainingData.slice(j, j + miniBatchSize);

        console.log(`Mini batch starting at ${j}`);
        this.processMiniBatch(miniBatch, eta);
      }

      // TODO
      // if (testData) {
      //   const evaluation = this.evaluate(testData);
      //   console.log(`Epoch ${i}: ${evaluation} / ${testData.length}`);
      // } else {
      //   console.log(`Epoch ${i} complete`);
      // }
    }
  }

  processMiniBatch(miniBatch: TrainingPair[], eta: number) {
    let nablaB = this.biases.map((b) => tf.zerosLike(b));
    let nablaW = this.weights.map((w) => tf.zerosLike(w));

    for (const [x, y] of miniBatch) {
      const [deltaNablaB, deltaNablaW] = this.backprop(x, y);

      nablaB = nablaB.map((nb, i) => tf.add(nb, deltaNablaB[i]));
      nablaW = nablaW.map((nw, i) => tf.add(nw, deltaNablaW[i]));
    }

    this.weights = this.weights.map((w, i) => tf.sub(w, tf.mul(eta / miniBatch.length, nablaW[i])));
    this.biases = this.biases.map((b, i) => tf.sub(b, tf.mul(eta / miniBatch.length, nablaB[i])));
  }
}
