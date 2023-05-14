# likelion_Wiki_api_server

## 구현 해야할 기능들

### 백

- api `http://localhost:3001`에서 오픈

  - db 연결을 위한 secret.json파일 구성

    - {
      "host": "localhost",
      "user": "사용자계정",
      "password": "비밀번호",
      "database": "db이름"
      }

  - server.js 파일에서 세션 비밀번호 설정
    - secret: process.env.SESSION_SECRET
    - cmd 창에 들어가서 set SESSION_SECRET="비밀번호" 입력 (cmd 창 켜두는 동안 유효)
    - 영구설정 setx SESSION_SECRET="비밀번호"
  - /api
    - 세션을 통한 인증과 cors허용
  - /api/user
    - 내 정보 조회
    - 내가 쓴 게시글도 다 볼 수 있게 만들기
  - /api/signup
    - 회원가입 구현
  - /api/login
    - 로그인후 세션 생성 + "/"페이지로 리다이렉션 구현
    - 수정필요(세션연결된 상태에서는 로그아웃버튼으로 변경되게)
  - /api/logout
    - 세션 파기
