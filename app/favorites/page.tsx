import { supabase } from '../../lib/supabase'
import AgentCard from '../../components/AgentCard'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import { Heart, Bot, ArrowLeft } from 'lucide-react'

export default async function FavoritesPage() {
  const { userId } = await auth()

  // 1. Security check: Must be logged in
  if (!userId) {
    return (
      <main className="min-h-screen bg-[#FAFAFA] dark:bg-zinc-950 flex flex-col items-center justify-center p-4 transition-colors duration-300">
        <Heart className="text-zinc-300 dark:text-zinc-700 mb-4" size={48} />
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Sign in to view favorites</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mb-6 text-center max-w-md">You need to be logged in to save and view your favorite AI agents.</p>
        <Link href="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold">Go Home</Link>
      </main>
    )
  }

  // 2. Fetch the bookmarks AND the agent data in a single join query
  const { data: bookmarks, error } = await supabase
    .from('bookmarks')
    .select(`
      id,
      created_at,
      agents (*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  // 3. Extract just the agent objects from the joined data
  // @ts-ignore - Supabase types can be tricky with joins, this safely maps it
  const favoriteAgents = bookmarks?.map(b => b.agents).filter(Boolean) || []

  return (
    <main className="min-h-screen bg-[#FAFAFA] dark:bg-zinc-950 text-zinc-900 dark:text-white font-sans pb-24 pt-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10">
          <Link href="/agents" className="inline-flex items-center text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors mb-6">
            <ArrowLeft size={16} className="mr-2" />
            Back to Directory
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-rose-50 dark:bg-rose-500/10 text-rose-500 rounded-xl">
              <Heart size={24} className="fill-rose-500" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">Your Favorites</h1>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed max-w-2xl">
            Agents you have bookmarked for quick access and future hiring.
          </p>
        </div>

        {/* Results Grid */}
        {error ? (
          <div className="p-8 text-red-500 bg-red-50 dark:bg-red-500/10 rounded-2xl border border-red-100 dark:border-red-500/20 font-bold shadow-sm">
            Error loading favorites: {error.message}
          </div>
        ) : favoriteAgents.length === 0 ? (
          
          /* Empty State */
          <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800 border-dashed rounded-3xl p-16 text-center flex flex-col items-center justify-center shadow-sm transition-colors duration-300">
             <div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 rounded-2xl flex items-center justify-center text-zinc-400 dark:text-zinc-500 mb-5">
                <Bot size={32} />
             </div>
             <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">No favorites yet</h3>
             <p className="text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed mb-6">You haven't bookmarked any digital workers yet. Browse the directory to find agents you love.</p>
             <Link href="/agents" className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors shadow-sm">
               Browse Directory
             </Link>
          </div>

        ) : (
          
          /* The Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-500">
            {favoriteAgents.map((agent: any) => (
              <AgentCard
                key={agent.id}
                id={agent.id}
                name={agent.name}
                headline={agent.headline}
                price={agent.price_structure || '$0'}
                model={agent.base_model || 'Unknown'}
              />
            ))}
          </div>
          
        )}
      </div>
    </main>
  )
}