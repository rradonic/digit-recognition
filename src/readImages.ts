import fs from "node:fs";

export function readImages(filePath: string) {
  const buffer = fs.readFileSync(filePath);

  const { dimensions, dataStart } = readDimensions(buffer);

  const totalElements = dimensions.reduce((prod, size) => prod * size, 1);

  const data = [];

  for (let i = 0; i < totalElements; i++) {
    data.push(buffer.readUInt8(dataStart + i));
  }

  const reshapedData = reshape(data, dimensions);

  return {
    dimensions,
    data: reshapedData,
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

  return { dimensions, dataStart: offset };
}

function reshape(data: number[], dimensions: number[]) {
  if (dimensions.length === 1) {
    return data;
  }

  const size = dimensions[0];
  const subDims = dimensions.slice(1);
  const chunkSize = subDims.reduce((prod, size) => prod * size, 1);

  const reshaped = [];

  for (let i = 0; i < size; i++) {
    reshaped.push(
      reshape(data.slice(i * chunkSize, (i + 1) * chunkSize), subDims)
    );
  }

  return reshaped;
}

try {
  const idxFile = "./data/t10k-images-idx3-ubyte";
  const result = readImages(idxFile);

  console.log("Dimensions:", result.dimensions);
  console.log("Data:", result.data);
} catch (error) {
  console.error("Error reading IDX file:", error.message);
}
