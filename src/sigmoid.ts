import { Matrix, map, exp, dotMultiply, subtract } from "mathjs";

export function sigmoid(x: Matrix | number[]) {
  return map(x, (el) => {
    return 1 / (1 + exp(-el));
  });
}

export function sigmoidPrime(x: Matrix | number[]) {
  return dotMultiply(sigmoid(x), subtract(1, sigmoid(x)));
}
