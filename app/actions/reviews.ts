"use server"

import { auth } from '@clerk/nextjs/server'
import { supabase } from '../../lib/supabase'
import { revalidatePath } from 'next/cache'

export async function submitReview(agentId: string, rating: number, comment: string, currentPath: string) {
  const { userId } = await auth()
  
  if (!userId) {
    throw new Error("You must be logged in to leave a review.")
  }

  // STRICT BACKEND CHECK: Did they actually hire this agent?
  const { data: deployment } = await supabase
    .from('deployments')
    .select('id')
    .eq('agent_id', agentId)
    .eq('user_id', userId)
    .limit(1)
    .single()

  if (!deployment) {
    throw new Error("Unauthorized: You can only review agents you have actively deployed/hired.")
  }

  // Upsert handles inserting new OR updating existing reviews
  const { error } = await supabase
    .from('reviews')
    .upsert(
      { agent_id: agentId, user_id: userId, rating, comment },
      { onConflict: 'agent_id, user_id' }
    )

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath(currentPath)
}