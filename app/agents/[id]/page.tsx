import { supabase } from '../../../lib/supabase'
import Link from 'next/link'
import PricingCard from '../../../components/PricingCard'
import BookmarkButton from '../../../components/BookmarkButton'
import ReviewSection from '../../../components/ReviewSection'
import { auth } from '@clerk/nextjs/server'
import { 
  ArrowLeft, CheckCircle2, Star, ShieldCheck, 
  Zap, Lock, FileJson, Share2, Layers, 
  Boxes, Check, Bot, Cpu, Database, Terminal, Globe
} from 'lucide-react'

export default async function AgentProfile({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const { userId } = await auth();

  // 1. Fetch Agent
  const { data: agent, error } = await supabase
    .from('agents')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !agent) {
    return (
      <div className="max-w-4xl mx-auto p-8 mt-24 text-center">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Agent not found</h1>
        <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">Go back to the marketplace</Link>
      </div>
    )
  }

  // 2. Fetch User Specific States (Bookmarks & Deployments)
  let isBookmarked = false;
  let hasHired = false;

  if (userId) {
    const { data: bookmark } = await supabase.from('bookmarks').select('id').eq('user_id', userId).eq('agent_id', id).single()
    if (bookmark) isBookmarked = true;

    const { data: deployment } = await supabase.from('deployments').select('id').eq('user_id', userId).eq('agent_id', id).limit(1).single()
    if (deployment) hasHired = true;
  }

  // 3. Fetch Reviews & Calculate True Average
  const { data: reviewsData } = await supabase
    .from('reviews')
    .select('*')
    .eq('agent_id', id)
    .order('created_at', { ascending: false })

  const reviews = reviewsData || []
  const reviewCount = reviews.length
  const averageRating = reviewCount > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviewCount).toFixed(1) 
    : 0

  return (
    <main className="min-h-screen bg-[#FAFAFA] dark:bg-zinc-950 pb-24 text-zinc-900 dark:text-white font-sans transition-colors duration-300">
      
      <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200/80 dark:border-zinc-800 sticky top-0 z-40 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/agents" className="inline-flex items-center text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Back to Directory
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. HERO HEADER */}
            <div className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden transition-colors">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 dark:bg-blue-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8 gap-4">
                  <div className="flex flex-col sm:flex-row items-start gap-6">
                    <div className="relative shrink-0">
                      <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-zinc-800 dark:to-zinc-800 border border-blue-100/80 dark:border-zinc-700 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-inner">
                        <Bot size={44} strokeWidth={1.5} />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-white dark:bg-zinc-900 p-1 rounded-full border border-zinc-200/80 dark:border-zinc-700 shadow-sm">
                        <div className="h-4 w-4 bg-emerald-500 rounded-full border-2 border-white dark:border-zinc-900"></div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">{agent.version || 'v1.0.0'}</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></span>
                        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">{agent.category || 'AI Agent'}</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2.5 mb-3">
                        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">{agent.name}</h1>
                        <span className="inline-flex items-center gap-1 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200/80 dark:border-blue-500/20 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">
                          <CheckCircle2 size={12} /> Verified
                        </span>
                      </div>

                      <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed mb-5 max-w-2xl">
                        {agent.headline}
                      </p>

                      <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                        <span>Created by</span>
                        <div className="flex items-center gap-1.5 text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-lg border border-zinc-200/60 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer">
                          <div className="w-4 h-4 rounded-sm bg-blue-600 text-white flex items-center justify-center text-[8px] font-bold">BF</div>
                          Byteforce Labs
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 mt-2 sm:mt-0">
                    <BookmarkButton agentId={agent.id} initialIsBookmarked={isBookmarked} currentPath={`/agents/${agent.id}`} />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                  <div>
                    <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-1">Success Rate</div>
                    <div className="text-2xl font-black text-zinc-900 dark:text-white">99.8%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-1">Tasks Done</div>
                    <div className="text-2xl font-black text-zinc-900 dark:text-white">12.4k</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-1">Avg Rating</div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-2xl font-black text-zinc-900 dark:text-white">{averageRating || 'N/A'}</span>
                      <Star size={18} className="fill-yellow-400 text-yellow-400 -mt-0.5" />
                      <span className="text-xs text-zinc-400 ml-1">({reviewCount})</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-1">Avg Latency</div>
                    <div className="text-2xl font-black text-zinc-900 dark:text-white flex items-center gap-1">
                      {agent.avg_latency || '< 1.5s'} <Zap size={14} className="text-zinc-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. CAPABILITIES */}
            <div className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 p-8 shadow-sm">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-4">Capabilities & Trust</h2>
              <div className="flex flex-wrap gap-3">
                {agent.is_live_access && <span className="inline-flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 px-3 py-1.5 rounded-lg text-xs font-bold border border-indigo-200/50 dark:border-indigo-500/20"><Globe size={14} /> Live Web Access</span>}
                {agent.is_stateful && <span className="inline-flex items-center gap-1.5 bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400 px-3 py-1.5 rounded-lg text-xs font-bold border border-orange-200/50 dark:border-orange-500/20"><Database size={14} /> Stateful Memory</span>}
                {agent.has_soc2 && <span className="inline-flex items-center gap-1.5 bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 px-3 py-1.5 rounded-lg text-xs font-bold border border-rose-200/50 dark:border-rose-500/20"><ShieldCheck size={14} /> SOC2 Type II</span>}
                {agent.has_hitl && <span className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-200/50 dark:border-blue-500/20"><CheckCircle2 size={14} /> Human-in-the-Loop</span>}
                {agent.has_refund_guarantee && <span className="inline-flex items-center gap-1.5 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 px-3 py-1.5 rounded-lg text-xs font-bold border border-green-200/50 dark:border-green-500/20"><Check size={14} /> Output Guarantee</span>}
              </div>
            </div>

            {/* 3. TECHNICAL SPECS */}
            <div className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 p-8 shadow-sm">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-4">Technical Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-3"><Cpu size={18} className="text-zinc-400 mt-0.5" /><div><div className="font-semibold text-zinc-900 dark:text-white text-sm">Base Engine</div><div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{agent.base_model || 'Unknown Model'} <br/><span className="text-xs opacity-80">Memory: {agent.context_window || 'Standard'}</span></div></div></div>
                  <div className="flex items-start gap-3"><Layers size={18} className="text-zinc-400 mt-0.5" /><div><div className="font-semibold text-zinc-900 dark:text-white text-sm">Toolbox / Stack</div><div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{agent.toolbox || 'Standard Tooling'}</div></div></div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start gap-3"><FileJson size={18} className="text-zinc-400 mt-0.5" /><div><div className="font-semibold text-zinc-900 dark:text-white text-sm">Input & Output</div><div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1"><strong>In:</strong> {agent.input_formats || 'Text/JSON'}<br/><strong>Out:</strong> {agent.output_format || 'Structured JSON'}</div></div></div>
                  <div className="flex items-start gap-3"><Zap size={18} className="text-zinc-400 mt-0.5" /><div><div className="font-semibold text-zinc-900 dark:text-white text-sm">Performance</div><div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{agent.max_throughput || 'Standard Concurrency'}</div></div></div>
                </div>
              </div>
            </div>

            {/* 4. API & INTEGRATION */}
            <div className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 p-8 shadow-sm">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-4">API & Integration</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800"><div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Protocol</div><div className="text-sm font-medium text-zinc-900 dark:text-white">{agent.protocol || 'REST API'}</div></div>
                <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800"><div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Auth Method</div><div className="text-sm font-medium text-zinc-900 dark:text-white">{agent.auth_method || 'API Key'}</div></div>
                <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800"><div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Data Retention</div><div className="text-sm font-medium text-zinc-900 dark:text-white">{agent.data_retention || 'Standard'}</div></div>
              </div>
              <div className="mb-6"><label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 block">Endpoint URL</label><div className="w-full bg-zinc-100 dark:bg-zinc-950 px-4 py-3 rounded-xl font-mono text-sm text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 flex items-center gap-2"><Terminal size={14} className="text-blue-500" />{agent.endpoint_url || 'https://api.byteforce.io/agent/placeholder'}</div></div>
              {agent.output_schema && (<div><label className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 block">Expected Output Schema</label><pre className="w-full bg-zinc-950 p-4 rounded-xl font-mono text-xs text-emerald-400 border border-zinc-800 overflow-x-auto">{agent.output_schema}</pre></div>)}
            </div>

            {/* 5. ABOUT SECTION */}
            <div className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 p-8 shadow-sm">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-4">About this Agent</h2>
              <div className="prose prose-zinc dark:prose-invert max-w-none">
                {agent.description ? <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap">{agent.description}</p> : <p className="italic text-zinc-400 dark:text-zinc-600">The creator hasn't added a detailed description yet.</p>}
              </div>
            </div>

            {/* 6. REVIEWS COMPONENT */}
            <ReviewSection agentId={agent.id} existingReviews={reviews} hasHired={hasHired} />

          </div>

          <div className="lg:col-span-1">
            {/* WE ADDED agentId AND hasHired HERE! */}
            <PricingCard priceStructure={agent.price_structure || '$20 / task'} agentId={agent.id} hasHired={hasHired} />
          </div>

        </div>
      </div>
    </main>
  )
}