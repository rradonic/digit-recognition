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

        this.processMiniBatch(miniBatch, eta);
      }

      if (testData) {
        const evaluation = this.evaluate(testData);
        console.log(`Epoch ${i}: ${evaluation} / ${testData.length}`);
      } else {
        console.log(`Epoch ${i} complete`);
      }
    }
  }

  processMiniBatch(miniBatch: TrainingPair[], eta: number) {
    let nablaB = this.biases.map((b) => tf.zerosLike(b));
    let nablaW = this.weights.map((w) => tf.zerosLike(w));

    for (const [x, y] of miniBatch) {
      const [deltaNablaB, deltaNablaW] = this.backPropagate(x, y);

      nablaB = nablaB.map((nb, i) => tf.add(nb, deltaNablaB[i]));
      nablaW = nablaW.map((nw, i) => tf.add(nw, deltaNablaW[i]));
    }

    this.weights = this.weights.map((w, i) => tf.sub(w, tf.mul(eta / miniBatch.length, nablaW[i])));
    this.biases = this.biases.map((b, i) => tf.sub(b, tf.mul(eta / miniBatch.length, nablaB[i])));
  }

  backPropagate(x: tf.Tensor, y: tf.Tensor) {
    const nablaB = this.biases.map((b) => tf.zerosLike(b));
    const nablaW = this.weights.map((w) => tf.zerosLike(w));

    let activation = x;
    const activations = [x];
    const zs = [];

    for (let i = 0; i < this.biases.length; i++) {
      const z = tf.add(tf.matMul(this.weights[i], activation), this.biases[i]);

      zs.push(z);
      activation = sigmoid(z);
      activations.push(activation);
    }

    // BP equation 1 from the book
    const cd = this.costDerivative(activations[activations.length - 1], y);
    const sp = sigmoidPrime(zs[zs.length - 1]);
    let delta = tf.mul(cd, sp);

    // BP equation 3
    nablaB[nablaB.length - 1] = delta;

    // BP equation 4
    nablaW[nablaW.length - 1] = tf.matMul(delta, tf.transpose(activations[activations.length - 2]));

    for (let i = 2; i < this.sizes.length; i++) {
      const z = zs[zs.length - i];
      const sp = sigmoidPrime(z);

      // BP equation 2
      delta = tf.mul(tf.matMul(tf.transpose(this.weights[this.weights.length - i + 1]), delta), sp);

      nablaB[nablaB.length - i] = delta;
      nablaW[nablaW.length - i] = tf.matMul(
        delta,
        tf.transpose(activations[activations.length - i - 1])
      );
    }

    return [nablaB, nablaW];
  }

  costDerivative(outputActivations: tf.Tensor, y: tf.Tensor) {
    return tf.sub(outputActivations, y);
  }

  evaluate(testData: TestPair[]) {
    const testResults = testData.map(([x, y]) => {
      return [tf.argMax(this.feedForward(x)).dataSync()[0], y];
    });

    return testResults.reduce((sum, [x, y]) => sum + (x === y ? 1 : 0), 0);
  }
}
