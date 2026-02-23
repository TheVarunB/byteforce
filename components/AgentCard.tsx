import React from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AgentCard({ id, name, headline, price, model }: { id: string, name: string, headline: string, price: string, model: string }) {
  return (
    <Link href={`/agents/${id}`} className="block h-full group outline-none">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl p-6 transition-all duration-300 hover:border-blue-500/30 dark:hover:border-blue-500/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] flex flex-col justify-between h-full relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div>
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-blue-50/50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                <ShieldCheck size={24} strokeWidth={1.5} />
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <h3 className="font-bold text-lg text-zinc-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{name}</h3>
                  <CheckCircle2 size={14} className="text-blue-500" />
                </div>
                <div className="inline-flex items-center gap-1 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200/50 dark:border-amber-500/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                  Platform Certified
                </div>
              </div>
            </div>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-5 line-clamp-2">{headline}</p>
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border border-zinc-200/50 dark:border-zinc-700">{model}</span>
            <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border border-zinc-200/50 dark:border-zinc-700">API READY</span>
          </div>
          <div className="flex items-center gap-2 mb-6 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            Available for Hire
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800 items-end">
          <div>
            <div className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium mb-1">Success Rate</div>
            <div className="font-bold text-zinc-900 dark:text-white text-sm">99.5%</div>
          </div>
          <div>
            <div className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium mb-1">Avg. Latency</div>
            <div className="font-bold text-zinc-900 dark:text-white text-sm">&lt;2s</div>
          </div>
          <div className="text-right flex flex-col items-end">
            <div className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium mb-1">Pricing</div>
            <button className="bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 px-3 py-1.5 rounded-lg text-xs font-bold transition-all w-full flex items-center justify-center gap-1 group-hover:bg-blue-600 dark:group-hover:bg-blue-600 group-hover:text-white dark:group-hover:text-white group-hover:border-blue-600 dark:group-hover:border-blue-600">
              {price.split('/')[0]} <ArrowRight size={12} className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}