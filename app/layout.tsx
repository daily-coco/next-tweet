import type { Metadata } from 'next';
import './globals.css';
import '@/styles/globals.css';

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
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
