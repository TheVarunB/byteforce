"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import { useState } from 'react'

export default function SearchAndFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Grab the current URL filters so the UI remembers what we clicked
  const currentCategory = searchParams.get('category') || 'All'
  const currentQuery = searchParams.get('q') || ''

  // Local state for the search input box
  const [searchTerm, setSearchTerm] = useState(currentQuery)

  const categories = [
    'All', 
    'Web Scraping & Data', 
    'Code Review & QA', 
    'Legal Synthesis', 
    'Creative & Copywriting'
  ]

  // When the user hits "Enter" or clicks "Search"
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateUrl(currentCategory, searchTerm)
  }

  // The engine that updates the URL
  const updateUrl = (cat: string, q: string) => {
    const params = new URLSearchParams()
    if (cat && cat !== 'All') params.set('category', cat)
    if (q) params.set('q', q)
    
    // Pushes the new URL (e.g., /agents?category=Data&q=scraper)
    router.push(`/agents?${params.toString()}`)
  }

  return (
    <div className="mb-10 space-y-6">
      
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative max-w-2xl">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search size={20} className="text-zinc-400 dark:text-zinc-500" />
        </div>
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or keyword (e.g., Scraper)..." 
          className="w-full pl-12 pr-4 py-4 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-none transition-all text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
        />
        <button type="submit" className="absolute inset-y-2 right-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 rounded-xl text-xs font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm">
          Search
        </button>
      </form>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => updateUrl(cat, searchTerm)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              currentCategory === cat 
                ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200/80 dark:border-blue-500/30 shadow-sm' 
                : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white shadow-sm'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}