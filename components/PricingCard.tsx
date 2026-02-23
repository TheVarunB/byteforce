"use client"

import { useState } from 'react'
import { Check, Code } from 'lucide-react'

export default function PricingCard({ priceStructure }: { priceStructure: string }) {
  // This state tracks which tier is currently selected
  const [tier, setTier] = useState<'standard' | 'enterprise'>('standard')

  // We split the string to grab just the dollar amount (e.g., "$20" from "$20 / task")
  const standardAmount = priceStructure ? priceStructure.split('/')[0].trim() : '$20'

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm sticky top-24 text-black">
      
      <div className="p-5 border-b border-zinc-100">
        <h3 className="text-lg font-bold text-zinc-900">Pricing Packages</h3>
      </div>

      {/* Tier 1: Standard Output */}
      <div 
        onClick={() => setTier('standard')}
        className={`p-5 border-b border-zinc-100 relative cursor-pointer transition-all ${tier === 'standard' ? 'bg-blue-50/50' : 'hover:bg-zinc-50 opacity-70'}`}
      >
        {/* Custom Radio Button Visual */}
        <div className={`absolute top-5 right-5 h-4 w-4 rounded-full border-2 flex items-center justify-center transition-colors ${tier === 'standard' ? 'border-blue-600' : 'border-zinc-300'}`}>
          {tier === 'standard' && <div className="h-2 w-2 rounded-full bg-blue-600"></div>}
        </div>
        
        <h4 className="font-bold text-zinc-900 mb-1">Standard Output</h4>
        <div className="text-2xl font-black text-zinc-900 mb-3">{priceStructure}</div>
        <p className="text-sm text-zinc-600 mb-4">Perfect for single-run tasks and straightforward data extraction.</p>
        <ul className="space-y-2 text-sm text-zinc-700">
          <li className="flex gap-2 items-center"><Check size={14} className={tier === 'standard' ? 'text-blue-600' : 'text-zinc-400'} /> Up to 10k rows</li>
          <li className="flex gap-2 items-center"><Check size={14} className={tier === 'standard' ? 'text-blue-600' : 'text-zinc-400'} /> JSON / CSV Output</li>
          <li className="flex gap-2 items-center"><Check size={14} className={tier === 'standard' ? 'text-blue-600' : 'text-zinc-400'} /> 24hr Turnaround</li>
        </ul>
      </div>

      {/* Tier 2: Enterprise Pipeline */}
      <div 
        onClick={() => setTier('enterprise')}
        className={`p-5 relative cursor-pointer transition-all ${tier === 'enterprise' ? 'bg-blue-50/50' : 'hover:bg-zinc-50 opacity-70'}`}
      >
        {/* Custom Radio Button Visual */}
        <div className={`absolute top-5 right-5 h-4 w-4 rounded-full border-2 flex items-center justify-center transition-colors ${tier === 'enterprise' ? 'border-blue-600' : 'border-zinc-300'}`}>
          {tier === 'enterprise' && <div className="h-2 w-2 rounded-full bg-blue-600"></div>}
        </div>

        <h4 className="font-bold text-zinc-900 mb-1">Enterprise Pipeline</h4>
        <div className="text-2xl font-black text-zinc-900 mb-3">$499 <span className="text-sm font-normal text-zinc-500">/ mo</span></div>
        <p className="text-sm text-zinc-600 mb-4">Continuous monitoring, automated webhooks, and maintenance.</p>
        <ul className="space-y-2 text-sm text-zinc-700">
          <li className="flex gap-2 items-center"><Check size={14} className={tier === 'enterprise' ? 'text-blue-600' : 'text-zinc-400'} /> Unlimited extraction rows</li>
          <li className="flex gap-2 items-center"><Check size={14} className={tier === 'enterprise' ? 'text-blue-600' : 'text-zinc-400'} /> Real-time custom webhooks</li>
          <li className="flex gap-2 items-center"><Check size={14} className={tier === 'enterprise' ? 'text-blue-600' : 'text-zinc-400'} /> 1-hour support SLA</li>
        </ul>
      </div>

      {/* Dynamic CTA Footer */}
      <div className="p-5 border-t border-zinc-100">
        <button className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors py-3.5 rounded-xl font-bold shadow-sm mb-3">
          Hire for {tier === 'standard' ? standardAmount : '$499 / mo'}
        </button>
        <button className="w-full bg-white text-zinc-700 border border-zinc-200 hover:bg-zinc-50 transition-colors py-3.5 rounded-xl font-bold shadow-sm flex items-center justify-center gap-2">
          <Code size={16} /> View API Docs
        </button>
      </div>

    </div>
  )
}