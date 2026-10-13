import './globals.css';
import { inter } from '@/app/ui/fonts';

export const metadata = {
  title: 'Acme Dashboard',
  description: 'The official Next.js Learn Dashboard built with App Router.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}