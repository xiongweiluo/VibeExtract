import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VibeExtractor',
  description: 'Extract design tokens from any website in seconds.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="dark">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
