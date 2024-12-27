import * as tf from "@tensorflow/tfjs";

export function sigmoid(z: tf.Tensor) {
  return tf.div(1.0, tf.add(1.0, tf.exp(tf.neg(z))));
}

export function sigmoidPrime(z: tf.Tensor) {
  return tf.mul(sigmoid(z), tf.sub(1, sigmoid(z)));
}
