import { useRef, useState } from "react";

import { useParams } from "./context";

import { Coronavirus, EmojiFlags, FmdGood } from "@mui/icons-material";
import { Box } from "@mui/material";

export function GridBoard() {
  const { grid, setGrid, edit, setEdit, mode, run, reset, algo, start, end } =
    useParams();

  const [refArray, setRefArray] = useState(makeRefArray(grid));

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
              if (current.isstart || current.istarget) return;

              switch (mode) {
                case "setStart":
                  let newGridStart = grid.map((element) => {
                    return element.map((item) => {
                      if (!item.isstart) return item;
                      return { ...item, isstart: false };
                    });
                  });

                  newGridStart[yidx][xidx] = {
                    ...newGridStart[yidx][xidx],
                    isstart: true,
                    istarget: false,
                    iswall: false,
                    weight: 1,
                  };

                  start.current = { x: xidx, y: yidx };
                  setGrid(newGridStart);
                  break;

                case "setTarget":
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
                  let newGridBrick = grid.slice();

                  newGridBrick[yidx][xidx] = {
                    ...newGridBrick[yidx][xidx],
                    isstart: false,
                    istarget: false,
                    iswall: true,
                    weight: 1,
                  };

                  setGrid(newGridBrick);
                  break;

                case "addWeight":
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
