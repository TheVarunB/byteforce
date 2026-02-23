"use client"

import { useState } from 'react'
import { Check, Code } from 'lucide-react'
import { hireAgent } from '../app/actions/hire'
import { useUser } from '@clerk/nextjs'

export default function PricingCard({ 
  priceStructure, 
  agentId, 
  hasHired = false 
}: { 
  priceStructure: string, 
  agentId: string,
  hasHired?: boolean
}) {
  const { isSignedIn } = useUser()
  const [tier, setTier] = useState<'standard' | 'enterprise'>('standard')
  const [isConfirming, setIsConfirming] = useState(false)
  const [isHiring, setIsHiring] = useState(false)

  // FIX: Format both the base amount and the full string if they start with a number
  let safePriceStructure = priceStructure || '$20'
  if (/^\d/.test(safePriceStructure)) {
    safePriceStructure = `$${safePriceStructure}`
  }
  
  const standardAmount = safePriceStructure.split('/')[0].trim()

  const handleHireClick = () => {
    if (!isSignedIn) return alert("Please sign in to hire this agent.")
    setIsConfirming(true)
  }

  const confirmHire = async () => {
    setIsHiring(true)
    try {
      await hireAgent(agentId, `/agents/${agentId}`)
      setIsConfirming(false)
    } catch (error: any) {
      alert(error.message || "Failed to hire agent.")
      setIsConfirming(false)
    } finally {
      setIsHiring(false)
    }
  }

  const handleViewDocs = () => {
    alert("API Documentation for this agent is currently being generated. Please check back later!")
  }

  return (
    <div className="bg-white dark:bg-zinc-900/80 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm sticky top-24 text-zinc-900 dark:text-white transition-colors duration-300">
      
      <div className="p-5 border-b border-zinc-100 dark:border-zinc-800 transition-colors duration-300">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Pricing Packages</h3>
      </div>

      <div 
        onClick={() => setTier('standard')}
        className={`p-5 border-b border-zinc-100 dark:border-zinc-800 relative cursor-pointer transition-all duration-300 ${tier === 'standard' ? 'bg-blue-50/50 dark:bg-blue-500/10' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50 opacity-70'}`}
      >
        <div className={`absolute top-5 right-5 h-4 w-4 rounded-full border-2 flex items-center justify-center transition-colors ${tier === 'standard' ? 'border-blue-600 dark:border-blue-500' : 'border-zinc-300 dark:border-zinc-600'}`}>
          {tier === 'standard' && <div className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-500"></div>}
        </div>
        
        <h4 className="font-bold text-zinc-900 dark:text-white mb-1">Standard Output</h4>
        
        {/* USING THE SAFE FORMATTED PRICE HERE */}
        <div className="text-2xl font-black text-zinc-900 dark:text-white mb-3">{safePriceStructure}</div>
        
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Perfect for single-run tasks and straightforward data extraction.</p>
        <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
          <li className="flex gap-2 items-center"><Check size={14} className={tier === 'standard' ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-400 dark:text-zinc-600'} /> Up to 10k rows</li>
          <li className="flex gap-2 items-center"><Check size={14} className={tier === 'standard' ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-400 dark:text-zinc-600'} /> JSON / CSV Output</li>
          <li className="flex gap-2 items-center"><Check size={14} className={tier === 'standard' ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-400 dark:text-zinc-600'} /> 24hr Turnaround</li>
        </ul>
      </div>

      <div 
        onClick={() => setTier('enterprise')}
        className={`p-5 relative cursor-pointer transition-all duration-300 ${tier === 'enterprise' ? 'bg-blue-50/50 dark:bg-blue-500/10' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/50 opacity-70'}`}
      >
        <div className={`absolute top-5 right-5 h-4 w-4 rounded-full border-2 flex items-center justify-center transition-colors ${tier === 'enterprise' ? 'border-blue-600 dark:border-blue-500' : 'border-zinc-300 dark:border-zinc-600'}`}>
          {tier === 'enterprise' && <div className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-500"></div>}
        </div>

        <h4 className="font-bold text-zinc-900 dark:text-white mb-1">Enterprise Pipeline</h4>
        <div className="text-2xl font-black text-zinc-900 dark:text-white mb-3">$499 <span className="text-sm font-normal text-zinc-500 dark:text-zinc-500">/ mo</span></div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Continuous monitoring, automated webhooks, and maintenance.</p>
        <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
          <li className="flex gap-2 items-center"><Check size={14} className={tier === 'enterprise' ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-400 dark:text-zinc-600'} /> Unlimited extraction rows</li>
          <li className="flex gap-2 items-center"><Check size={14} className={tier === 'enterprise' ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-400 dark:text-zinc-600'} /> Real-time custom webhooks</li>
          <li className="flex gap-2 items-center"><Check size={14} className={tier === 'enterprise' ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-400 dark:text-zinc-600'} /> 1-hour support SLA</li>
        </ul>
      </div>

      <div className="p-5 border-t border-zinc-100 dark:border-zinc-800 transition-colors duration-300">
        
        {hasHired ? (
          <button disabled className="w-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 py-3.5 rounded-xl font-bold shadow-sm mb-3 flex items-center justify-center gap-2 cursor-not-allowed">
            <Check size={18} /> Agent Deployed
          </button>
        ) : isConfirming ? (
          <div className="mb-3 space-y-2">
            <p className="text-sm font-bold text-center text-zinc-900 dark:text-white mb-2">Are you sure you want to hire?</p>
            <div className="flex gap-2">
              <button onClick={() => setIsConfirming(false)} disabled={isHiring} className="flex-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors py-2.5 rounded-lg font-bold">
                Cancel
              </button>
              <button onClick={confirmHire} disabled={isHiring} className="flex-1 bg-blue-600 text-white hover:bg-blue-700 transition-colors py-2.5 rounded-lg font-bold">
                {isHiring ? 'Processing...' : 'Yes, Hire'}
              </button>
            </div>
          </div>
        ) : (
          <button onClick={handleHireClick} className="w-full bg-blue-600 dark:bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors py-3.5 rounded-xl font-bold shadow-sm mb-3">
            Hire for {tier === 'standard' ? standardAmount : '$499 / mo'}
          </button>
        )}
        
        <button 
          onClick={handleViewDocs}
          className="w-full bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors py-3.5 rounded-xl font-bold shadow-sm flex items-center justify-center gap-2"
        >
          <Code size={16} /> View API Docs
        </button>
      </div>
    </div>
  )
}