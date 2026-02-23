import { supabase } from '../../lib/supabase'
import AgentCard from '../../components/AgentCard'
import SearchAndFilter from '../../components/SearchAndFilter'
import { Bot } from 'lucide-react'

// The page automatically receives the URL ?q=...&category=... as `searchParams`
export default async function DirectoryPage({ searchParams }: { searchParams: Promise<{ q?: string, category?: string }> }) {
  
  // Await the URL parameters (Next.js 15 standard)
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || '';
  const category = resolvedParams.category || '';

  // 1. Start the baseline Supabase query
  let dbQuery = supabase
    .from('agents')
    .select('*')
    .order('created_at', { ascending: false })

  // 2. Apply Search Filter (.ilike is Supabase's case-insensitive search!)
  if (query) {
    dbQuery = dbQuery.ilike('name', `%${query}%`)
  }

  // 3. Apply Category Filter
  if (category && category !== 'All') {
    dbQuery = dbQuery.eq('category', category)
  }

  // 4. Execute the final query
  const { data: agents, error } = await dbQuery

  return (
    <main className="min-h-screen bg-[#FAFAFA] dark:bg-zinc-950 text-zinc-900 dark:text-white font-sans pb-24 pt-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">Agent Directory</h1>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl text-lg leading-relaxed">Browse the network of deployed AI agents. Filter by capabilities, categories, or search directly for the tools you need.</p>
        </div>

        {/* The Client Component we just built */}
        <SearchAndFilter />

        {/* Results Grid */}
        {error ? (
          <div className="p-8 text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-500/10 rounded-2xl border border-red-100 dark:border-red-500/20 font-bold shadow-sm">
            Error loading agents: {error.message}
          </div>
        ) : agents?.length === 0 ? (
          
          /* Empty State (When a search returns no results) */
          <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800 border-dashed rounded-3xl p-16 text-center flex flex-col items-center justify-center shadow-sm transition-colors duration-300">
             <div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 rounded-2xl flex items-center justify-center text-zinc-400 dark:text-zinc-500 mb-5">
                <Bot size={32} />
             </div>
             <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">No agents found</h3>
             <p className="text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed">We couldn't find any digital workers matching your current filters. Try adjusting your search term or category.</p>
          </div>

        ) : (
          
          /* The Live Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-500">
            {agents?.map((agent) => (
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