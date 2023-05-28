# likelion_Wiki_api_server

## 현재 구현한 기능
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
  - /routes 폴더
    - /bbs 폴더
      - /bbs
    - /user 폴더
      - 로그인
      - 로그아웃
      - 내 정보 확인
    - api.js
      - bbs와 user api라우팅하는 위치
       
