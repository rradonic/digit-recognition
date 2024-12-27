import * as tf from "@tensorflow/tfjs";

export type TrainingPair = [tf.Tensor, tf.Tensor];
export type TestPair = [tf.Tensor, number];
