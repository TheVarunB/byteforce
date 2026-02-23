"use server"

import { auth } from '@clerk/nextjs/server'
import { supabase } from '../../lib/supabase'
import { revalidatePath } from 'next/cache'

export async function hireAgent(agentId: string, currentPath: string) {
  const { userId } = await auth()
  
  if (!userId) {
    throw new Error("You must be logged in to hire an agent.")
  }

  // Check if they already hired this agent to prevent duplicates
  const { data: existingDeployment } = await supabase
    .from('deployments')
    .select('id')
    .eq('user_id', userId)
    .eq('agent_id', agentId)
    .single()

  if (!existingDeployment) {
    // If they haven't hired it yet, add it to the deployments ledger
    const { error } = await supabase
      .from('deployments')
      .insert([{ agent_id: agentId, user_id: userId }])

    if (error) {
      throw new Error(error.message)
    }
  }

  // Refresh the page data so the Review section instantly unlocks
  revalidatePath(currentPath)
}