import { useRef, useState } from "react";

import { useParams } from "./context";

import { Coronavirus, EmojiFlags, FmdGood } from "@mui/icons-material";
import { Box } from "@mui/material";

export function GridBoard() {
  const { grid, setGrid, edit, setEdit, mode, run, reset, algo, start, end } = useParams()

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
            onMouseDown={() => {setEdit(true)}}
            onMouseUp={() => {setEdit(false)}}
            onMouseMove={() => {
              if (!edit) return;
              const current = grid[yidx][xidx];
              if (current.isstart || current.istarget) return;

              switch (mode) {
                case "setStart":
                  let newGrid = grid.map((element) => {
                    return element.map((item) => {
                      if (!item.isstart) return item;
                      return { ...item, isstart: false };
                    });
                  });

                  newGrid[yidx][xidx] = {
                    ...newGrid[yidx][xidx],
                    isstart: true,
                    istarget: false,
                    iswall: false,
                    weight: 1,
                  };

                  start.current = {x: xidx, y:yidx}
                  setGrid(newGrid);
                  break;
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
