import { createContext, ReactNode, useContext, useState } from 'react';

const BoardParamsContext = createContext<any>(null);

export function BoardParamsProvider({ children }: { children: ReactNode }) {
  const [params, setParams] = useState({});
  return (
    <BoardParamsContext.Provider value={{ params, setParams }}>
      {children}
    </BoardParamsContext.Provider>
  );
}

export const useBoardParams = () => useContext(BoardParamsContext);
