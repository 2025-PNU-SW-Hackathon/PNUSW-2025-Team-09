// 현재 로그인한 사용자 정보
export const getCurrentUser = () => {
  return {
    name: '김소영',
    id: '1',
    role: 'teacher',
  };
};

// 로그인한 사용자 이름 가져오기
export const getCurrentUserName = (): string => {
  return '김소영';
};
