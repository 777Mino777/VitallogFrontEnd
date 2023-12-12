# Vital Log Frontend
 > 사용자 별 운동을 기록할 수 있고, 나이 / 성별 등에 따라 운동을 추천받을 수 있는 웹 사이트입니다.

- [프로젝트 시연 영상](https://youtu.be/on6aPi652lw?si=2TCU0CRRZPPYE1cL)

 ## 개발 환경
 개발 기간 : 2023.11.14 ~ 2023.12.12

 |FE|BE|
|:---:|:---:|
|박민호|김혜진|
|[FE 저장소](https://github.com/777Mino777/VitallogFrontEnd)|[BE 저장소](https://github.com/ynnij/VitalLog-BackEnd)|

- React : 18.2.0
- Node.js : 18.17.1
- Tailwindcss : 3.3.5

## 프로젝트 일정 정리

### 11.14 (화)

 - 주제 선정

### 11.15(수)

 - 화면 설계

### 11.16(목)

 - REST API 작성

 - 로그인 화면 구현

 - 데이터베이스 생성 및 스프링 프로젝트 생성

### 11.17(금)

Front

- MainPage 구현

Back

- information 구현
- JWT 로그인 구현

(+) rest api 명세

- 운동 목록 데이터 받아오는 부분 추가 필요
    - GET  api/vitallog/exercise

### 11.20(월)

Front

- LoginPage / RegisterPage 구현

Back

- 회원가입 구현 및 로그인 관련 오류 수정
- 운동 목록 받는 기능 구현
- userlog관련 기능 구현 중 → member, userlog, exercise 테이블을 조인한 logsView 생성

### 11.21(화)

Front

- information 마무리 / userpage ( + mypage )

Back

- usermain 및 mypage 관련 기능 구현
- board, reply db생성
    - alter table reply add foreign key(writer) references member(id);
    alter table reply add foreign key(board_id) references board(id);

### 11.22(수)

front

- ㅁ

back

- mypage : 전체 로그 및 특정 기간 로그 전송 시 날짜별 total 계산해서 Map 형태로 리턴하도록 기능 수정, 트랜잭션 추가
- 커뮤니티 게시판 관련 기능 구현 → reply 제외 board 부분 구현 완료

### 11.23(목)

front

- information page 구현 완료

back

- 커뮤니티 댓글 기능 구현 완료
- board 및 reply에 update_date 필드 추가해서 게시글 및 댓글 수정 시 수정된 날짜도 같이 기록하도록 기능 추가

### 11.24(금)

front 

- user page 구현 완료

back

- [FE] 마이페이지 페이지 분류

### 11.28(화)

front 

- community page / communityWrite page / communityDetail page 구현 완료
- community page 중 미구현  : 댓글 기능 미구현

back

- [FE] 마이페이지 오늘의 로그 추가 기능 구현
- [BE] 댓글 추가 삭제 시 response 수정

### 11.29(수)

front 

- 완료 : CommunityDetailPage 댓글 기능 구현
- 수정 필요 : [댓글 / 게시물] 수정 + 삭제 기능 구현

back

- [FE] 전체 로그 구현
- [BE] security config 수정완료

### 11.30(목)

front 

- 완료 :  Information 페이지 리디자인 완료
- 수정 필요 : CommunityPage 전체 수정 + 삭제 기능 구현 실패, 다음주 재구현

back

- [FE]  기간별 로그보기 및 오늘의 로그보기 구현, 로그 삭제 기능 구현

### 12.04(월)

front 

- 완료 : CommunityPage 게시물 및 댓글 삭제기능 구현
- 수정 필요 : 위의 페이지 수정기능 구현

back

- [FE] recoil을 사용한 로그인 상태관리 및 네비게이션 수정

### 12.05(화)

front 

- 게시판 수정 시도했으나 실패

back

- [FE] 추천 운동 페이지 크기 수정 및 마이페이지 오류 수정, 유저 메인 페이지 디자인 수정

### 12.06(수)

front 

- 완료 :  CommunityDetailPage 게시물 및 댓글 수정기능 구현
- 수정 필요 : 코드 전체 디자인

back

- [FE] 새로고침 시 값 변경되는 recoil 오류 수정
- [BE] localhost가 아닌 ip로 입력했을 때 발생하는 cors 에러 수정

### 12.07(목) ~ 12.12(화)
 
 - 전체적인 기능 및 디자인 수정 및 마무리