import { useEffect, useRef, useState } from "react";

import { useParams } from "./context";
import { BFS } from "./pathAlgos";

import { Coronavirus, EmojiFlags, FmdGood } from "@mui/icons-material";
import { Box } from "@mui/material";

export function GridBoard() {
  const { grid, setGrid, edit, setEdit, mode, run, reset, algo, start, end } = useParams()

  const [refArray, setRefArray] = useState(makeRefArray(grid));

  useEffect(() => {
    if (algo === "BFS") {
      const hashmap = {};
      const prevmap = {};

      for (let i = 0; i < 26; i++) {
        for (let j = 0; j < 50; j++) {
          hashmap[`${j}-${i}`] = false;
          prevmap[`${j}-${i}`] = null;
        }
      }

      let result = BFS(
        grid,
        hashmap,
        prevmap,
        start.current,
        end.current,
        refArray
      );
      const path = [];

      if (result != null) {
        let current = result[0];

        while (prevmap[`${current.x}-${current.y}`] != null) {
          console.log(current, prevmap[`${current.x}-${current.y}`]);
          path.push(current);
          current = prevmap[`${current.x}-${current.y}`];
        }

        setTimeout(() => {
          path.reverse().forEach((elem, index) => {
            refArray[elem.x + elem.y * 50].current.style[
              "transition-delay"
            ] = `${index * 15}ms`;
            refArray[elem.x + elem.y * 50].current.classList.add("path");
          });
        }, result[1] * 9);
      }
      console.log(path);
    }
  }, [run]);
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
            onMouseUp={() => {
              setEdit(false);
            }}
            onMouseMove={() => {
              if (!edit) return;
              const current = grid[yidx][xidx];
              if (current.isstart || current.istarget) return; // prevents form adding walls and weight on start and target cells

              switch (mode) {
                case "setStart":
                  //Make new clear grid with all values to false
                  let newGridStart = grid.map((element) => {
                    return element.map((item) => {
                      if (!item.isstart) return item;
                      return { ...item, isstart: false };
                    });
                  });

                  //Give this clear grid new start value based on his index
                  newGridStart[yidx][xidx] = {
                    ...newGridStart[yidx][xidx],
                    isstart: true,
                    istarget: false,
                    iswall: false,
                    weight: 1,
                  };

                  // Set updated values of new grid
                  start.current = { x: xidx, y: yidx };
                  setGrid(newGridStart);
                  break;

                case "setTarget":
                  //Here we have same proceure as above but for target
                  let newGridTarget = grid.map((element) => {
                    return element.map((item) => {
                      if (!item.istarget) return item;
                      return { ...item, istarget: false };
                    });
                  });

                  newGridTarget[yidx][xidx] = {
                    ...newGridTarget[yidx][xidx],
                    isstart: false,
                    istarget: true,
                    iswall: false,
                    weight: 1,
                  };

                  end.current = { x: xidx, y: yidx };
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

                case "addWeight":
                  //Same procedure as above but for weight
                  let newGridWeight = grid.slice();

                  newGridWeight[yidx][xidx] = {
                    ...newGridWeight[yidx][xidx],
                    isstart: false,
                    istarget: false,
                    iswall: false,
                    weight: 5,
                  };

                  setGrid(newGridWeight);
                  break;

                default:
                  return;
              }
            }}>
            {cell.weight > 1 ? <Coronavirus /> : null}
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
