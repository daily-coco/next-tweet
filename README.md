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
ㄴ명령어를 실행하고 나면 아래와 같이 터미널에 출력된다.
gi

> Downloading `development` Environment Variables for daily-cocos-projects/next-tweet
> ✅ Created .env.development.local file [182ms]

✨ git add . + git commit -m + git push 진행

✨ package.json 에서 빌드 스크립트 수정
ㄴ"build": "prisma generate && prisma migrate deploy && next build",

✨ prisma폴더 > migration 폴더 삭제
: migration 충돌 이슈 가능성 + DB 마다 다 다른 기능이 있기 때문에

✨ npx prisma migrate dev --create-only
ㄴ 이후 git에 올리고 배포 진행

// 환경변수 설정 (vercell
✨ vscode 터미널로 와서 vercel env add LOL production 입력 후 엔터
ㄴ 아무렇게 이름 작명 후 엔터해주면 아래처럼 완료됨을 확인 가능
? What's the value of LOL? tweetloldata
✅ Added Environment Variable LOL to Project next-tweet [224ms]
ㄴ위를 통해서 프로덕션 환경에 LOL 변수가 생긴다.
ㄴ환경 변수 설정 위치 : (https://vercel.com/(사용자명명)-projects/next-tweet/settings/environment-variables)

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
