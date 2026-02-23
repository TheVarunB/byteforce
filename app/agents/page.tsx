import { supabase } from '../../lib/supabase'
import SearchAndFilter from '../../components/SearchAndFilter'
import DirectoryGrid from '../../components/DirectoryGrid' // <-- Import the new Grid
import { Bot, FileText, Database, Cpu, Code, Activity } from 'lucide-react'
import { auth } from '@clerk/nextjs/server'

export default async function DirectoryPage({ searchParams }: { searchParams: Promise<{ q?: string, category?: string }> }) {
  
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || '';
  const category = resolvedParams.category || '';
  const { userId } = await auth();

  // Fetch the agents
  let dbQuery = supabase
    .from('agents')
    .select('*')
    .order('created_at', { ascending: false })

  if (query) {
    dbQuery = dbQuery.ilike('name', `%${query}%`)
  }

  if (category && category !== 'All') {
    dbQuery = dbQuery.eq('category', category)
  }

  const { data: agents, error } = await dbQuery

  // Fetch bookmarks
  let bookmarkedAgentIds: string[] = [];
  if (userId) {
    const { data: bookmarks } = await supabase
      .from('bookmarks')
      .select('agent_id')
      .eq('user_id', userId);
    
    if (bookmarks) {
      bookmarkedAgentIds = bookmarks.map(b => b.agent_id);
    }
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] dark:bg-zinc-950 text-zinc-900 dark:text-white font-sans pb-48 pt-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Visuals */}
        <div className="mb-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 relative overflow-hidden">
          <div className="max-w-2xl z-10">
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">Agent Directory</h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed">Browse the network of deployed AI agents. Filter by capabilities, categories, or search directly for the tools you need.</p>
          </div>

          <div className="hidden lg:block w-[520px] opacity-95 shrink-0 relative right-0">
            <style dangerouslySetInnerHTML={{__html: `
              .stage-box { transform-box: fill-box; transform-origin: center; animation: breathe 4s ease-in-out infinite; }
              .core-box { transform-box: fill-box; transform-origin: center; animation: glow 3s ease-in-out infinite; }
              @keyframes breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
              @keyframes glow { 0%, 100% { stroke-width: 2px; } 50% { stroke-width: 4px; } }
            `}} />
            <svg viewBox="0 0 800 320" className="w-full h-full drop-shadow-sm">
              <path id="flowPath" d="M80 160 L220 160 L360 100 L500 160 L640 160" fill="none" />
              <line x1="80" y1="160" x2="220" y2="160" stroke="currentColor" strokeWidth="2" className="text-zinc-200 dark:text-zinc-800 transition-colors" />
              <line x1="220" y1="160" x2="360" y2="100" stroke="currentColor" strokeWidth="2" className="text-zinc-200 dark:text-zinc-800 transition-colors" />
              <line x1="360" y1="100" x2="500" y2="160" stroke="currentColor" strokeWidth="2" className="text-zinc-200 dark:text-zinc-800 transition-colors" />
              <line x1="500" y1="160" x2="640" y2="160" stroke="currentColor" strokeWidth="2" className="text-zinc-200 dark:text-zinc-800 transition-colors" />
              <circle r="6" className="fill-blue-500 filter drop-shadow-[0_0_6px_rgba(59,130,246,0.8)]">
                <animateMotion dur="5s" repeatCount="indefinite"><mpath href="#flowPath"/></animateMotion>
              </circle>
              <circle r="4" className="fill-emerald-500 opacity-70 filter drop-shadow-[0_0_4px_rgba(16,185,129,0.8)]">
                <animateMotion dur="7s" repeatCount="indefinite"><mpath href="#flowPath"/></animateMotion>
              </circle>
              <rect x="50" y="130" width="60" height="60" rx="12" className="stage-box fill-white dark:fill-zinc-950 stroke-blue-600 dark:stroke-blue-500 stroke-2 transition-colors" />
              <foreignObject x="65" y="145" width="30" height="30"><FileText className="text-blue-600 dark:text-blue-500 w-full h-full" /></foreignObject>
              <rect x="190" y="130" width="60" height="60" rx="12" className="stage-box fill-white dark:fill-zinc-950 stroke-blue-600 dark:stroke-blue-500 stroke-2 transition-colors" />
              <foreignObject x="205" y="145" width="30" height="30"><Database className="text-blue-600 dark:text-blue-500 w-full h-full" /></foreignObject>
              <rect x="330" y="70" width="60" height="60" rx="12" className="core-box fill-white dark:fill-zinc-950 stroke-emerald-500 stroke-2 transition-colors" />
              <foreignObject x="345" y="85" width="30" height="30"><Cpu className="text-emerald-500 w-full h-full" /></foreignObject>
              <rect x="470" y="130" width="60" height="60" rx="12" className="stage-box fill-white dark:fill-zinc-950 stroke-blue-600 dark:stroke-blue-500 stroke-2 transition-colors" />
              <foreignObject x="485" y="145" width="30" height="30"><Code className="text-blue-600 dark:text-blue-500 w-full h-full" /></foreignObject>
              <rect x="610" y="130" width="60" height="60" rx="12" className="fill-white dark:fill-zinc-950 stroke-emerald-500 stroke-2 transition-colors" />
              <foreignObject x="625" y="145" width="30" height="30"><Activity className="text-emerald-500 w-full h-full" /></foreignObject>
              <polyline points="620,170 630,150 640,165 650,145 660,160" fill="none" className="stroke-emerald-500 stroke-[2.5px] stroke-linecap-round stroke-linejoin-round" opacity="0.5">
                <animate attributeName="points" dur="3s" repeatCount="indefinite" values="620,170 630,150 640,165 650,145 660,160; 620,165 630,155 640,150 650,160 660,145; 620,170 630,150 640,165 650,145 660,160" />
              </polyline>
            </svg>
          </div>
        </div>

        <SearchAndFilter />

        {error ? (
          <div className="p-8 text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-500/10 rounded-2xl border border-red-100 dark:border-red-500/20 font-bold shadow-sm">
            Error loading agents: {error.message}
          </div>
        ) : agents?.length === 0 ? (
          
          <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800 border-dashed rounded-3xl p-16 text-center flex flex-col items-center justify-center shadow-sm transition-colors duration-300">
             <div className="w-16 h-16 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50 rounded-2xl flex items-center justify-center text-zinc-400 dark:text-zinc-500 mb-5">
                <Bot size={32} />
             </div>
             <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">No agents found</h3>
             <p className="text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed">We couldn't find any digital workers matching your current filters. Try adjusting your search term or category.</p>
          </div>

        ) : (
          
          /* WE REPLACED THE STATIC MAP WITH OUR NEW CLIENT GRID */
          <DirectoryGrid agents={agents} bookmarkedAgentIds={bookmarkedAgentIds} />
          
        )}
      </div>
    </main>
  )
}