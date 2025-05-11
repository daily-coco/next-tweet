# Nomad Tweet Clone

## 프로젝트 소개

- 노마드코더 리액트 챌린지 7기 - 캐럿마켓 클론코딩 졸업과제 프로젝트
  ![Next.js](https://img.shields.io/badge/Next.js-14-black)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8)
  ![Prisma](https://www.prisma.io)
  ![Vercel](https://vercel.com)

## 기술 스택

- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **DB(Local)** : Prisma
- **배포** : Vercel

## 설치 및 실행 방법

```
// # 저장소 클론
git clone [repository-url]
npx create-next-app@14
// # 라이브러리 설치
npm install @heroicons/react
npm i zod
npm i validator
npm i @types/validator
```

## Setting

```
# Zod // 최신 버전 (6.6.0 - 250424 기준 )
npm i zod

# Prisma
npx prisma init
npm install @prisma/client@5.10.0 prisma@5.10.0

// ㄴ 마이그레이션 실행 : migration
npx prisma migrate dev

// ㄴ Prisma Studio 실행
npx prisma studio

// 비밀번호 해시화
npm i bcrypt
npm i @types/bcrypt

npm i iron-session

```

#vercel DB 연결
✨ npm i -g vercel
✨ 설치 이후에 `vercel login`을 입력 -> 로그인할 사이트 방향키로 선택 후 엔터 -> 로그인 진행( 브라우저로 계정 로그인 진행)
✨ 로그인 완료 이후 다시 터미널로 돌아와서 `vercel link`를 입력 후 'Y' 선택하고 이 다음은 아래와 같이 진행한다.
✨ vercel link 입력 후
✨ 아래 터미널로그처럼 진행하면됨.
Vercel CLI 41.7.4
? Set up “D:\next-tweet”? yes
? Which scope should contain your project? daily-coco's projects
? Found project “daily-cocos-projects/next-tweet”. Link to it? yes
✅ Linked to daily-cocos-projects/next-tweet (created .vercel)

✨ 위의 [✅ Linked to daily-cocos-projects/next-tweet (created .vercel)] 명령어까지 보여지고 나면 아래 명령어를 실행한다.

✨ vercel env pull .env.development.local

```

### 라이브러리

🔥비밀번호 생성기
1password password generator
ㄴhttps://1password.com/password-generator

#### 테스트 계정

1. tweet 계정 테스트
   - coco@tweet.com
   - !Qaz1qaz!!

## 라이센스

MIT

## Writer

NomadCoder_coco
```
