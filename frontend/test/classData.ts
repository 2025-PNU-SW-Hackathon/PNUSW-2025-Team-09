export type ClassInfo = {
  className: string;
  subject: string;
  classTime: string;
};

export type Schedule = {
  date: string; // YYYY-MM-DD
  classes: ClassInfo[];
};

export const Schedule: Schedule[] = [
  {
    date: '2025-04-01',
    classes: [
      { className: '벚꽃반', subject: '수학', classTime: '10:00 ~ 12:00' },
      { className: '개나리반', subject: '과학', classTime: '13:00 ~ 15:00' },
    ],
  },
  {
    date: '2025-04-02',
    classes: [{ className: '벚꽃반', subject: '영어', classTime: '09:00 ~ 10:30' }],
  },
  {
    date: '2025-04-03',
    classes: [
      { className: '개나리반', subject: '미술', classTime: '11:00 ~ 12:30' },
      { className: '벚꽃반', subject: '체육', classTime: '14:00 ~ 15:30' },
    ],
  },
  {
    date: '2025-04-04',
    classes: [{ className: '개나리반', subject: '사회', classTime: '10:00 ~ 11:30' }],
  },
  {
    date: '2025-04-05',
    classes: [],
  },
  {
    date: '2025-04-06',
    classes: [{ className: '벚꽃반', subject: '음악', classTime: '09:00 ~ 10:00' }],
  },
  {
    date: '2025-04-07',
    classes: [{ className: '개나리반', subject: '국어', classTime: '13:00 ~ 14:30' }],
  },
  {
    date: '2025-04-08',
    classes: [{ className: '벚꽃반', subject: '수학', classTime: '10:00 ~ 11:00' }],
  },
];
