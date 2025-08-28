import { Post } from '@/types/notice_board_screen/post';
import { createContext, ReactNode, useContext, useState } from 'react';

type BoardDataContextType = {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};

const BoardDataContext = createContext<BoardDataContextType | null>(null);

export function BoardDataProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  return (
    <BoardDataContext.Provider value={{ posts, setPosts }}>{children}</BoardDataContext.Provider>
  );
}

export const useBoardData = () => {
  const context = useContext(BoardDataContext);
  if (!context) {
    throw new Error('useBoardData must be used within a BoardDataProvider');
  }
  return context;
};
