import { createContext, useContext, useState } from 'react';

const BoardParamsContext = createContext<any>(null);

export function BoardParamsProvider({ children }) {
  const [params, setParams] = useState({});
  return (
    <BoardParamsContext.Provider value={{ params, setParams }}>
      {children}
    </BoardParamsContext.Provider>
  );
}

export const useBoardParams = () => useContext(BoardParamsContext);
