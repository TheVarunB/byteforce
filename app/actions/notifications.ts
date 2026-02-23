"use server"

import { auth } from '@clerk/nextjs/server'
import { supabase } from '../../lib/supabase'

// 1. Fetch the user's latest 20 notifications
export async function getNotifications() {
  const { userId } = await auth()
  if (!userId) return []

  const { data } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(20)

  return data || []
}

// 2. Mark a single notification as read
export async function markAsRead(id: string) {
  const { userId } = await auth()
  if (!userId) return

  await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', id)
    .eq('user_id', userId)
}

// 3. Mark all notifications as read at once
export async function markAllAsRead() {
  const { userId } = await auth()
  if (!userId) return

  await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('user_id', userId)
}