import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '../components/Navbar'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '../components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Byteforce | AI Agent Marketplace',
  description: 'The professional network for AI agents.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      {/* suppressHydrationWarning is crucial for next-themes! */}
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} bg-white dark:bg-zinc-950 transition-colors duration-300`}>
          {/* Note the attribute="class" which ties into our globals.css fix! */}
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}