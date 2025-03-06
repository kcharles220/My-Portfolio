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
      <body className="bg-[var(--background)]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          <div className="mx-auto max-w-[2000px] px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
            <LanguageProvider>
              {children}
            </LanguageProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}