// Todo: /calendar/events/exchange 라고 되어 있는데 calendar와 혼동 -> main으로 바꾸던가 해야함
// Todo: get 메서드도 필요함 api 명세 수정할 것 정리해서 보내기 (특히 dateTime 부분)

export type getExchangeResponse = {
  dateFrom: string; //ISO String 타입
  classFrom: string;
  teacherFrom: string;
  dateTo: string; //ISO String 타입
  classTo: string;
  teacherTo: string;
  description: string;
  status: string;
};
