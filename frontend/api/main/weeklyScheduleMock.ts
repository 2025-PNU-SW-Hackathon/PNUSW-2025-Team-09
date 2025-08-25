import {
  Schedule,
  getWeeklyScheduleResponse,
  getAllSchedulesResponse,
} from '@/api/main/weeklyScheduleApi';

// 주간 일정 가져오기 (Mock 데이터 사용)
export const getWeeklySchedule = async (
  selectedDay: number,
): Promise<getWeeklyScheduleResponse> => {
  const allSchedules = await getAllSchedules();
  // 클라이언트 사이드에서 요일별 필터링
  return allSchedules.filter((schedule: Schedule) => schedule.dayOfWeek === selectedDay);
};

// 모든 일정 가져오기 (Mock 데이터 사용)
export const getAllSchedules = async (): Promise<getAllSchedulesResponse> => {
  return getAllSchedulesMock();
};

export const getAllSchedulesMock = async (): Promise<getAllSchedulesResponse> => {
  const mockData: Schedule[] = [
    {
      id: '1',
      dayOfWeek: 1,
      className: '벚꽃반',
      subject: '영어',
      startTime: '09:00',
      endTime: '10:30',
      teacherName: '김소영',
      isCancelled: false,
    },
    {
      id: '2',
      dayOfWeek: 1,
      className: '국화반',
      subject: '수학',
      startTime: '10:30',
      endTime: '12:00',
      teacherName: '한혜인',
      isCancelled: false,
    },
    {
      id: '3',
      dayOfWeek: 1,
      className: '민들레반',
      subject: '국어',
      startTime: '14:00',
      endTime: '15:30',
      teacherName: '이병길',
      isCancelled: false,
    },
    {
      id: '4',
      dayOfWeek: 1,
      className: '개나리반',
      subject: '영어',
      startTime: '15:30',
      endTime: '17:00',
      teacherName: '김태란',
      isCancelled: true,
    },
    {
      id: '5',
      dayOfWeek: 2,
      className: '장미반',
      subject: '수학',
      startTime: '09:00',
      endTime: '10:30',
      teacherName: '이예린',
      isCancelled: false,
    },
    {
      id: '6',
      dayOfWeek: 2,
      className: '해바라기반',
      subject: '국어',
      startTime: '14:00',
      endTime: '15:30',
      teacherName: '김소영',
      isCancelled: false,
    },
    {
      id: '7',
      dayOfWeek: 3,
      className: '벚꽃반',
      subject: '수학',
      startTime: '10:30',
      endTime: '12:00',
      teacherName: '한혜인',
      isCancelled: false,
    },
    {
      id: '8',
      dayOfWeek: 3,
      className: '국화반',
      subject: '영어',
      startTime: '15:30',
      endTime: '17:00',
      teacherName: '이병길',
      isCancelled: false,
    },
    {
      id: '9',
      dayOfWeek: 4,
      className: '민들레반',
      subject: '영어',
      startTime: '09:00',
      endTime: '10:30',
      teacherName: '김소영',
      isCancelled: false,
    },
    {
      id: '10',
      dayOfWeek: 4,
      className: '개나리반',
      subject: '국어',
      startTime: '14:00',
      endTime: '15:30',
      teacherName: '이예린',
      isCancelled: false,
    },
    {
      id: '11',
      dayOfWeek: 5,
      className: '장미반',
      subject: '국어',
      startTime: '10:30',
      endTime: '12:00',
      teacherName: '이병길',
      isCancelled: false,
    },
    {
      id: '12',
      dayOfWeek: 5,
      className: '해바라기반',
      subject: '수학',
      startTime: '15:30',
      endTime: '17:00',
      teacherName: '한혜인',
      isCancelled: false,
    },
    {
      id: '13',
      dayOfWeek: 6,
      className: '벚꽃반',
      subject: '국어',
      startTime: '09:00',
      endTime: '10:30',
      teacherName: '이병길',
      isCancelled: false,
    },
    {
      id: '14',
      dayOfWeek: 6,
      className: '국화반',
      subject: '영어',
      startTime: '14:00',
      endTime: '15:30',
      teacherName: '김태란',
      isCancelled: false,
    },
    {
      id: '15',
      dayOfWeek: 0,
      className: '국화반',
      subject: '영어',
      startTime: '14:00',
      endTime: '15:30',
      teacherName: '김소영',
      isCancelled: false,
    },
  ];

  return mockData;
};
