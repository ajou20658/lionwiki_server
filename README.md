# likelion_Wiki_api_server

## 구현 해야할 기능들

### 백

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
