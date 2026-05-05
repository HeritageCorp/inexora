import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Inexora V2',
  description: 'A hybrid application using Next.js, Prisma, and Firebase',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <h1>Inexora V2</h1>
        </header>
        <main>{children}</main>
        <footer>
          <p>&copy; {new Date().getFullYear()} Inexora. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;