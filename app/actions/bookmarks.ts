"use server"

import { auth } from '@clerk/nextjs/server'
import { supabase } from '../../lib/supabase'
import { revalidatePath } from 'next/cache'

export async function toggleBookmark(agentId: string, currentPath: string) {
  const { userId } = await auth()
  
  if (!userId) {
    throw new Error("You must be logged in to bookmark an agent.")
  }

  // 1. Check if the bookmark already exists
  const { data: existingBookmark } = await supabase
    .from('bookmarks')
    .select('id')
    .eq('user_id', userId)
    .eq('agent_id', agentId)
    .single()

  if (existingBookmark) {
    // 2. If it exists, remove it (Un-favorite)
    await supabase.from('bookmarks').delete().eq('id', existingBookmark.id)
  } else {
    // 3. If it doesn't exist, create it (Favorite)
    await supabase.from('bookmarks').insert([{ user_id: userId, agent_id: agentId }])
  }

  // 4. Tell Next.js to refresh the cached data for the page the user is currently on
  revalidatePath(currentPath)
}