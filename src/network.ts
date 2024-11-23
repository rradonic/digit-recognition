import { random, Matrix, matrix, dotMultiply, add } from "mathjs";

import { sigmoid } from "./sigmoid.js";

export class Network {
  numLayers: number;
  sizes: number[];
  biases: Matrix[];
  weights: Matrix[];

  constructor(sizes: number[]) {
    this.numLayers = sizes.length;
    this.sizes = sizes;

    this.weights = [];
    this.biases = [];

    for (let i = 1; i < this.sizes.length; i++) {
      this.biases.push(matrix(random([this.sizes[i], 1])));
      this.weights.push(matrix(random([this.sizes[i], this.sizes[i - 1]])));
    }
  }

  feedforward(a: Matrix) {
    for (let i = 1; i < this.sizes.length; i++) {
      a = sigmoid(add(dotMultiply(this.weights[i], a), this.biases[i]));
    }
  }

  // def feedforward(self, a):
  //       """Return the output of the network if "a" is input."""
  //       for b, w in zip(self.biases, self.weights):
  //           a = sigmoid(np.dot(w, a)+b)
  //       return a
}
