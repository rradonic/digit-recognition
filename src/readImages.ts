import fs from "node:fs";

function readIDX(filePath: string) {
  const buffer = fs.readFileSync(filePath);

  // Read the magic number
  const magicNumber = buffer.readUInt16BE(0); // First 2 bytes
  if (magicNumber !== 0) {
    throw new Error("Invalid IDX file: Magic number mismatch.");
  }

  const numDimensions = buffer.readUInt8(3); // Fourth byte

  const typeInfo = {
    size: 1,
    read: (buf, offset) => buf.readUInt8(offset),
  };

  // Read dimension sizes
  let offset = 4; // Start reading sizes after the magic number
  const dimensions = [];
  for (let i = 0; i < numDimensions; i++) {
    dimensions.push(buffer.readInt32BE(offset));
    offset += 4;
  }

  const totalElements = dimensions.reduce((prod, size) => prod * size, 1);

  // Read data
  const data = [];
  for (let i = 0; i < totalElements; i++) {
    data.push(typeInfo.read(buffer, offset));
    offset += typeInfo.size;
  }

  // Reshape data into multidimensional array
  function reshape(data, dims) {
    if (dims.length === 1) return data;
    const size = dims[0];
    const subDims = dims.slice(1);
    const chunkSize = subDims.reduce((prod, size) => prod * size, 1);

    const reshaped = [];
    for (let i = 0; i < size; i++) {
      reshaped.push(
        reshape(data.slice(i * chunkSize, (i + 1) * chunkSize), subDims)
      );
    }
    return reshaped;
  }

  const reshapedData = reshape(data, dimensions);

  return {
    dimensions,
    data: reshapedData,
  };
}

// Example usage
try {
  const idxFile = "./data/t10k-images-idx3-ubyte";
  const result = readIDX(idxFile);

  console.log("Dimensions:", result.dimensions);
  console.log("Data:", result.data);
} catch (error) {
  console.error("Error reading IDX file:", error.message);
}
