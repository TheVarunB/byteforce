"use client"

import Link from 'next/link'
import { Shield, CheckCircle2, Plus, Check } from 'lucide-react'
import BookmarkButton from './BookmarkButton'

export default function AgentCard({
  id, 
  name, 
  headline, 
  price, 
  model, 
  isBookmarked = false,
  isComparing = false,
  compareDisabled = false,
  onCompareToggle
}: {
  id: string, 
  name: string, 
  headline: string, 
  price: string, 
  model: string, 
  isBookmarked?: boolean,
  isComparing?: boolean,
  compareDisabled?: boolean,
  onCompareToggle?: (id: string) => void
}) {
  
  // FIX: If the price string starts with a number, prepend a '$' sign
  let displayPrice = price.split('/')[0].trim()
  if (/^\d/.test(displayPrice)) {
    displayPrice = `$${displayPrice}`
  }

  return (
    <div className={`bg-white dark:bg-zinc-900 border ${isComparing ? 'border-blue-500 shadow-md shadow-blue-500/10' : 'border-zinc-200/80 dark:border-zinc-800'} rounded-3xl p-6 hover:shadow-xl hover:shadow-blue-500/5 dark:hover:shadow-blue-900/10 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative group`}>
      
      {/* COMPARE BUTTON */}
      {onCompareToggle && (
        <div className="absolute top-5 left-5 z-20">
          <button
            onClick={(e) => {
              e.preventDefault()
              onCompareToggle(id)
            }}
            disabled={compareDisabled && !isComparing}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${
              isComparing 
                ? 'bg-blue-600 text-white border border-blue-700' 
                : compareDisabled 
                  ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 border border-zinc-200 dark:border-zinc-700 cursor-not-allowed'
                  : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700'
            }`}
          >
            {isComparing ? <Check size={14} /> : <Plus size={14} />}
            {isComparing ? 'Added' : 'Compare'}
          </button>
        </div>
      )}

      {/* BOOKMARK BUTTON */}
      <div className="absolute top-5 right-5 z-20">
        <BookmarkButton 
          agentId={id} 
          initialIsBookmarked={isBookmarked} 
          currentPath="/agents" 
        />
      </div>

      <Link href={`/agents/${id}`} className="flex-1 flex flex-col cursor-pointer z-10 pt-8">
        <div className="w-14 h-14 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-4 border border-blue-100 dark:border-blue-500/20 group-hover:scale-105 transition-transform shadow-sm">
          <Shield size={28} strokeWidth={1.5} />
        </div>

        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1 flex items-center gap-1.5">
          <span className="truncate">{name}</span>
          <CheckCircle2 size={16} className="text-blue-500 fill-blue-50 dark:fill-zinc-900 shrink-0" />
        </h3>
        
        <div className="mb-3">
          <span className="text-[9px] font-bold text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-500/10 border border-amber-200/80 dark:border-amber-500/20 px-2 py-0.5 rounded-md uppercase tracking-widest">
            Platform Certified
          </span>
        </div>

        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6 flex-1 line-clamp-3">
          {headline}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700">
            {model}
          </span>
          <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700">
            API Ready
          </span>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Available for Hire</span>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800 items-end">
          <div>
            <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-0.5">Success Rate</div>
            <div className="text-sm font-bold text-zinc-900 dark:text-white">99.5%</div>
          </div>
          <div>
            <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-0.5">Avg. Latency</div>
            <div className="text-sm font-bold text-zinc-900 dark:text-white">&lt;2s</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-0.5">Pricing</div>
            <div className="inline-block bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 font-bold text-sm px-3 py-1 rounded-lg border border-blue-200/80 dark:border-blue-500/30 transition-colors group-hover:bg-blue-600 group-hover:text-white">
              {displayPrice} {/* <-- Using the safely formatted price */}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}