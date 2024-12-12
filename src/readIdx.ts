import fs from "node:fs";

export function readIdx(filePath: string, limit: number = Number.MAX_SAFE_INTEGER) {
  const buffer = fs.readFileSync(filePath);
  const { dimensions, offset } = readDimensions(buffer);
  const limitedDimensions = [Math.min(dimensions[0], limit), ...dimensions.slice(1)];
  const totalElements = limitedDimensions.reduce((prod, size) => prod * size, 1);

  const data = [];

  for (let i = 0; i < totalElements; i++) {
    data.push(buffer.readUInt8(offset + i));
  }

  return {
    dimensions: limitedDimensions,
    data: reshape(data, limitedDimensions),
  };
}

function readDimensions(buffer: Buffer) {
  // the number of dimensions is stored in the last byte of the magic number
  const numDimensions = buffer.readUInt8(3);

  // dimensions start after the magic number
  let offset = 4;

  const dimensions = [];

  for (let i = 0; i < numDimensions; i++) {
    dimensions.push(buffer.readInt32BE(offset));
    offset += 4;
  }

  return { dimensions, offset };
}

type PixelArray = number | PixelArray[];

function reshape(data: number[], dimensions: number[]): PixelArray {
  if (dimensions.length === 1) {
    return data;
  }

  const size = dimensions[0];
  const subDimensions = dimensions.slice(1);
  const chunkSize = subDimensions.reduce((prod, size) => prod * size, 1);

  const reshaped = [];

  for (let i = 0; i < size; i++) {
    reshaped.push(reshape(data.slice(i * chunkSize, (i + 1) * chunkSize), subDimensions));
  }

  return reshaped;
}
