# 게시판 웹 서버 프로젝트


## 진행 기간
- 2023-01-16 ~ 2023-01-25
<br>

## 기술 스택
- Typescript
- Nest.js
- GraphQL
- PostgresQL
- TypeORM
- Passport
- JWT
- Bcrypt
- class-transformer
- class-validator
- Git
<br>

## 과제 개관
- Nest.js를 이용한 게시판 웹서버 구현
- GraphQLAPI 구성
- PostgresQL DB사용
- TypeORM로 DB제어
<br>

## 구현 사항
- GraphQL Query, Mutation 각각에 대해 입력 값이 존재하는 경우, 단일 입력이 아닌 한 DTO를 작성하여 제어

#### 회원가입, 로그인 및 인증
- Passport를 이용한 인증 전반 제어
- 이메일과 비밀번호를 이용하여 회원가입이 가능하고, 로그인이 가능하도록 구현
- class-validator을 이용하여 이메일 입력 형식 확인
- 전달받은 비밀번호를 bcrypt를 이용하여 암호화
- 로그인을 시도할 경우, 전달받은 이메일과 비밀번호의 정보를 db와 비교
- 일치하는 유저가 있는 경우, db에 저장된 user의 id정보를 바탕으로 jwt를 이용하여 엑세스 토큰을 발행함
- 발행한 토큰의 유효기간은 하루로 정하였음
- Header의 Authorization부분에 토큰 저장 여부를 확인
- 토큰을 decode하여 내부의 userId를 반환 
<br>

#### 게시판
- 글의 생성, 수정, 삭제, 코멘트 생성, 수정, 삭제시 jwt인증을 거침
- 게시판 불러오기 및 글 페이지는 인증을 요구하지 않음
- 생성순서 및 역순으로 게시판 정렬을 가능하도록 구현
- 제목, 내용 각각의 경우 글의 검색이 가능하도록 구현
- 댓글의 경우 대댓글 기능 구현

