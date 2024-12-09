import { random, Matrix, matrix, multiply, add } from "mathjs";

import { sigmoid } from "./sigmoid.js";

export class Network {
  numLayers: number;
  sizes: number[];
  weights: Matrix[];
  biases: Matrix[];

  constructor(sizes: number[]);
  constructor(sizes: number[], weights: Matrix[], biases: Matrix[]);

  constructor(sizes: number[], weights?: Matrix[], biases?: Matrix[]) {
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
      this.biases.push(matrix(random([this.sizes[i], 1])));
      this.weights.push(matrix(random([this.sizes[i], this.sizes[i - 1]])));
    }
  }

  feedForward(a: Matrix) {
    for (let i = 0; i < this.sizes.length - 1; i++) {
      const weights = this.weights[i];
      const biases = this.biases[i];

      a = sigmoid(add(multiply(weights, a), biases) as Matrix);
    }

    return a;
  }
}
