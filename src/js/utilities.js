export const rotateMatrix = (matrix) => {
  let rows = matrix.length;
  let cols = matrix[0].length;
  let rotated = [];

  for (let col = 0; col < cols; col++) {
    rotated[col] = [];
    for (let row = rows - 1; row >= 0; row--) {
      rotated[col][rows - 1 - row] = matrix[row][col];
    }
  }

  return rotated;
};
