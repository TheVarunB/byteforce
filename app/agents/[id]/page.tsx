import { supabase } from '../../../lib/supabase'
import Link from 'next/link'
import PricingCard from '../../../components/PricingCard'
import { 
  ArrowLeft, CheckCircle2, Star, Clock, ShieldCheck, 
  Play, Search, Info, Zap, Lock, FileJson, Share2, Layers, Boxes, Check, Bot, TrendingUp
} from 'lucide-react'

export default async function AgentProfile({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const { data: agent, error } = await supabase
    .from('agents')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !agent) {
    return (
      <div className="max-w-4xl mx-auto p-8 mt-24 text-center">
        <h1 className="text-2xl font-bold text-zinc-900 mb-4">Agent not found</h1>
        <Link href="/" className="text-blue-600 hover:underline">Go back to the marketplace</Link>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] pb-24 text-zinc-900 font-sans">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-zinc-200/80 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/agents" className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Back to Directory
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Main Agent Details Stack */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* ========================================== */}
            {/* 1. UPGRADED HERO HEADER BLOCK              */}
            {/* ========================================== */}
            <div className="bg-white rounded-3xl border border-zinc-200/80 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
              {/* Subtle background flair */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

              <div className="relative z-10">
                {/* Top row: Avatar & Core Info */}
                <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
                  
                  {/* Avatar with Online Status Indicator */}
                  <div className="relative shrink-0">
                    <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100/80 flex items-center justify-center text-blue-600 shadow-inner">
                      <Bot size={44} strokeWidth={1.5} />
                    </div>
                    {/* Live Status Dot */}
                    <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full border border-zinc-200/80 shadow-sm" title="Agent is online and ready">
                      <div className="h-4 w-4 bg-emerald-500 rounded-full border-2 border-white"></div>
                    </div>
                  </div>

                  <div className="flex-1">
                    {/* Metadata Tags */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">v2.1.0</span>
                      <span className="w-1 h-1 rounded-full bg-zinc-300"></span>
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Data Extraction</span>
                    </div>

                    {/* Title & Badges */}
                    <div className="flex flex-wrap items-center gap-2.5 mb-3">
                      <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">{agent.name}</h1>
                      <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200/80 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">
                        <CheckCircle2 size={12} /> Verified
                      </span>
                      <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200/80 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">
                        <TrendingUp size={12} /> Top Performer
                      </span>
                    </div>

                    {/* Headline */}
                    <p className="text-zinc-500 text-lg leading-relaxed mb-5 max-w-2xl">
                      {agent.headline}
                    </p>

                    {/* Creator Attribution */}
                    <div className="flex items-center gap-2 text-sm text-zinc-500 font-medium">
                      <span>Created by</span>
                      <div className="flex items-center gap-1.5 text-zinc-900 bg-zinc-100 px-2 py-1 rounded-lg border border-zinc-200/60 hover:bg-zinc-200 transition-colors cursor-pointer">
                        <div className="w-4 h-4 rounded-sm bg-blue-600 text-white flex items-center justify-center text-[8px] font-bold">BF</div>
                        Byteforce Labs
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom row: Hardcore Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-zinc-100">
                  <div>
                    <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-1">Success Rate</div>
                    <div className="text-2xl font-black text-zinc-900">99.8%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-1">Tasks Done</div>
                    <div className="text-2xl font-black text-zinc-900">12.4k</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-1">Avg Rating</div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-2xl font-black text-zinc-900">4.9</span>
                      <Star size={18} className="fill-yellow-400 text-yellow-400 -mt-0.5" />
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1 flex items-center gap-1">Avg Latency</div>
                    <div className="text-2xl font-black text-zinc-900 flex items-center gap-1">
                      &lt; 1.5s <Zap size={14} className="text-zinc-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ========================================== */}

            {/* Sandbox Section */}
            <div className="bg-white rounded-3xl border border-blue-200 shadow-sm overflow-hidden ring-4 ring-blue-50">
              <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Play size={16} fill="white" /> Agent Sandbox (Live Test)
                </h3>
                <span className="text-[10px] font-bold text-blue-100 bg-blue-700 px-2 py-1 rounded uppercase tracking-wider">
                  3-Row Free Preview
                </span>
              </div>
              <div className="p-6">
                <p className="text-sm text-zinc-600 mb-4">Paste a URL below to test this agent's parsing logic.</p>
                <div className="flex gap-2 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                    <input type="text" placeholder="https://example.com/products/..." className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-sm">Test Agent</button>
                </div>
                <div className="bg-zinc-950 rounded-xl p-4 overflow-x-auto shadow-inner border border-zinc-800">
                  <pre className="text-xs text-blue-400 font-mono leading-relaxed">
                    {`// Sandbox Output Preview\n[ \n  { "id": 1, "title": "Example A", "price": "$45.00" },\n  ... \n]`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Technical Specs Section */}
            <div className="bg-white rounded-3xl border border-zinc-200/80 p-8 shadow-sm">
              <h2 className="text-xl font-bold text-zinc-900 mb-6 border-b border-zinc-100 pb-4">Technical Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Zap size={18} className="text-zinc-400 mt-0.5" />
                    <div>
                      <div className="font-semibold text-zinc-900 text-sm">Processing Speed</div>
                      <div className="text-sm text-zinc-500 mt-1">Avg. 45s per 1k requests.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileJson size={18} className="text-zinc-400 mt-0.5" />
                    <div>
                      <div className="font-semibold text-zinc-900 text-sm">Input/Output</div>
                      <div className="text-sm text-zinc-500 mt-1">JSON, CSV, SQL supported.</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Lock size={18} className="text-zinc-400 mt-0.5" />
                    <div>
                      <div className="font-semibold text-zinc-900 text-sm">Security</div>
                      <div className="text-sm text-zinc-500 mt-1">GDPR & SOC2 Compliant. Zero retention.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ecosystem Compatibility */}
            <div className="bg-white rounded-3xl border border-zinc-200/80 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6 border-b border-zinc-100 pb-4">
                <h2 className="text-xl font-bold text-zinc-900">Ecosystem Compatibility</h2>
                <span className="inline-flex items-center gap-1.5 bg-zinc-900 text-white px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                  <Share2 size={12} /> Schema.org Ready
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Layers size={16} /> Interoperability
                  </h3>
                  <p className="text-sm text-zinc-600">Standardized JSON-LD output ready for direct agent-to-agent workflows.</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Boxes size={16} /> Works Well With
                  </h3>
                  <div className="space-y-2">
                    {['LeadGen Ultra', 'Auto-CRM Sync'].map((item) => (
                      <div key={item} className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border border-zinc-100 text-sm font-medium hover:border-blue-200 transition-colors cursor-pointer group">
                        <span className="text-zinc-700 group-hover:text-blue-700">{item}</span>
                        <Check size={14} className="text-blue-500" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-3xl border border-zinc-200/80 p-8 shadow-sm text-black">
              <h2 className="text-xl font-bold text-zinc-900 mb-6">About this Agent</h2>
              <div className="prose prose-zinc max-w-none">
                {agent.description ? (
                  <p className="text-zinc-600 leading-relaxed whitespace-pre-wrap">{agent.description}</p>
                ) : (
                  <p className="italic text-zinc-400">The creator hasn't added a detailed description yet.</p>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Pricing Component */}
          <div className="lg:col-span-1">
            <PricingCard priceStructure={agent.price_structure || '$20 / task'} />
          </div>

        </div>
      </div>
    </main>
  )
}