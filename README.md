# likelion_Wiki

# 위키만들기

## 프론트 - 백

- 프론트 권경민/정동구
- 백 권경민/김우영

## 역할 분담

## 구현 해야할 기능들

### 프론트

- 1 웹페이지 만들기
- 2
- 3
- 4

### 백

- API만들기
  - create (date, title, RAW Content, authority)
  - read (userid)
  - read (bbsid)
  - edit (바뀐 버전의 내용으로 새로 생성, 이전 데이터는 보존)
  - delete (실제로 삭제되려면 토론을 통해 합의가 이루어진다음 권한이있는 로그인 사용자(혹은 관리자)에게 요청 후 삭제)
- 데이터베이스에 필요한 features 결정
  - 문서 저장 (id, date=최근수정시각, 문서 버전 = r\_\_\_, title, RAW Content, authority)
  - 사용자 회원가입 정보 저장
- SQL문으로 데이터베이스에 접근해서 json으로 만들어서 보내주기
- 회원가입기능 만들기

- 로그인
  - 미 로그인 사용자는 ip주소기반으로 관리
  - 자동 로그인 구현
  - 로그인 시점기록 --> 권한 관련
  - 기여도 기록 --> 권한 관련
- 데이터베이스 구조

  - schema
    - tables
      - bbs
        - columns
          - bbsID primary key, int, not null, auto_inscrement
          - bbsTitle varchar not null
          - userID int foreign key not null
          - bbsAvailable int not null
          - bbsDate datetime not null
          - bbsContent mediumtext not null
      - user
        - columns
          - userID int primary key, not null, auto_increment
          - userName varchar not null
          - userPassword varchar not null
          - userEmail varchar not null

- api 서버 구성도 localhost:3001에서 오픈
  - index.js == /
    세션 저장하는 페이지
    - api.js == /api
      - bbs.js == /api/bbs
        - 기능
          - post(/) need bbsTitle,userId,bbsContent
            게시물 데이터베이스에 저장
          - get(/) need bbsID
            해당 글번호 게시물 조회
          - get(/) need userID
            해당 ID유저가 작성한 게시글 조회
          - patch(/delete/:bbsID)
            게시글 삭제
          - patch(/update/:bbsID)
            게시글 수정
      - user.js == /api/user
        - 기능
          - post(/) body - name,password,email
            유저 정보 데이터베이스에 저장
          - get(/idfind) body - email
            이메일 보내서 아이디값 반환
          - get(/usercheck_for_pwreset) body - id,name
            비밀번호 초기화 페이지 접근 이메일 보내주기 => 이건 이후 구현예정
          - patch(/pwreset) body - id,현재패스워드
            비밀번호 변경, 변경후 세션 종료 기능 구현 필요
          - delete(/delete) - 회원정보 삭제
            이후 추가적으로 게시글삭제도 필요
      - login.js == /api/login
