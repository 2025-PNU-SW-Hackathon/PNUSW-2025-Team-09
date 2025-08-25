import { getCancelResponse } from '@/api/main/cancelApi';

export const getCancelMock = async (): Promise<Record<number, getCancelResponse[]>> => {
  const dataById: Record<number, getCancelResponse[]> = {
    101: [
      {
        date: '2025.10.10 10:30',
        class: '장미반 영어수업',
        teacher: '이병길',
        description: '가족 여행 일정으로 결강 요청합니다',
        status: '대기',
      }],
    102: [
      {
        date: '2025.10.10 10:30',
        class: '장미반 영어수업',
        teacher: '김태란',
        description: '가족 여행 일정으로 결강 요청합니다',
        status: '승낙',
      }],
    103: [
      {
        date: '2025.10.10 10:30',
        class: '장미반 영어수업',
        teacher: '황원제',
        description: '가족 여행 일정으로 결강 요청합니다',
        status: '승낙',
      }],
    104: [
      {
        date: '2025.10.10 10:30',
        class: '장미반 영어수업',
        teacher: '이예린',
        description: '가족 여행 일정으로 결강 요청합니다',
        status: '거절',
      }],
    105: [
      {
        date: '2025.10.10 10:30',
        class: '장미반 영어수업',
        teacher: '한혜인',
        description: '가족 여행 일정으로 결강 요청합니다',
        status: '대기',
      }]
  };

  return dataById;
};
