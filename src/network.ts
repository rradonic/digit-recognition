import * as tf from "@tensorflow/tfjs";

import { sigmoid } from "./sigmoid.js";

export class Network {
  numLayers: number;
  sizes: number[];
  weights: tf.Tensor[];
  biases: tf.Tensor[];

  constructor(sizes: number[]);
  constructor(sizes: number[], weights: tf.Tensor[], biases: tf.Tensor[]);

  constructor(sizes: number[], weights?: tf.Tensor[], biases?: tf.Tensor[]) {
    this.numLayers = sizes.length;
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
      this.weights.push(tf.randomNormal([this.sizes[i + 1], this.sizes[i]]));
    }
  }

  feedForward(a: tf.Tensor) {
    let layer = a;

    for (let i = 0; i < this.sizes.length - 1; i++) {
      layer = sigmoid(tf.add(tf.matMul(this.weights[i], layer), this.biases[i]));
    }

    return layer;
  }
}
