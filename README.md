### 1. 프로젝트 소개
#### 1.1. 개발배경 및 필요성

부산대학교 인근에 위치한 금정열린배움터는 지역 기반 교육 봉사기관으로, 어르신 문해교육을 통해 교육 사각지대를 해소하고 사회 포용성을 높이고 있습니다. 그러나 운영 과정에서 다음과 같은 문제점을 발견하였습니다:

- 출결, 일정 관리, 결강 처리 등이 모두 수작업으로 이루어져 업무 효율이 낮고 피로도가 큼
- **재정 관리**가 수기 기반으로 되어 있어 오류 발생 가능성 존재
- **학습 진도 관리가 미흡**하여 학습자 맞춤형 피드백 제공이 어려움
- **공식 소통 창구의 부재**로 문의나 공지 전달이 비효율적임

이를 해결하고자 봉사자와 실사용자의 요구를 반영하여 **운영 통합 앱** 개발이 필요함을 알게 되었습니다. 

#### 1.2. 개발 목표 및 주요 내용
1. 업무 자동화 : 수작업 업무(출결, 일정, 결제 요청 등)를 디지털화하여 봉사자의 부담을 완화
2. 재정 투명성 강화 : 결제 이력 및 입출금 기록을 DB 기반으로 관리하여 회계 신뢰도 향상
3. 학습 모니터링 지원 : 개별 학습자의 이수 진도, 과제 수행 현황을 실시간으로 확인 및 피드백 제공
4. 고령자 친화 UI 제공 (예정) : 향후 고령 학습자용 확장 대비 큰 글씨, 고대비 색상, 단순 레이아웃 기반 설계
5. 구성원 간 커뮤니케이션 활성화 : 반별/부서별 게시판으로 공지, 문의사항 등을 쉽게 소통할 수 있도록 지원

#### 1.3. 세부내용
#### 사용자 유형 및 주요 기능

| 사용자 유형       | 기능 요약                                                    |
| ------------ | -------------------------------------------------------- |
| **교사 (봉사자)** | 출석 인증, 시간표 열람, 반 출결 처리, 수업 교환 요청, 결제 요청, 학습자 모니터링, 반 게시판 |
| **교육연구부**    | 전체 시간표 열람, 수업 교환 요청 승인, 게시판 운영                           |
| **총무부**      | 결제 승인, 재정 입출금 등록, 게시판 운영                                 |
| **홍보/생활안전부** | 부서별 게시판 운영                                               |


#### 1.4. 기존 서비스 대비 차별성
#### 유사 서비스 사례와 차별성
> 기존 : 1365 자원봉사 포털, VMS, 청년포털(자원봉사 앱) 등

| 항목    | 기존 자원봉사 앱      | 손모음 앱                       |
| ----- | -------------- | --------------------------- |
| 목적    | 봉사 실적 조회/신청 중심 | **현장 실시간 교육 지원 중심**         |
| 사용자   | 봉사자 중심         | **봉사자 + 관리자 + 고령 학습자**      |
| UI/UX | 일반 사용자         | **고령자 친화 UI(큰 글씨, 직관적 화면)** |
| 학습 관리 | 미제공            | **실시간 학습 진도/과제 모니터링 제공**    |
| 업무 지원 | X              | 출결/결제 요청/일정 변경 등 **전산화** 지원 |


#### 1.5. 사회적가치 도입 계획
> 본 프로젝트는 단순히 행정 효율을 높이기 위한 도구를 넘어, 지역 사회와 고령 학습자, 그리고 청년 봉사자 모두에게 긍정적인 사회적 가치를 제공하는 것을 주요 목표로 삼고 있습니다.

손모음 프로젝트는 단순한 행정 자동화 앱을 넘어, 지역사회와 고령 학습자, 청년 봉사자 모두에게 의미 있는 사회적 가치를 제공합니다. 우선 부산대학교 학생들이 봉사 활동뿐 아니라 앱 개선, 유지보수 등 다양한 방식으로 지속적인 참여가 가능하도록 하여, 지역사회 기여와 실무 경험을 동시에 쌓을 수 있는 기반을 마련합니다. 또한 앱 구조를 모듈화하여 금정열린배움터 외에도 시민대학, 대안학교 등 **다양한 교육기관에서 활용**할 수 있도록 설계했으며, 추후 클라우드 기반 서비스로 확장해 전국 비영리 기관에 보급할 수 있습니다.

아울러 학습자의 출결, 과제, 진도 데이터를 기반으로 고령 학습자 **맞춤형 교육 제공**이 가능하며, 이는 고령자의 학습 지속률과 동기 향상에 기여할 수 있습니다. 마지막으로 봉사자의 활동 이력을 자동 포트폴리오화하는 기능을 통해 성취감을 높이고 장기적인 봉사 참여를 유도하는 등, 앱을 통해 **지속 가능한 지역교육 생태계**를 구축하고자 합니다.

결론적으로, 손모음 프로젝트는 단순한 앱 개발을 넘어 **고령층의 교육 접근성 향상, 청년의 지역사회 기여 활성화, 비영리 교육기관의 디지털 전환 지원**이라는 세 가지 측면에서 지속 가능하고 확장 가능한 사회적 가치를 실현하고자 합니다.


### 2. 상세설계
#### 2.1. 시스템 구성도
<img width="700" height="700" alt="Group" src="https://github.com/user-attachments/assets/9a6d1b7b-e55d-467f-a793-944de5b1436b" />


#### 2.1. 사용 기술
- FrontEnd

| 이름             | 버전    |
|:----------------:|:-------:|
| React | 18.3.1 |
| React Native | 0.76.7 |
| Expo   | SDK 52  |
| TypeScript  | 5.3.3 |
- BackEnd
  
| 이름                  | 버전    |
|:---------------------:|:-------:|
| NestJS               | 11.0.9 |
| TypeORM     | 0.3.20 |
| TypeScript  | 4.9.5 |
| PostgreSQL      | 17.4 |
- Designer
  
| 이름                  | 버전    |
|:---------------------:|:-------:|
| Figma               | latest |


### 3. 개발결과
#### 3.1. 전체시스템 흐름도
<img width="1765" height="903" alt="스크린샷 2025-08-20 오후 3 24 47" src="https://github.com/user-attachments/assets/c17c198d-f6d4-446a-b2b0-205532b581bb" />


#### 3.2. 기능설명

1. 메인 페이지: 수업 일정을 확인하고, 결제 및 수업 교환/결강 신청을 관리할 수 있습니다.
<table>
  <tr>
    <td>
      <img width="500" alt="메인페이지" src="https://github.com/user-attachments/assets/770f846b-0a4b-487c-a8d7-f9cf587cd4fa"/>
    </td>
    <td>
      <img width="900" alt="이번주일정_나의일정" src="https://github.com/user-attachments/assets/ba466caf-ae7b-465f-8434-4aa3a4ff3682"/><br/>
      ㄴ 반별 아이콘과 수업 이름, 시간이 표시되며 요일별로 일정을 확인할 수 있습니다.<br/><br/>
      <table>
        <tr>
          <th>번호</th><th>기능</th><th>설명</th>
        </tr>
        <tr>
          <td>1</td><td>오늘의 수업 확인</td><td>로그인된 선생님의 오늘 수업을 확인할 수 있습니다.</td>
        </tr>
        <tr>
          <td>2</td><td>수업 출석체크</td><td>슬라이드 형식으로 간편하게 본인의 출석을 인증할 수 있습니다.</td>
        </tr>
        <tr>
          <td>3</td><td>이번 주 일정 체크</td><td>나의/전체 일정 옵션을 통해 수업 일정 현황을 확인할 수 있습니다.</td>
        </tr>
        <tr>
          <td>4</td><td>신청서 작성</td><td>결제 및 교환/결강 요청서를 작성할 수 있습니다.</td>
        </tr>
      </table>
    </td>
  </tr>
</table>

---

2. 교환/결강 페이지: 교사 간 수업 교환/결강 요청서를 열람하고 작성할 수 있습니다.
<table>
  <tr>
    <td>
      <img width="600" alt="교환요청서1" src="https://github.com/user-attachments/assets/f73e3e8c-a264-4695-9c9d-731b3ea4e6a0"/>
      <br/><br/>
      <table>
        <tr>
          <th>번호</th><th>기능</th><th>설명</th>
        </tr>
        <tr>
          <td>1</td><td>교환/결강 선택</td><td>교환/결강 요청서의 목록을 선택해 열람할 수 있습니다.</td>
        </tr>
        <tr>
          <td>2</td><td>교환/결강 요청서 작성</td><td>교환/결강 요청서를 작성할 수 있는 페이지로 이동합니다.</td>
        </tr>
        <tr>
          <td>3</td><td>교환/결강 요청서 카드</td><td>교환을 원하는 선생님의 수업 날짜/이름/교환 이유를 확인할 수 있습니다.</td>
        </tr>
        <tr>
          <td>4</td><td>요청서 필터</td><td>관리자가 해당 교환/결강의 수락/거절/대기 여부를 필터링하여 확인할 수 있습니다.</td>
        </tr>
      </table>
    </td>
  </tr>
</table>


2-1. 교환/결강 관리자 페이지: 관리자는 교환/결강 요청서를 작성하거나 요청서를 수락/거절할 수 있습니다. 
<table>
  <tr>
    <td>
      <img width="700" alt="교환요청서2" src="https://github.com/user-attachments/assets/204021e9-ea20-4b4a-a010-14646ace725e"/>
      <br/><br/>
      <table>
        <tr>
          <th>번호</th><th>기능</th><th>설명</th>
        </tr>
        <tr>
          <td>2</td><td>교환/결강 요청서 작성</td><td>교환 또는 결강 요청서를 선택해 작성합니다.</td>
        </tr>
        <tr>
          <td>2</td><td>교환/결강 요청서 작성</td><td>교환 요청서를 작성합니다.</td>
        </tr>
        <tr>
          <td>2</td><td>교환/결강 요청서 작성</td><td>결강 요청서를 작성합니다.</td>
        </tr>
        <tr>
          <td>5</td><td>요청서 수락/거절</td><td>관리자는 교사의 교환/결강을 수락/거절할 수 있습니다.</td>
        </tr>
      </table>
    </td>
  </tr>
</table>

---

3. 결제 요청 페이지: 결제 요청서를 열람하고 작성할 수 있습니다.
<table>
  <tr>
    <td>
      <img width="700" alt="결제요청서" src="https://github.com/user-attachments/assets/1bd04387-98c9-48fe-b7bb-1072042ffde4"/>
      <br/><br/>
      <table>
        <tr>
          <th>번호</th><th>기능</th><th>설명</th>
        </tr>
        <tr>
          <td>1</td><td>결제 요청서 작성</td><td>결제 요청서를 작성합니다.</td>
        </tr>
        <tr>
          <td>2</td><td>결제 요청서 카드</td><td>본인이 작성한 결제 요청서를 열람할 수 있습니다.</td>
        </tr>
        <tr>
          <td>3</td><td>결제 요청 필터</td><td>결제 요청서의 수락/거절/대기 여부를 필터링하여 확인할 수 있습니다.</td>
        </tr>
        <tr>
          <td>4</td><td>요청서 수락/거절</td><td>관리자는 교사의 결제 요청을 수락/거절할 수 있습니다.</td>
        </tr>
      </table>
    </td>
  </tr>
</table>

---

4. 게시판: 손모음 앱의 모든 유저들은 자유롭게 글을 작성할 수 있습니다.
<table>
  <tr>
    <td>
      <img height="350" alt="게시판1" src="https://github.com/user-attachments/assets/5370364f-ec05-4572-b28a-7463bca6b517"/>
      <img height="350" alt="게시판2" src="https://github.com/user-attachments/assets/69ca7476-99e3-43b3-8042-8799a8fc0bf3"/>
      <br/><br/>
      <table>
        <tr>
          <th>번호</th><th>기능</th><th>설명</th>
        </tr>
        <tr>
          <td>1</td><td>반별 게시판 필터</td><td>반별 게시판에서는 특정 반과 게시글의 종류를 선택할 수 있습니다.</td>
        </tr>
        <tr>
          <td>2</td><td>부별 게시판 필터</td><td>부별 게시판에서는 특정 부서와 게시글의 종류를 선택할 수 있습니다.</td>
        </tr>
        <tr>
          <td>3</td><td>게시글 확인</td><td>작성되어 있는 게시글의 제목/내용/날짜/조회수/댓글을 스크롤로 확인할 수 있습니다.</td>
        </tr>
        <tr>
          <td>4</td><td>게시글 작성</td><td>원하는 반/부서별 게시판에서 게시글을 작성할 수 있습니다.</td>
        </tr>
        <tr>
          <td>5</td><td>파일/이미지 업로드</td><td>파일과 이미지를 글과 함께 업로드할 수 있습니다.</td>
        </tr>
        <tr>
          <td>6</td><td>댓글 작성</td></td><td>게시글에 댓글을 작성하고 확인할 수 있습니다.</td>
        </tr>
      </table>
    </td>
  </tr>
</table>

---

5. 출석부 및 수업 일지: 야학 선생님들은 학생들의 출석과 수업 일지를 관리할 수 있습니다. 
<table>
  <tr>
    <td align="center">
      <img height="400" alt="출석부" src="https://github.com/user-attachments/assets/6a514667-d56f-4a99-8bb9-d4f2c86b3e1b"/>
    </td>
    <td align="center">
      <img height="400" alt="수업일지" src="https://github.com/user-attachments/assets/02f176b7-054e-4752-be24-574148def6df"/>
    </td>
  </tr>
  <tr>
    <td>
      <table>
        <tr>
          <th>번호</th><th>기능</th><th>설명</th>
        </tr>
        <tr>
          <td>1</td><td>출석 체크</td><td>학생들의 출석 여부를 관리할 수 있습니다.</td>
        </tr>
        <tr>
          <td>2</td><td>학생 명단 추가</td><td>해당 수업의 학생을 명단에 추가할 수 있습니다.</td>
        </tr>
      </table>
    </td>
    <td>
      <table>
        <tr>
          <th>번호</th><th>기능</th><th>설명</th>
        </tr>
        <tr>
          <td>1</td><td>오늘의 수업 일지</td><td>오늘 수업 내용을 기록할 수 있고 작성한 내용을 수정할 수 있습니다.</td>
        </tr>
        <tr>
          <td>2</td><td>이전 수업 일지</td><td>이전의 수업들에 대한 일지를 열람할 수 있습니다.</td>
        </tr>
        <tr>
          <td>3</td><td>수업 일지 작성</td><td>날짜/이름/수업 내용을 수업 일지에 기입할 수 있습니다.</td>
        </tr>
      </table>
    </td>
  </tr>
</table>


#### 3.3. 기능명세서
> 노션 링크

[https://phase-bird-e06.notion.site/2530a7dbe96d8065a716d9c815c353e5?v=2530a7dbe96d8006acc8000c325ac061&source=copy_link](https://phase-bird-e06.notion.site/2530a7dbe96d8065a716d9c815c353e5?v=2530a7dbe96d8006acc8000c325ac061&source=copy_link)

#### 3.4. 디렉토리 구조
```text
...
├─backend
│    └─src
│       ├─controller
│       │     ├─auth
│       │     ├─notive_board
│       │     ... # 도메인별 컨트롤러
│       ├─dto
│       │  ├─auth
│       │  ├─notive_board
│       │  ... # 도메인별 dto
│       ├─entity
│       │   ├─auth
│       │   ├─notive_board
│       │   ... # 도메인별 엔티티
│       ├─module
│       │    ├─auth
│       │    ├─notive_board
│       │    ... # 도메인별 모듈 
│       ├─service
│       │    ├─auth
│       │    ├─notive_board
│       │    ... # 도메인별 서비스 로직
│       └─shared 
│            ├─app.controller.spec.ts
│            ├─app.controller.ts
│            ├─app.module.ts
│            ├─app.service.ts
│            └─main.ts
│  
├─frontend
│     ├─app # 경로별 페이지
│     │   ├─calendar
│     │   │     └─index.tsx
│     │   ├─learning_monitoring
│     │   │          └─index.tsx
│     │   ├─main
│     │   │   ├─class_management
│     │   │   │        └─index.tsx
│     │   │   ├─class_request
│     │   │   │        └─index.tsx
│     │   │   ├─payment_request
│     │   │   │        └─index.tsx
│     │   │   └─index.tsx
│     │   ├─notice_board
│     │   │      ├─create
│     │   │      │    ├─index.tsx
│     │   │      ├─index.tsx
│     │   │      └─[id].tsx 
│     │   ├─setting
│     │   │   └─index.tsx
│     │   ├─sign_up
│     │   │   └─index.tsx
│     │   └─index.tsx 
│     ├─app_assets # 각 페이지별로 쓰이는 svg 파일 모음
│     │      └─ ...
│     ├─app_component # 각 페이지별 컴포넌트 모음
│     │   ├─calendar_screen
│     │   │       └─ ...
│     │   ├─learning_monitoring_screen
│     │   │            └─ ...
│     │   ├─main_screen
│     │   │      ├─class_management_screen
│     │   │      │          └─ ...
│     │   │      ├─class_request_screen
│     │   │      │          └─ ...
│     │   │      ├─payment_request_screen
│     │   │      │          └─ ...
│     │   │      ├─payment_screen
│     │   │      │          └─ ...
│     │   │      └ ...
│     │   ├─notice_board_screen
│     │   │      ├─create
│     │   │      │    └─ ...
│     │   │      ├─filter_button
│     │   │      │    └─ ...
│     │   │      ├─filter_card
│     │   │      │    └─ ...
│     │   │      ├─notice_board_detail_screen
│     │   │      │             └─ ...
│     │   │      └ ...
│     │   ├─setting_screen
│     │   │   └─ ...
│     │   └─shared
│     │        └─ ...
│     ├─assets
│     │  ├─fonts
│     │  └─images
│     ├─node_modules
│     └─types # 각 페이지별 타입 모음
│          └─ ...
├─pakage-lock.json
├─pakage.json
...
```

### 4. 설치 및 사용 방법
```bash
git clone https://github.com/2025-PNU-SW-Hackathon/PNUSW-2025-Team-09.git
cd frontend
npm install
npx expo login #EAS 빌드를 사용하기 위한 Expo 계정 필요
eas build --profile preview --platform android
```
빌드 후 제공되는 QR코드 혹은 링크를 통해 APK 파일 다운로드

### 5. 소개 및 시연 영상
> 프로젝트에 대한 소개와 시연 영상을 넣으세요.
> 프로젝트 소개 동영상을 교육원 메일(swedu@pusan.ac.kr)로 제출 이후 센터에서 부여받은 youtube URL주소를 넣으세요.

### 6. 팀 소개 (임시 이미지)
| 이병길 | 김소영 | 김태란 | 황혜정 | 최양진 | 김도형 |
|:-------:|:-------:|:-------:|:-------:|:-------:|:-------:|
|<img width="100px" alt="이병길" src="https://github.com/pnuswedu/SW-Hackathon-2024/assets/34933690/f5b5df2a-e174-437d-86b2-a5a23d9ee75d" /> | <img width="100px" alt="김태란" src="https://github.com/pnuswedu/SW-Hackathon-2024/assets/34933690/fe4e8910-4565-4f3f-9bd1-f135e74cb39d" /> | <img width="100px" alt="이병길" src="https://github.com/pnuswedu/SW-Hackathon-2024/assets/34933690/f5b5df2a-e174-437d-86b2-a5a23d9ee75d" /> | <img width="100px" alt="김태란" src="https://github.com/pnuswedu/SW-Hackathon-2024/assets/34933690/fe4e8910-4565-4f3f-9bd1-f135e74cb39d" /> | <img width="100px" alt="이병길" src="https://github.com/pnuswedu/SW-Hackathon-2024/assets/34933690/f5b5df2a-e174-437d-86b2-a5a23d9ee75d" /> | <img width="100px" alt="김태란" src="https://github.com/pnuswedu/SW-Hackathon-2024/assets/34933690/fe4e8910-4565-4f3f-9bd1-f135e74cb39d" /> |
| qudrlf72@naver.com | so09021@pusan.ac.kr | kimtaeran4767@gmail.com | ssssandy@pusan.ac.kr | chldidwls@pusan.ac.kr | gnoeyh19@gmail.com |
| 팀장 <br/> 프론트/백 개발 | 기획자 <br/> 아이디어 기획 | 프론트엔드 개발자 <br/> 프론트 개발/백 테스트 | 디자이너 <br/> UI/UX 디자인 | 디자이너 <br/> UI/UX 디자인 | 백엔드 개발자 <br/> 백엔드 개발 |

### 7. 해커톤 참여 후기
- 이병길
 > 그동안 아이디어톤이나 공모전 같은 활동에 참여할 때마다 느낀 점은, 비슷한 아이디어가 반복되고 꼭 해결이 필요하다고 느껴지는 문제에 접근하지 못한 점이 아쉬웠습니다.
그러나 이번 프로젝트에서는 현장에서 선생님과 학생들이 겪는 구체적인 불편함과 문제 상황을 직접 확인하고, 이를 해결하기 위한 앱을 설계하고 개발하는 과정을 경험할 수 있었습니다.
단순히 새로운 아이디어를 제시하고 개발하는 것이 아닌, 실제 문제 해결을 위한 개발을 할 수 있었던 점에서 귀중한 경험이 되었습니다.
- 김소영
 > 2025년 상반기 금정열린배움터의 총무부장을 맡아 24년도 야학 사업 마무리를 진행했습니다. 저희 배움터는 별도 담당자 없이 운영되다 보니 모든 행정 업무가 야간학교 부장 선생님들께 과중되는 문제가 있었습니다. 특히 엑셀, 타임트리, 여러 개의 카카오톡 공지방과 네이버 카페까지 너무 많은 채널에 업무가 흩어져 있어 모두가 지쳐있었고, 이 복잡한 시스템은 신입 선생님들의 적응을 더욱 어렵게 만들었습니다. 이러한 문제들을 해결하고자 '손모음' 앱을 기획하게 되었습니다.
개발 과정에서는 야간학교 선생님들과 학생, 동료 부장님들의 피드백을 계속 반영하다 보니 예상보다 속도가 더뎠습니다. 또한, 야간학교에서 직접 활동하지 않아 내부 프로세스를 잘 모르시는 개발자, 디자이너분들의 이해를 돕는 과정도 쉽지만은 않았습니다. 단순히 일반적인 앱을 만드는 것이 아니라, 실제 현장에서 사용될 '살아있는' 앱으로 만들고 싶었기 때문입니다. 그래서 '어떻게 하면 사용자가 더 편리하고, 덜 생각하면서 간단히 쓸 수 있을까'를 깊이 고민했습니다.
그렇게 빌드된 앱을 야간학교 선생님들과 부장 선생님들, 학생이신 어머님들께 보여드렸을 때, 정말 설레하며 기대하시는 모습을 보며 큰 뿌듯함을 느꼈습니다.
- 김태란
 > 안녕하세요
- 황혜정
 > 안녕하세요
- 최양진
 > 안녕하세요
- 김도형
 > 안녕하세요
