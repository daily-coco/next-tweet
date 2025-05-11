import type { Metadata } from 'next';
import './globals.css';
import { Nanum_Gothic } from 'next/font/google';

const nanumGothic = Nanum_Gothic({
  subsets: ['latin'], // korea 는 미지원에 따른 에러 출력
  weight: ['400', '700'], // 선택한 굵기
  display: 'swap',
  variable: '--font-nanum',
});
export const metadata: Metadata = {
  title: {
    template: '%s | Tweet',
    default: 'Tweet',
  },
  description: '오늘 하루를 Tweet으로 남겨봐요!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${nanumGothic.variable}`}>
      <body>{children}</body>
    </html>
  );
}
