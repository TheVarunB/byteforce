"use client"

import { useState } from 'react'
import { Heart } from 'lucide-react'
import { toggleBookmark } from '../app/actions/bookmarks'
import { useUser } from '@clerk/nextjs'

export default function BookmarkButton({ 
  agentId, 
  initialIsBookmarked,
  currentPath = "/"
}: { 
  agentId: string, 
  initialIsBookmarked: boolean,
  currentPath?: string
}) {
  const { isSignedIn } = useUser()
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked)
  const [isPending, setIsPending] = useState(false)

  const handleToggle = async () => {
    if (!isSignedIn) {
      alert("Please sign in to save agents to your favorites.")
      return
    }

    // Instantly flip the UI state so it feels lightning fast
    setIsBookmarked(!isBookmarked)
    setIsPending(true)

    try {
      // Run the server action in the background
      await toggleBookmark(agentId, currentPath)
    } catch (error) {
      // If the database fails, revert the heart back to its original state
      setIsBookmarked(!isBookmarked)
      console.error("Failed to toggle bookmark:", error)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <button 
      onClick={handleToggle}
      disabled={isPending}
      className="p-2.5 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
      title={isBookmarked ? "Remove from Favorites" : "Save to Favorites"}
    >
      <Heart 
        size={20} 
        className={`transition-colors duration-300 ${isBookmarked ? 'fill-rose-500 text-rose-500' : 'text-zinc-400 dark:text-zinc-500 group-hover:text-rose-400'}`} 
      />
    </button>
  )
}