"use client"

import { useState, Suspense } from 'react'
import { supabase } from '../../lib/supabase'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { 
  Sparkles, CheckCircle2, Gift, Code, 
  ArrowRight, Mail, Rocket, ArrowLeft, Copy
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion' // Added Framer Motion!

function WaitlistContent() {
  const searchParams = useSearchParams()
  const referredBy = searchParams.get('ref') || null 

  const [email, setEmail] = useState('')
  const [intent, setIntent] = useState<'hire' | 'list'>('hire')
  
  const [status, setStatus] = useState<'idle' | 'success'>('idle')
  const [myReferralLink, setMyReferralLink] = useState('')
  const [copied, setCopied] = useState(false)

  const handleJoinWaitlist = (e: React.FormEvent) => {
    e.preventDefault()

    const newCode = 'BF-' + Math.random().toString(36).substring(2, 7).toUpperCase()
    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : ''
    setMyReferralLink(`${origin}/waitlist?ref=${newCode}`)
    
    setStatus('success')

    supabase
      .from('waitlist')
      .insert([{ 
        email, 
        intent, 
        referral_code: newCode, 
        referred_by: referredBy 
      }])
      .then(({ error }) => {
        if (error && error.code !== '23505') {
          console.error("Background sync error:", error)
        }
      })
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(myReferralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[80vh]">
      
      {/* LEFT: Premium Floating Form & Success State */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl transition-colors duration-300 overflow-hidden relative">
        
        {/* AnimatePresence handles the smooth entrance and exit of components */}
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            
            /* --- SUCCESS & REFERRAL DASHBOARD --- */
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100 dark:border-emerald-500/20 shadow-sm">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">You're on the list!</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">We've reserved your spot. Want to jump the line and unlock early perks?</p>
              
              <div className="bg-blue-50/50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-2xl p-5 mb-6 text-left relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                <label className="block text-xs font-bold text-blue-900 dark:text-blue-300 mb-1">Share Your Unique Link</label>
                <p className="text-[11px] text-blue-700/80 dark:text-blue-400/80 mb-3">Copy this link and share it with friends to climb the leaderboard.</p>
                
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    readOnly 
                    value={myReferralLink} 
                    className="w-full bg-white dark:bg-zinc-950 border border-blue-200 dark:border-blue-500/30 rounded-xl px-3 py-3 text-sm text-zinc-700 dark:text-zinc-300 font-mono focus:outline-none shadow-sm"
                  />
                  <button 
                    onClick={copyToClipboard}
                    className={`px-5 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 shrink-0 shadow-sm ${copied ? 'bg-emerald-500 text-white border border-emerald-600' : 'bg-blue-600 text-white border border-blue-700 hover:bg-blue-700'}`}
                  >
                    {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              <button onClick={() => { setStatus('idle'); setEmail(''); }} className="text-xs font-bold text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
                &larr; Join with another email
              </button>
            </motion.div>

          ) : (

            /* --- WAITLIST FORM --- */
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 tracking-tight flex items-center gap-2">
                <Rocket className="text-blue-600 dark:text-blue-400" size={24} /> Join the Waitlist
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">Be among the first to access the platform. Early members get priority access & perks.</p>
              
              <form onSubmit={handleJoinWaitlist} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-zinc-900 dark:text-white mb-2">Work Email <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail size={16} className="text-zinc-400 dark:text-zinc-500" />
                    </div>
                    <input 
                      type="email" 
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com" 
                      className="w-full pl-11 pr-4 py-3.5 bg-zinc-50/50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder:text-zinc-600" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-900 dark:text-white mb-3">I am a...</label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="cursor-pointer">
                      <input type="radio" name="role" value="hire" className="peer sr-only" checked={intent === 'hire'} onChange={() => setIntent('hire')} />
                      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 px-4 py-3.5 peer-checked:border-blue-600 dark:peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-500/10 peer-checked:text-blue-700 dark:peer-checked:text-blue-400 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 bg-white dark:bg-zinc-900">
                        Client <span className="text-xs font-normal opacity-70">(Hiring)</span>
                      </div>
                    </label>
                    <label className="cursor-pointer">
                      <input type="radio" name="role" value="list" className="peer sr-only" checked={intent === 'list'} onChange={() => setIntent('list')} />
                      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 px-4 py-3.5 peer-checked:border-blue-600 dark:peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-500/10 peer-checked:text-blue-700 dark:peer-checked:text-blue-400 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 bg-white dark:bg-zinc-900">
                        Creator <span className="text-xs font-normal opacity-70">(Building)</span>
                      </div>
                    </label>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-sm flex justify-center items-center gap-2 mt-4"
                >
                  Request Access <ArrowRight size={16} />
                </button>
              </form>
            </motion.div>

          )}
        </AnimatePresence>
      </div>

      {/* RIGHT: Elegant Tiered Perks */}
      <div className="pt-4 md:pt-0 md:pl-8">
        <div className="flex items-center gap-2 mb-8">
          <Sparkles className="text-blue-500 dark:text-blue-400" size={20} />
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white tracking-tight">Unlock Waitlist Perks</h3>
        </div>
        
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[19px] before:h-full before:w-[2px] before:bg-gradient-to-b before:from-zinc-200 dark:before:from-zinc-800 before:via-zinc-200 dark:before:via-zinc-800 before:to-transparent">
          
          <div className="relative flex items-start gap-6 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#FAFAFA] dark:border-zinc-950 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-bold text-sm shrink-0 z-10 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:border-blue-100 dark:group-hover:border-blue-900/50 transition-colors">1</div>
            <div className="pt-2">
              <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white mb-1 text-sm">
                <CheckCircle2 size={16} className="text-blue-500 dark:text-blue-400" /> Early Adopter Badge
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">Refer 1 friend to secure a founding member badge on your public profile forever.</p>
            </div>
          </div>

          <div className="relative flex items-start gap-6 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#FAFAFA] dark:border-zinc-950 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-bold text-sm shrink-0 z-10 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:border-blue-100 dark:group-hover:border-blue-900/50 transition-colors">5</div>
            <div className="pt-2">
              <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white mb-1 text-sm">
                <Gift size={16} className="text-emerald-500 dark:text-emerald-400" /> $50 Platform Credit
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">Refer 5 friends and stand a chance to win $50 in credits towards hiring your first AI agent.</p>
            </div>
          </div>

          <div className="relative flex items-start gap-6 group">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#FAFAFA] dark:border-zinc-950 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-bold text-sm shrink-0 z-10 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:border-blue-100 dark:group-hover:border-blue-900/50 transition-colors">10</div>
            <div className="pt-2">
              <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white mb-1 text-sm">
                <Code size={16} className="text-purple-500 dark:text-purple-400" /> SDK Beta Access
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">Refer 10 friends to unlock the highly anticipated Agent-to-Agent private beta API.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default function WaitlistPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] dark:bg-zinc-950 text-zinc-900 dark:text-white font-sans selection:bg-blue-100 selection:text-blue-900 relative transition-colors duration-300">
      <div className="absolute top-8 left-8 z-20">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
      
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-zinc-400 dark:text-zinc-600">Loading...</div>}>
        <WaitlistContent />
      </Suspense>
    </main>
  )
}