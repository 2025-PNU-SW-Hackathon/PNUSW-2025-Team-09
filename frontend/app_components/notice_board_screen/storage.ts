import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AttachedFile } from '@/app_components/notice_board_screen/create/AttachedFilesList';

export type BoardSelection = '반 별 게시판' | '부 별 게시판';

export type Comment = {
  id: string;
  content: string;
  createdAt: Date;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  selection: BoardSelection; // 반 별 or 부 별
  filter1: string;
  filter2: string;
  attachments?: AttachedFile[];
  comments: Comment[];
};

const KEY = '@notice_posts_v1';

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function getPosts(): Promise<Post[]> {
  const raw = await AsyncStorage.getItem(KEY);
  const list = safeParse<Post[]>(raw, []);
  return list.sort((a, b) => b.createdAt - a.createdAt);
}

export async function createPost(input: Omit<Post, 'id' | 'createdAt'>): Promise<Post> {
  const list = await getPosts();
  const newPost: Post = {
    ...input,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: input.title.trim(),
    content: input.content.trim(),
    comments: [],
    createdAt: Date.now(),
  };
  const updatedList = [newPost, ...list];
  await AsyncStorage.setItem(KEY, JSON.stringify(updatedList));

  return newPost;
}

// selectedTab이 '전체'거나 filter1/2가 '전체'면 해당 조건은 무시
export async function getPostsBy(
  selectedTab?: '반' | '부' | '전체',
  filter1?: string,
  filter2?: string,
): Promise<Post[]> {
  const list = await getPosts();
  let filtered = list;
  if (selectedTab && selectedTab !== '전체') {
    const want = selectedTab === '반' ? '반 별 게시판' : '부 별 게시판';
    filtered = filtered.filter((p) => p.selection === want);
  }
  if (filter1 && filter1 !== '전체') {
    filtered = filtered.filter((p) => p.filter1 === filter1);
  }
  if (filter2 && filter2 !== '전체') {
    filtered = filtered.filter((p) => p.filter2 === filter2);
  }
  return filtered.sort((a, b) => b.createdAt - a.createdAt);
}

export async function addComment(postId: string, content: string): Promise<Post | null> {
  const list = await getPosts();
  const targetIndex = list.findIndex((p) => p.id === postId);
  if (targetIndex === -1) return null;

  const post = list[targetIndex];

  const newComment: Comment = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, // 댓글 고유 id
    content: content.trim(),
    createdAt: new Date(), // Date 객체 그대로 저장 (불러올 때는 string으로 변환됨 주의)
  };

  // 불변성 유지해서 업데이트
  const updatedPost: Post = {
    ...post,
    comments: [...post.comments, newComment],
  };

  const updatedList = [...list];
  updatedList[targetIndex] = updatedPost;

  await AsyncStorage.setItem(KEY, JSON.stringify(updatedList));

  return updatedPost;
}

export async function clearAll() {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage cleared');
  } catch (e) {
    console.error(e);
  }
}
