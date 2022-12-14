export function createGrid(width, height) {
  let grid = [];

  for (let i = 0; i < height; i++) {
    let local = [];

    for (let j = 0; j < width; j++) {
      local.push({
        x: j,
        y: i,
        isstart: false,
        istarget: false,
        weight: 1,
        iswall: false,
      });
    }
    grid.push(local);
  }

  grid[Math.floor(height / 2)][Math.floor(width / 2)].isstart = true; //this set starting point for 2D array of objects
  grid[height - 25][width - 49].istarget = true; // this set target point for 2D array of objects

  return grid;
}
