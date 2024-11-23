import { Matrix, map, exp } from "mathjs";

export function sigmoid(x: number): number;
export function sigmoid(x: Matrix): Matrix;

export function sigmoid(x: number | Matrix) {
  if (typeof x === "number") {
    return 1 / (1 + exp(-x));
  } else if (x instanceof Matrix) {
    return map(x, (el) => {
      return 1 / (1 + exp(-el));
    });
  }
}
