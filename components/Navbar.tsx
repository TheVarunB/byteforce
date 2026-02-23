"use client"

import ThemeToggle from './ThemeToggle'
import NotificationBell from './NotificationBell' // <-- NEW IMPORT
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Search, Rocket, Heart } from 'lucide-react'
import { useState } from 'react'
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { dark } from '@clerk/themes'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { theme } = useTheme()
  
  const [searchTerm, setSearchTerm] = useState('')

  const isActive = (path: string) => pathname === path

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/agents?q=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  return (
    <nav className="bg-white dark:bg-zinc-950 border-b border-zinc-200/80 dark:border-zinc-800 sticky top-0 z-50 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center gap-4">
          
          {/* Left side: Animated Logo & Wired-Up Search */}
          <div className="flex items-center gap-8 flex-1">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="shrink-0">
              <Link href="/" className="flex items-center gap-2 font-bold text-xl text-zinc-900 dark:text-white tracking-tight">
                <div className="w-8 h-8 bg-blue-600 rounded-lg text-white flex items-center justify-center font-black shadow-sm">
                  BF
                </div>
                Byteforce
              </Link>
            </motion.div>

            {/* SEARCH BAR */}
            <form onSubmit={handleSearch} className="hidden md:flex relative w-full max-w-md focus-within:scale-[1.02] focus-within:-translate-y-0.5 transition-all duration-300">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-zinc-400 dark:text-zinc-500" />
              </div>
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search agents, skills, creators..." 
                className="w-full pl-10 pr-4 py-2 bg-zinc-100 dark:bg-zinc-900 border border-transparent dark:border-zinc-800 rounded-lg text-sm focus:bg-white dark:focus:bg-zinc-950 focus:border-blue-300 dark:focus:border-blue-700 focus:ring-2 focus:ring-blue-500/20 transition-all text-zinc-900 dark:text-white placeholder:text-zinc-500"
              />
            </form>
          </div>

          {/* Right side: Navigation & Auth */}
          <div className="flex items-center gap-1 sm:gap-2">
            
            {/* Animated Links */}
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} className="hidden sm:block">
              <Link href="/" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/') ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}>
                Home
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} className="hidden sm:block">
              <Link href="/agents" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/agents') ? 'text-zinc-900 dark:text-white bg-zinc-100/80 dark:bg-zinc-800/80' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}>
                Agents
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} className="hidden sm:block">
              <Link href="/dashboard" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/dashboard') ? 'text-zinc-900 dark:text-white bg-zinc-100/80 dark:bg-zinc-800/80' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}>
                Dashboard
              </Link>
            </motion.div>
            
            <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-2 hidden sm:block"></div>

            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} className="hidden md:block">
              <Link href="/list-agent" className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                List Agent
              </Link>
            </motion.div>

            {/* Animated Waitlist Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden sm:block mr-2">
              <Link href="/waitlist" className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 px-3 py-2 rounded-md text-sm font-bold hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors border border-blue-200/50 dark:border-blue-500/20">
                <Rocket size={14} /> Waitlist
              </Link>
            </motion.div>

            {/* Theme Toggle */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="hidden sm:block">
              <ThemeToggle />
            </motion.div>

            {/* THE NEW NOTIFICATION BELL & FAVORITES (Only visible when logged in) */}
            <SignedIn>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="hidden sm:block">
                <NotificationBell />
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="hidden sm:block">
                <Link href="/favorites" className="p-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors flex items-center justify-center">
                  <Heart size={18} />
                </Link>
              </motion.div>
            </SignedIn>

            {/* CLERK AUTH BUTTONS */}
            <SignedOut>
              <SignInButton mode="modal">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2 rounded-lg text-sm font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm ml-2">
                  Sign In
                </motion.button>
              </SignInButton>
            </SignedOut>
            
            <SignedIn>
              <motion.div whileHover={{ scale: 1.05 }} className="ml-2 pl-2 border-l border-zinc-200 dark:border-zinc-800 flex items-center">
                <UserButton 
                  afterSignOutUrl="/" 
                  appearance={{
                    baseTheme: theme === 'dark' ? dark : undefined
                  }}
                />
              </motion.div>
            </SignedIn>
            
          </div>
        </div>
      </div>
    </nav>
  )
}