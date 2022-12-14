import { useContext, createContext, useState, useRef, useEffect } from "react";

import { createGrid } from "./startGrid";

const context = createContext();

export const useParams = () =>  {
  return useContext(context);
};

export const ParamsProvider = ({ children }) => {
  const [mode, setMode] = useState(null);
  const [algo, setAlgo] = useState("");
  const [run, setRun] = useState(false);
  const [grid, setGrid] = useState(createGrid(50, 26));
  const [edit, setEdit] = useState(false);
  const [reset, setReset] = useState(false);
  const start = useRef({ x: 25, y: 13, weight: 0 });
  const end = useRef({ x: 1, y: 1, weight: 0 });

  const resetGrid = () => {
    setGrid(createGrid(50, 26));
  };

  useEffect(() => {
    resetGrid();
    start.current = { x: 25, y: 13, weight: 0 };
    end.current = { x: 1, y: 1, weight: 0 };
  }, [reset]);

  return (
    <div>
      <context.Provider
        value={{
          mode,
          setMode,
          algo,
          setAlgo,
          run,
          setRun,
          grid,
          setGrid,
          edit,
          setEdit,
          reset,
          setReset,
          start,
          end,
        }}>
        {children}
      </context.Provider>
    </div>
  );
};
