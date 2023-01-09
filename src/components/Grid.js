import { useEffect, useRef, useState } from "react";

import { useParams } from "./context";
import { aStar, BFS, DFS, Dijkstra } from "./pathAlgos";
import { randomInt } from "./startGrid";

import { EmojiFlags, FmdGood } from "@mui/icons-material";
import { Box } from "@mui/material";

export function GridBoard() {
  const { grid, setGrid, edit, setEdit, mode, run, reset, algo, start, end } = useParams();

  const [refArray, setRefArray] = useState(makeRefArray(grid));

  useEffect(() => {
    const hashmap = {};
    const prevmap = {};

    for (let i = 0; i < 26; i++) {
      for (let j = 0; j < 50; j++) {
        hashmap[`${j}-${i}`] = false;
        prevmap[`${j}-${i}`] = null;
      }
    }

    if (algo === "BFS") {
      let result = BFS(grid, hashmap, prevmap, start.current, end.current, refArray);

      const path = [];

      if (result != null) {
        let current = result[0];

        while (prevmap[`${current.x}-${current.y}`] != null) {
          path.unshift(current);
          current = prevmap[`${current.x}-${current.y}`];
        }

        setTimeout(() => {
          if (prevmap[`${current.x}-${current.y}`] === null) {
            refArray[current.x + current.y * 50].current.classList.add("path"); //exception due to starting point in prevmap is null so we add path class to change color
          }

          path.forEach((elem, index) => {
            refArray[elem.x + elem.y * 50].current.style["transition-delay"] = `${index * 10}ms`;
            refArray[elem.x + elem.y * 50].current.classList.add("path");
          });
        }, result[1] * 8);
      }
    }

    if (algo === "DFS") {
      let result = DFS(grid, hashmap, prevmap, start.current, end.current, refArray);

      const path = [];

      if (result !== null) {
        let current = result[0];

        while (prevmap[`${current.x}-${current.y}`] !== null) {
          path.unshift(current);
          current = prevmap[`${current.x}-${current.y}`];
        }

        setTimeout(() => {
          if (prevmap[`${current.x}-${current.y}`] === null) {
            refArray[current.x + current.y * 50].current.classList.add("path"); //exception due to starting point in prevmap is null so we add path class to change color
          }

          path.forEach((element, idx) => {
            refArray[element.x + element.y * 50].current.style["transition-delay"] = `${idx * 10}ms`;
            refArray[element.x + element.y * 50].current.classList.add("path");
          });
        }, result[1] * 8);
      }
    }

    if (algo === "Dijkstra") {
      let result = Dijkstra(grid, hashmap, prevmap, start.current, end.current, refArray);

      const path = [];

      if (result !== null) {
        let current = result[0];

        while (prevmap[`${current.x}-${current.y}`] !== null) {
          path.unshift(current);
          current = prevmap[`${current.x}-${current.y}`];
        }

        setTimeout(() => {
          if (prevmap[`${current.x}-${current.y}`] === null) {
            refArray[current.x + current.y * 50].current.classList.add("path");
          }

          path.forEach((element, idx) => {
            refArray[element.x + element.y * 50].current.style["transition-delay"] = `${idx * 10}ms`;
            refArray[element.x + element.y * 50].current.classList.add("path");
          });
        }, result[1] * 8);
      }
    }

    if (algo === "A*") {
      let result = aStar(grid, hashmap, prevmap, start.current, end.current, refArray);

      const path = [];

      if (result !== null) {
        let current = result[0];

        while (prevmap[`${current.x}-${current.y}`] !== null) {
          path.unshift(current);
          current = prevmap[`${current.x}-${current.y}`];
        }

        setTimeout(() => {
          if (prevmap[`${current.x}-${current.y}`] === null) {
            refArray[current.x + current.y * 50].current.classList.add("path");
          }

          path.forEach((element, idx) => {
            refArray[element.x + element.y * 50].current.style["transition-delay"] = `${idx * 10}ms`;
            refArray[element.x + element.y * 50].current.classList.add("path");
          });
        }, result[1] * 8);
      }
    }
  }, [run]);

  useEffect(() => {
    refArray.forEach((element) => {
      element.current.style["transition-delay"] = "0ms";
      element.current.classList.remove("visited");
      element.current.classList.remove("path");
    });
  }, [reset]);

  return (
    <Box component="div" className="board">
      {refArray.map((elem, idx) => {
        const clases = ["cell"];

        let yidx = Math.floor(idx / 50);
        let xidx = idx % 50;
        let cell = grid[yidx][xidx];

        if (cell.iswall) {
          clases.push("wall");
        }

        return (
          <div
            key={idx}
            ref={elem}
            className={clases.join("")}
            onMouseDown={() => {
              setEdit(true);
            }}
            onTouchStart={() => {
              setEdit(true)
              newParams(edit, grid, setGrid, xidx, yidx, mode, start, end);
            }}
            onTouchEnd={() => {
              setEdit(false)
            }}
            onMouseUp={() => {
              setEdit(false);
            }}
            onMouseMove={() => {
              newParams(edit, grid, setGrid, xidx, yidx, mode, start, end);
            }}>
            {cell.weight > 0 && (algo === "Dijkstra" || algo === "A*") ? cell.weight : null}
            {cell.isstart ? <FmdGood /> : null}
            {cell.istarget ? <EmojiFlags /> : null}
          </div>
        );
      })}
    </Box>
  );
}

function makeRefArray(grid) {
  const array = [];

  grid.forEach((element) => {
    element.forEach((child) => {
      array.push(useRef());
    });
  });

  return array;
}

function newParams(edit, grid, setGrid, xidx, yidx, mode, start, end) {
  if (!edit) return;
  const current = grid[yidx][xidx];
  if (current.isstart || current.istarget) return; // prevents form adding walls and weight on start and target cells

  switch (mode) {
    case "setStart":
      //Make new clear grid with all values to false
      let newGridStart = grid.map((element) => {
        return element.map((item) => {
          if (!item.isstart) return item;
          return { ...item, isstart: false, weight: randomInt(1, 5) };
        });
      });

      //Give this clear grid new start value based on his index
      newGridStart[yidx][xidx] = {
        ...newGridStart[yidx][xidx],
        isstart: true,
        istarget: false,
        iswall: false,
        weight: 0,
      };

      // Set updated values of new grid
      start.current = { x: xidx, y: yidx, weight: 0 };
      setGrid(newGridStart);
      break;

    case "setTarget":
      //Here we have same proceure as above but for target
      let newGridTarget = grid.map((element) => {
        return element.map((item) => {
          if (!item.istarget) return item;
          return { ...item, istarget: false, weight: randomInt(1, 5) };
        });
      });

      newGridTarget[yidx][xidx] = {
        ...newGridTarget[yidx][xidx],
        isstart: false,
        istarget: true,
        iswall: false,
        weight: 0,
      };

      end.current = { x: xidx, y: yidx, weight: 0 };
      setGrid(newGridTarget);
      break;

    case "addBricks":
      //Make a shallow coppy of grid
      let newGridBrick = grid.slice();

      //Set wall on new shallow copy based on y and x index
      newGridBrick[yidx][xidx] = {
        ...newGridBrick[yidx][xidx],
        isstart: false,
        istarget: false,
        iswall: true,
        weight: 1,
      };

      //Set shallow copy of grid with added wall as a new grid
      setGrid(newGridBrick);
      break;

    default:
      return;
  }
}
