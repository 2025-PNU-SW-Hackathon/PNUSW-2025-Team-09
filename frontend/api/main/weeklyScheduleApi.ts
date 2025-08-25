export type ClassName =
  | '벚꽃반'
  | '국화반'
  | '민들레반'
  | '개나리반'
  | '장미반'
  | '해바라기반'
  | '결강';

export interface Schedule {
  id: string;
  dayOfWeek: number;
  className: ClassName;
  subject: string;
  startTime: string;
  endTime: string;
  teacherName: string;
  isCancelled: boolean; // true: 결강, false: 정상 수업
}

// 주간 일정 가져오기 응답 타입
export type getWeeklyScheduleResponse = Schedule[];

// 모든 일정 가져오기 응답 타입
export type getAllSchedulesResponse = Schedule[];
