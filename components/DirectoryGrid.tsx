"use client"

import { useState } from 'react'
import AgentCard from './AgentCard'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, XCircle, Scale } from 'lucide-react'

export default function DirectoryGrid({ 
  agents, 
  bookmarkedAgentIds 
}: { 
  agents: any[], 
  bookmarkedAgentIds: string[] 
}) {
  const [compareIds, setCompareIds] = useState<string[]>([])
  const [isMatrixOpen, setIsMatrixOpen] = useState(false)

  const handleToggleCompare = (id: string) => {
    if (compareIds.includes(id)) {
      const newIds = compareIds.filter(cmpId => cmpId !== id)
      setCompareIds(newIds)
      if (newIds.length < 2) setIsMatrixOpen(false) // Auto close if < 2
    } else {
      if (compareIds.length < 4) {
        setCompareIds([...compareIds, id])
      }
    }
  }

  const selectedAgents = agents.filter(a => compareIds.includes(a.id))

  const BooleanCheck = ({ isTrue }: { isTrue: boolean }) => (
    isTrue 
      ? <CheckCircle2 size={18} className="text-emerald-500 mx-auto" /> 
      : <XCircle size={18} className="text-zinc-300 dark:text-zinc-600 mx-auto" />
  )

  return (
    <>
      {/* 1. The Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-500">
        {agents.map((agent) => (
          <AgentCard
            key={agent.id}
            id={agent.id}
            name={agent.name}
            headline={agent.headline}
            price={agent.price_structure || '$0'}
            model={agent.base_model || 'Unknown'}
            isBookmarked={bookmarkedAgentIds.includes(agent.id)}
            isComparing={compareIds.includes(agent.id)}
            compareDisabled={compareIds.length >= 4}
            onCompareToggle={handleToggleCompare}
          />
        ))}
      </div>

      {/* 2. The Floating Compare Dock */}
      <AnimatePresence>
        {compareIds.length > 0 && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none flex justify-center"
          >
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-2xl rounded-2xl w-full max-w-5xl pointer-events-auto overflow-hidden">
              
              {/* Top Bar (Always visible if >0 selected) */}
              <div className="p-4 flex items-center justify-between bg-zinc-50 dark:bg-zinc-800/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg">
                    <Scale size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white">Compare Agents</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{compareIds.length} of 4 selected</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => { setCompareIds([]); setIsMatrixOpen(false); }}
                    className="text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    Clear All
                  </button>
                  <button 
                    onClick={() => setIsMatrixOpen(!isMatrixOpen)}
                    disabled={compareIds.length < 2}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${
                      compareIds.length >= 2 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-400 dark:text-zinc-500 cursor-not-allowed'
                    }`}
                  >
                    {isMatrixOpen ? 'Hide Matrix' : compareIds.length < 2 ? 'Select 1 more to compare' : 'View Comparison'}
                  </button>
                </div>
              </div>

              {/* Collapsible Matrix */}
              <AnimatePresence>
                {isMatrixOpen && (
                  <motion.div 
                    initial={{ height: 0 }} 
                    animate={{ height: 'auto' }} 
                    exit={{ height: 0 }}
                    className="overflow-x-auto border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
                  >
                    <table className="w-full text-sm text-left min-w-[800px]">
                      <thead>
                        <tr className="bg-zinc-50/50 dark:bg-zinc-950/50">
                          <th className="p-4 w-48 text-zinc-500 dark:text-zinc-400 font-medium">Features</th>
                          {selectedAgents.map(agent => (
                            <th key={agent.id} className="p-4 font-bold text-zinc-900 dark:text-white border-l border-zinc-100 dark:border-zinc-800 relative">
                              <button onClick={() => handleToggleCompare(agent.id)} className="absolute top-4 right-4 text-zinc-400 hover:text-red-500"><X size={16}/></button>
                              {agent.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                        <tr>
                          <td className="p-4 font-medium text-zinc-600 dark:text-zinc-400">Base Engine</td>
                          {selectedAgents.map(a => <td key={a.id} className="p-4 border-l border-zinc-100 dark:border-zinc-800 text-center font-semibold text-blue-600 dark:text-blue-400">{a.base_model || 'N/A'}</td>)}
                        </tr>
                        <tr>
                          <td className="p-4 font-medium text-zinc-600 dark:text-zinc-400">Pricing</td>
                          {selectedAgents.map(a => <td key={a.id} className="p-4 border-l border-zinc-100 dark:border-zinc-800 text-center text-zinc-900 dark:text-white">{a.price_structure || '$0'}</td>)}
                        </tr>
                        <tr>
                          <td className="p-4 font-medium text-zinc-600 dark:text-zinc-400">Avg Latency</td>
                          {selectedAgents.map(a => <td key={a.id} className="p-4 border-l border-zinc-100 dark:border-zinc-800 text-center text-zinc-900 dark:text-white">{a.avg_latency || 'N/A'}</td>)}
                        </tr>
                        <tr className="bg-zinc-50/30 dark:bg-zinc-900/30">
                          <td className="p-4 font-medium text-zinc-600 dark:text-zinc-400">Live Web Access</td>
                          {selectedAgents.map(a => <td key={a.id} className="p-4 border-l border-zinc-100 dark:border-zinc-800"><BooleanCheck isTrue={a.is_live_access} /></td>)}
                        </tr>
                        <tr>
                          <td className="p-4 font-medium text-zinc-600 dark:text-zinc-400">Stateful Memory</td>
                          {selectedAgents.map(a => <td key={a.id} className="p-4 border-l border-zinc-100 dark:border-zinc-800"><BooleanCheck isTrue={a.is_stateful} /></td>)}
                        </tr>
                        <tr className="bg-zinc-50/30 dark:bg-zinc-900/30">
                          <td className="p-4 font-medium text-zinc-600 dark:text-zinc-400">SOC2 Compliant</td>
                          {selectedAgents.map(a => <td key={a.id} className="p-4 border-l border-zinc-100 dark:border-zinc-800"><BooleanCheck isTrue={a.has_soc2} /></td>)}
                        </tr>
                        <tr>
                          <td className="p-4 font-medium text-zinc-600 dark:text-zinc-400">Refund Guarantee</td>
                          {selectedAgents.map(a => <td key={a.id} className="p-4 border-l border-zinc-100 dark:border-zinc-800"><BooleanCheck isTrue={a.has_refund_guarantee} /></td>)}
                        </tr>
                      </tbody>
                    </table>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}