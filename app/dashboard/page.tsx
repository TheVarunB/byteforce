"use client"

import { useState } from 'react'
import { 
  LayoutDashboard, Briefcase, Activity, Terminal, AlertCircle, 
  TrendingUp, DollarSign, Clock, Settings, Network, CornerDownRight, 
  Copy, DownloadCloud, CheckCircle2, XCircle, Cpu, Zap, BarChart3
} from 'lucide-react'

export default function DashboardPage() {
  const [view, setView] = useState<'consumer' | 'provider'>('consumer')

  return (
    <main className="min-h-screen bg-[#FAFAFA] dark:bg-zinc-950 text-zinc-900 dark:text-white font-sans selection:bg-blue-100 dark:selection:bg-blue-900 selection:text-blue-900 dark:selection:text-blue-100 pb-24 transition-colors duration-300">
      
      {/* 1. Header & Context Toggle */}
      <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200/80 dark:border-zinc-800 sticky top-16 z-40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Command Center</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Manage your active deployments, economics, and fleet health.</p>
          </div>
          
          {/* Segmented Toggle Switch */}
          <div className="bg-zinc-100/80 dark:bg-zinc-800 p-1 rounded-xl inline-flex self-start sm:self-auto border border-zinc-200/50 dark:border-zinc-700">
            <button 
              onClick={() => setView('consumer')}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${view === 'consumer' ? 'bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-sm border border-zinc-200/50 dark:border-zinc-600' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'}`}
            >
              <Briefcase size={16} /> Employer View
            </button>
            <button 
              onClick={() => setView('provider')}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${view === 'provider' ? 'bg-white dark:bg-zinc-700 text-indigo-600 dark:text-indigo-400 shadow-sm border border-zinc-200/50 dark:border-zinc-600' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'}`}
            >
              <Cpu size={16} /> Creator View
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* ========================================== */}
        {/* CONSUMER VIEW (The Employer)               */}
        {/* ========================================== */}
        {view === 'consumer' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Top Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg"><Activity size={20} /></div>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md">Live</span>
                </div>
                <div className="text-3xl font-black text-zinc-900 dark:text-white mb-1">4</div>
                <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Active Deployments</div>
              </div>
              
              <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-lg"><Zap size={20} /></div>
                  <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md">Per Hour</span>
                </div>
                <div className="text-3xl font-black text-zinc-900 dark:text-white mb-1">$12.40</div>
                <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Current Burn Rate</div>
              </div>

              <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-2xl rounded-full"></div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="p-2 bg-zinc-900 dark:bg-zinc-800 text-white rounded-lg"><DollarSign size={20} /></div>
                </div>
                <div className="text-3xl font-black text-zinc-900 dark:text-white mb-1 relative z-10">$145.00</div>
                <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400 relative z-10">Est. Cost at Completion</div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column (Wider) */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Active Tasks & Progress */}
                <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2"><Clock size={18} className="text-blue-500 dark:text-blue-400"/> Live Operations</h3>
                  
                  <div className="space-y-6">
                    {/* Task 1 */}
                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <div>
                          <h4 className="font-bold text-sm text-zinc-900 dark:text-white">DataScraper Pro v2</h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">Scraping 10,000 Amazon URLs</p>
                        </div>
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400">64% Complete</span>
                      </div>
                      <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2.5 overflow-hidden">
                        <div className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full" style={{ width: '64%' }}></div>
                      </div>
                    </div>

                    {/* Task 2 */}
                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <div>
                          <h4 className="font-bold text-sm text-zinc-900 dark:text-white">Legal Synthesis Bot</h4>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">Analyzing 400-page PDF contract</p>
                        </div>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">92% Complete</span>
                      </div>
                      <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2.5 overflow-hidden">
                        <div className="bg-emerald-500 dark:bg-emerald-400 h-2.5 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Agent-to-Agent Ledger */}
                <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2"><Network size={18} className="text-purple-500 dark:text-purple-400"/> A2A Ledger (Sub-contracts)</h3>
                    <span className="bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">Live Map</span>
                  </div>
                  
                  <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 font-mono text-sm">
                    <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200 font-bold mb-3">
                      <Cpu size={14} className="text-blue-600 dark:text-blue-400"/> Main Agent: Auto-CRM Sync
                    </div>
                    
                    {/* Nested Sub-Agent 1 */}
                    <div className="ml-6 border-l-2 border-zinc-200 dark:border-zinc-800 pl-4 py-2 relative">
                      <CornerDownRight size={14} className="absolute -left-0.5 top-3 text-zinc-400 dark:text-zinc-600 -translate-x-full" />
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
                            <Cpu size={12} className="text-emerald-500 dark:text-emerald-400"/> Hired: Email Finder Pro
                          </div>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans">Task: Find executive emails for scraped domains.</p>
                        </div>
                        <span className="text-xs text-zinc-400 dark:text-zinc-500 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-2 py-1 rounded">Cost: $0.12</span>
                      </div>
                    </div>

                    {/* Nested Sub-Agent 2 */}
                    <div className="ml-6 border-l-2 border-zinc-200 dark:border-zinc-800 pl-4 py-2 relative">
                      <CornerDownRight size={14} className="absolute -left-0.5 top-3 text-zinc-400 dark:text-zinc-600 -translate-x-full" />
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 font-semibold mb-1">
                            <Cpu size={12} className="text-orange-500 dark:text-orange-400"/> Hired: Data Validator
                          </div>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans">Task: Cleanse JSON syntax before CRM push.</p>
                        </div>
                        <span className="text-xs text-zinc-400 dark:text-zinc-500 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-2 py-1 rounded">Cost: $0.05</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column (Narrower) */}
              <div className="space-y-6">
                
                {/* Output Feed & Logs */}
                <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2"><Terminal size={16} className="text-zinc-400 dark:text-zinc-500"/> Recent Outputs</h3>
                  
                  <div className="space-y-3 mb-4">
                    <div className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-lg flex justify-between items-center group">
                      <div className="flex items-center gap-2">
                        <FileJson size={14} className="text-green-600 dark:text-green-400" />
                        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">amazon_data_batch4.json</span>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                        <button className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded text-zinc-500 dark:text-zinc-400"><Copy size={12} /></button>
                        <button className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded text-zinc-500 dark:text-zinc-400"><DownloadCloud size={12} /></button>
                      </div>
                    </div>
                    <div className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-lg flex justify-between items-center group">
                      <div className="flex items-center gap-2">
                        <FileText size={14} className="text-blue-600 dark:text-blue-400" />
                        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">legal_summary_v1.md</span>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                        <button className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded text-zinc-500 dark:text-zinc-400"><Copy size={12} /></button>
                        <button className="p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded text-zinc-500 dark:text-zinc-400"><DownloadCloud size={12} /></button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Error Console */}
                <div className="bg-zinc-950 dark:bg-zinc-950 rounded-2xl border border-zinc-800 p-6 shadow-lg">
                  <h3 className="text-sm font-bold text-zinc-100 mb-4 flex items-center gap-2"><AlertCircle size={16} className="text-red-500"/> Error Console</h3>
                  <div className="space-y-3 font-mono text-[10px]">
                    <div className="text-red-400 bg-red-500/10 p-2 rounded border border-red-500/20">
                      <span className="font-bold text-red-500 mr-2">[429]</span> 
                      Rate Limit Exceeded on Sub-Agent (Email Finder). Retrying in 5s...
                    </div>
                    <div className="text-yellow-400 bg-yellow-500/10 p-2 rounded border border-yellow-500/20">
                      <span className="font-bold text-yellow-500 mr-2">[WARN]</span> 
                      Payload size exceeds 8k tokens. Truncating history.
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* PROVIDER VIEW (The Creator)                */}
        {/* ========================================== */}
        {view === 'provider' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Top Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-sm">
                <div className="text-[11px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-widest mb-2 flex items-center gap-1"><TrendingUp size={12}/> Net Revenue (30d)</div>
                <div className="text-3xl font-black text-zinc-900 dark:text-white mb-1">$4,250</div>
                <div className="text-xs font-medium text-emerald-500 dark:text-emerald-400 flex items-center gap-1">+12.5% from last month</div>
              </div>
              
              <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-sm">
                <div className="text-[11px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-widest mb-2 flex items-center gap-1"><Activity size={12}/> Utilization Rate</div>
                <div className="text-3xl font-black text-zinc-900 dark:text-white mb-1">78%</div>
                <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-1">Fleet active time</div>
              </div>

              <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-sm">
                <div className="text-[11px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-widest mb-2 flex items-center gap-1"><CheckCircle2 size={12}/> Global Success</div>
                <div className="text-3xl font-black text-zinc-900 dark:text-white mb-1">99.1%</div>
                <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-1">Tasks completed w/o error</div>
              </div>

              <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-sm">
                <div className="text-[11px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-widest mb-2 flex items-center gap-1"><BarChart3 size={12}/> API Calls</div>
                <div className="text-3xl font-black text-zinc-900 dark:text-white mb-1">142k</div>
                <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-1">Across all deployed agents</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column (Fleet Health) */}
              <div className="lg:col-span-2 space-y-6">
                
                <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2"><Cpu size={18} className="text-indigo-500 dark:text-indigo-400"/> Active Roster & Health</h3>
                    <button className="text-sm text-blue-600 dark:text-blue-400 font-bold hover:underline">Deploy New Agent</button>
                  </div>
                  
                  {/* Roster Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-zinc-100 dark:border-zinc-800 text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                          <th className="pb-3 font-bold">Agent Name</th>
                          <th className="pb-3 font-bold">Status</th>
                          <th className="pb-3 font-bold">Avg Latency</th>
                          <th className="pb-3 font-bold">Rating</th>
                          <th className="pb-3 font-bold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        <tr className="border-b border-zinc-50 dark:border-zinc-800/50 group hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                          <td className="py-4 font-bold text-zinc-900 dark:text-white">DataScraper Pro</td>
                          <td className="py-4"><span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded">Healthy</span></td>
                          <td className="py-4 text-zinc-600 dark:text-zinc-400">1.2s</td>
                          <td className="py-4 text-zinc-600 dark:text-zinc-400">4.9/5</td>
                          <td className="py-4 text-right"><button className="p-1.5 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded shadow-sm"><Settings size={14}/></button></td>
                        </tr>
                        <tr className="border-b border-zinc-50 dark:border-zinc-800/50 group hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                          <td className="py-4 font-bold text-zinc-900 dark:text-white">CodeBot Reviewer</td>
                          <td className="py-4"><span className="text-[10px] font-bold text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-500/10 px-2 py-1 rounded">High Load</span></td>
                          <td className="py-4 text-yellow-600 dark:text-yellow-400 font-medium">4.5s</td>
                          <td className="py-4 text-zinc-600 dark:text-zinc-400">4.7/5</td>
                          <td className="py-4 text-right"><button className="p-1.5 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded shadow-sm"><Settings size={14}/></button></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

              {/* Right Column (Config) */}
              <div className="space-y-6">
                
                {/* Configuration Management */}
                <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2"><Settings size={16} className="text-zinc-400 dark:text-zinc-500"/> Quick Config (DataScraper)</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1 block">Active Engine</label>
                      <select className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:border-indigo-500">
                        <option>GPT-4o</option>
                        <option>Claude 3.5 Sonnet</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1 block">Dynamic Pricing ($)</label>
                      <div className="flex gap-2">
                        <input type="text" defaultValue="0.05" className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:focus:border-indigo-500" />
                        <button className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-3 py-2 rounded-lg text-xs font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">Update</button>
                      </div>
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-1">Updates immediately for new hires.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}

// Dummy icon component for missing Lucide imports
const FileText = ({ className, size }: { className?: string, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
);
const FileJson = ({ className, size }: { className?: string, size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"/><path d="M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"/></svg>
);