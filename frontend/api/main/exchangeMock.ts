import { getExchangeResponse } from '@/api/main/exchangeApi';

export const getExchangeMock = async (): Promise<Record<number, getExchangeResponse[]>> => {
  const dataById: Record<number, getExchangeResponse[]> = {
    101: [
      {
        dateFrom: '2025.10.10 10:30',
        classFrom: '장미반 영어수업',
        teacherFrom: '김소영',
        dateTo: '2025.12.10 13:30',
        classTo: '민들레반 영어수업',
        teacherTo: '최양진',
        description: '가족 여행 일정으로 교환 요청합니다',
        status: '대기',
      },
    ],
    102: [
      {
        dateFrom: '2025.10.20 10:30',
        classFrom: '장미반 수학수업',
        teacherFrom: '김태란',
        dateTo: '2025.11.23 14:30',
        classTo: '민들레반 국어수업',
        teacherTo: '김라떼',
        description: '친구 여행 일정으로 교환 요청입니다',
        status: '승낙',
      },
    ],
    103: [
      {
        dateFrom: '2025.10.20 10:30',
        classFrom: '장미반 수학수업',
        teacherFrom: '한혜인',
        dateTo: '2025.11.23 14:30',
        classTo: '민들레반 국어수업',
        teacherTo: '김라떼',
        description: '친구 여행 일정으로 교환 요청입니다',
        status: '거절',
      },
    ],
  };

  return dataById;
};
