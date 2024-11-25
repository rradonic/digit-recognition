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
      // this.biases.push(matrix(random([this.sizes[i], 1])));

      const biases = new Array(this.sizes[i]);
      biases.fill(3);
      this.biases.push(matrix(biases));

      this.weights.push(matrix(random([this.sizes[i], this.sizes[i - 1]])));
    }
  }

  feedForward(a: Matrix) {
    for (let i = 0; i < this.sizes.length; i++) {
      const weights = this.weights[i];
      const biases = this.biases[i];

      const dotProducts = [];

      for (let j = 0; j < this.sizes[i + 1]; j++) {
        console.log(j);
        const r = row(weights, j);

        console.log("###");
        console.log(r.toArray(), a.toArray());
        dotProducts.push(dot(r.toArray()[0] as MathArray, a.toArray()));
      }

      // const multiplied = row(weights, j)
      // return dot(row, a);

      console.log("---");
      console.log(weights);
      console.log(a);
      console.log(dotProducts);

      process.exit();

      // //dot(weights, a);
      // const added = add(multiplied, biases);

      // a = sigmoid(added);
    }
  }

  // def feedforward(self, a):
  //       """Return the output of the network if "a" is input."""
  //       for b, w in zip(self.biases, self.weights):
  //           a = sigmoid(np.dot(w, a)+b)
  //       return a
}
