// File: src/app/layout.js
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { LanguageProvider } from '../components/LanguageProvider';

export const metadata = {
  title: 'Carlos Pinto | Portfolio',
  description: 'Ethusiastic Developer with a passion for building new things.',
  viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0',
}

import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body className="bg-[var(--background)] overflow-x-hidden max-w-full">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          <div className="mx-auto w-full max-w-[2000px] overflow-hidden">
            <LanguageProvider>
              {children}
            </LanguageProvider>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}