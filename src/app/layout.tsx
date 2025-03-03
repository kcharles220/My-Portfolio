// File: src/app/layout.js
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { LanguageProvider } from '../components/LanguageProvider';

export const metadata = {
  title: 'Carlos Pinto | Portfolio',
  description: 'Ethusiastic Developer with a passion for building new things.',
}

import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}