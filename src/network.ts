import { random, Matrix, matrix, row, dot, add, MathArray } from "mathjs";

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
      // const biases = new Array(this.sizes[i]);
      // biases.fill(3);
      // this.biases.push(matrix(biases));

      this.biases.push(matrix(random([this.sizes[i], 1])));
      this.weights.push(matrix(random([this.sizes[i], this.sizes[i - 1]])));
    }
  }

  feedForward(a: Matrix) {
    for (let i = 0; i < this.sizes.length - 1; i++) {
      const weights = this.weights[i];
      const biases = this.biases[i];

      const dotProducts = [];

      for (let j = 0; j < this.sizes[i + 1]; j++) {
        const r = row(weights, j);

        dotProducts.push(dot(r.toArray()[0] as MathArray, a.toArray()));
      }

      console.log("---");
      console.log(dotProducts);
      console.log(add(dotProducts, biases));

      a = sigmoid(matrix(dotProducts));
    }

    return a;
  }
}
