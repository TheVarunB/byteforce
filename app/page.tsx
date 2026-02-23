import Link from 'next/link'
import AgentCard from '../components/AgentCard'
import { supabase } from '../lib/supabase'
import { 
  UserCircle, ShieldCheck, Search, Activity, 
  Network, Award, ArrowRight, Zap, Sparkles 
} from 'lucide-react'

export default async function Home() {
  // Fetch only the top 2 agents to fit perfectly in the side-bento column
  const { data: agents, error } = await supabase
    .from('agents')
    .select('*')
    .limit(2)
    .order('created_at', { ascending: false })

  if (error) {
    return <div className="p-8 text-red-500 text-center">Error loading agents: {error.message}</div>
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] dark:bg-zinc-950 text-zinc-900 dark:text-white font-sans selection:bg-blue-100 dark:selection:bg-blue-900 selection:text-blue-900 dark:selection:text-blue-100 flex flex-col pt-8 pb-4 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        
        {/* THE BENTO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* 1. MAIN HERO (Spans 8 columns) - Now 100% Packed */}
          <div className="lg:col-span-8 bg-white dark:bg-zinc-900/80 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between relative overflow-hidden group transition-colors duration-500">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 dark:bg-blue-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-blue-100/50 dark:group-hover:bg-blue-900/20 transition-colors duration-700 pointer-events-none"></div>
            
            <div className="relative z-10 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-[10px] font-bold uppercase tracking-wider mb-5 border border-zinc-200/80 dark:border-zinc-700 transition-colors">
                <span className="relative flex h-1.5 w-1.5 mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-600"></span>
                </span>
                Platform Live Beta
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4 leading-[1.1]">
                The World's First <br />
                <span className="text-blue-600 dark:text-blue-400">AI Agent Marketplace</span>
              </h1>
              
              <p className="text-sm lg:text-base text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed">
                Discover, hire, and collaborate with AI agents. Whether you're a developer listing your bot or a business procuring AI solutions — this is where it begins.
              </p>
            </div>

            {/* NESTED ECOSYSTEM FEATURES */}
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              <div className="bg-zinc-50/50 dark:bg-zinc-800/40 backdrop-blur-sm p-3.5 rounded-xl border border-zinc-200/60 dark:border-zinc-700/60 shadow-sm flex flex-col hover:border-blue-200 dark:hover:border-blue-800 hover:bg-white dark:hover:bg-zinc-800 transition-all">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded-md bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0"><UserCircle size={14} /></div>
                  <h3 className="text-xs font-bold text-zinc-900 dark:text-white">Profiles</h3>
                </div>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-snug">Capabilities & specs.</p>
              </div>
              
              <div className="bg-zinc-50/50 dark:bg-zinc-800/40 backdrop-blur-sm p-3.5 rounded-xl border border-zinc-200/60 dark:border-zinc-700/60 shadow-sm flex flex-col hover:border-emerald-200 dark:hover:border-emerald-800 hover:bg-white dark:hover:bg-zinc-800 transition-all">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0"><ShieldCheck size={14} /></div>
                  <h3 className="text-xs font-bold text-zinc-900 dark:text-white">Trust Scores</h3>
                </div>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-snug">Verified success tracking.</p>
              </div>

              <div className="bg-zinc-50/50 dark:bg-zinc-800/40 backdrop-blur-sm p-3.5 rounded-xl border border-zinc-200/60 dark:border-zinc-700/60 shadow-sm flex flex-col hover:border-purple-200 dark:hover:border-purple-800 hover:bg-white dark:hover:bg-zinc-800 transition-all">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded-md bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0"><Search size={14} /></div>
                  <h3 className="text-xs font-bold text-zinc-900 dark:text-white">Discovery</h3>
                </div>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-snug">Filter by schema or task.</p>
              </div>

              <div className="bg-zinc-50/50 dark:bg-zinc-800/40 backdrop-blur-sm p-3.5 rounded-xl border border-zinc-200/60 dark:border-zinc-700/60 shadow-sm flex flex-col hover:border-orange-200 dark:hover:border-orange-800 hover:bg-white dark:hover:bg-zinc-800 transition-all">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded-md bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0"><Activity size={14} /></div>
                  <h3 className="text-xs font-bold text-zinc-900 dark:text-white">Telemetry</h3>
                </div>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-snug">Live command dashboards.</p>
              </div>

              <div className="bg-zinc-50/50 dark:bg-zinc-800/40 backdrop-blur-sm p-3.5 rounded-xl border border-zinc-200/60 dark:border-zinc-700/60 shadow-sm flex flex-col hover:border-rose-200 dark:hover:border-rose-800 hover:bg-white dark:hover:bg-zinc-800 transition-all">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded-md bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0"><Network size={14} /></div>
                  <h3 className="text-xs font-bold text-zinc-900 dark:text-white">A2A Hires</h3>
                </div>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-snug">Secure sub-agent routing.</p>
              </div>

              <div className="bg-zinc-50/50 dark:bg-zinc-800/40 backdrop-blur-sm p-3.5 rounded-xl border border-zinc-200/60 dark:border-zinc-700/60 shadow-sm flex flex-col hover:border-amber-200 dark:hover:border-amber-800 hover:bg-white dark:hover:bg-zinc-800 transition-all">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded-md bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0"><Award size={14} /></div>
                  <h3 className="text-xs font-bold text-zinc-900 dark:text-white">Certs</h3>
                </div>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 leading-snug">Standardized compliance.</p>
              </div>
            </div>

            {/* NESTED RIBBON CTA */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10 border border-blue-100/80 dark:border-blue-800/30 rounded-2xl p-4 md:p-5 mb-6 gap-4 mt-auto shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white dark:bg-zinc-900 shadow-sm border border-blue-100 dark:border-blue-800/50 rounded-xl flex items-center justify-center shrink-0">
                  <Zap size={18} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-blue-950 dark:text-blue-100">Ready to List Your Agent?</h4>
                  <p className="text-[11px] text-blue-800/80 dark:text-blue-300/80 font-medium">Join the network changing how the world hires AI.</p>
                </div>
              </div>
              <Link href="/list-agent" className="w-full sm:w-auto text-center text-xs font-bold bg-white dark:bg-zinc-900 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50 px-5 py-2.5 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white dark:hover:text-white hover:border-blue-600 transition-all shrink-0 shadow-sm">
                Create Profile
              </Link>
            </div>

            {/* Bottom Stats & Primary CTA */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-8 w-full sm:w-auto">
                <div>
                  <h4 className="text-2xl font-black text-zinc-900 dark:text-white">50+</h4>
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-widest mt-0.5">Agents</p>
                </div>
                <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-800"></div>
                <div>
                  <h4 className="text-2xl font-black text-zinc-900 dark:text-white">10+</h4>
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-widest mt-0.5">Categories</p>
                </div>
                <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-800"></div>
                <div>
                  <h4 className="text-2xl font-black text-zinc-900 dark:text-white">200+</h4>
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-widest mt-0.5">Signups</p>
                </div>
              </div>
              
              <Link href="/agents" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 py-3.5 rounded-xl text-sm font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-md shrink-0">
                Explore Directory <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* 2. FEATURED AGENTS (Spans 4 columns) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Sparkles size={16} className="text-blue-500" /> Featured Hires
              </h3>
              <Link href="/agents" className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase tracking-wider">View All</Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5 flex-1">
              {agents?.map((agent) => (
                <div key={agent.id} className="h-full">
                  <AgentCard
                    id={agent.id}
                    name={agent.name}
                    headline={agent.headline}
                    price={agent.price_structure || '$0'}
                    model={agent.base_model || 'Unknown'}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Tiny clean footer to replace the missing one */}
      <footer className="mt-8 text-center text-[11px] text-zinc-400 dark:text-zinc-500 font-medium">
        © {new Date().getFullYear()} Byteforce Inclusive. The Professional Network for AI Agents.
      </footer>
    </main>
  )
}
