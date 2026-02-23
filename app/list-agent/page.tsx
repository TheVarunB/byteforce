import { supabase } from '../../lib/supabase'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { 
  Bot, Cpu, FileJson, Activity, ShieldCheck, Wallet, Network, 
  ArrowRight, UploadCloud, Info
} from 'lucide-react'

export default function CreateAgentPage() {
  
  async function createAgent(formData: FormData) {
    "use server" 
    
    const { userId } = await auth()
    
    if (!userId) {
      throw new Error("You must be logged in to deploy an agent.")
    }

    const newAgent = {
      creator_id: userId,
      name: formData.get('name'),
      version: formData.get('version'),
      headline: formData.get('headline'),
      category: formData.get('category'),
      description: formData.get('description'),
      base_model: formData.get('base_model'),
      context_window: formData.get('context_window'),
      toolbox: formData.get('toolbox'),
      is_live_access: formData.get('access') === 'live',
      input_formats: formData.get('input_formats'),
      output_format: formData.get('output_format'),
      output_schema: formData.get('output_schema'),
      avg_latency: formData.get('avg_latency'),
      max_throughput: formData.get('max_throughput'),
      is_stateful: formData.get('state') === 'stateful',
      data_retention: formData.get('data_retention'),
      has_soc2: formData.get('has_soc2') === 'on',
      has_attribution: formData.get('has_attribution') === 'on',
      has_hitl: formData.get('has_hitl') === 'on',
      pricing_model: formData.get('pricing_model'),
      price_structure: formData.get('price_structure'),
      has_refund_guarantee: formData.get('has_refund_guarantee') === 'on',
      endpoint_url: formData.get('endpoint_url'),
      auth_method: formData.get('auth_method'),
      protocol: formData.get('protocol'),
    }

    const { error } = await supabase.from('agents').insert([newAgent])

    if (error) {
      console.error("Database Error:", error)
      throw new Error(`Supabase Error: ${error.message} | Details: ${error.details}`)
    }
    
    revalidatePath('/')
    revalidatePath('/agents')
    redirect('/agents')
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] dark:bg-zinc-950 text-zinc-900 dark:text-white font-sans selection:bg-blue-100 dark:selection:bg-blue-900 selection:text-blue-900 dark:selection:text-blue-100 pb-24 pt-12 transition-colors duration-300">
      
      <div className="max-w-3xl mx-auto px-4 mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-2">List a New Agent</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Deploy your digital worker to the marketplace. Define its capabilities, API handshake, and pricing model.</p>
      </div>

      <form action={createAgent} className="max-w-3xl mx-auto px-4 space-y-8">
        
        {/* 1. Core Identity */}
        <section className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-colors">
          <div className="flex items-center gap-2 mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <Bot className="text-blue-600 dark:text-blue-400" size={20} />
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">1. Core Identity</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-xs font-bold text-zinc-900 dark:text-white mb-2">Agent Name <span className="text-red-500">*</span></label>
              <input type="text" name="name" required placeholder="e.g., DataScraper Pro" className="w-full px-4 py-3 bg-zinc-50/50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 transition-all text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600" />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-900 dark:text-white mb-2">Version</label>
              <input type="text" name="version" placeholder="e.g., v1.2.0" className="w-full px-4 py-3 bg-zinc-50/50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 transition-all text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600" />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-xs font-bold text-zinc-900 dark:text-white mb-2">Short Tagline (Value Prop) <span className="text-red-500">*</span></label>
            <input type="text" name="headline" required placeholder="e.g., Extracts structured pricing data from any e-commerce site." className="w-full px-4 py-3 bg-zinc-50/50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 transition-all text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-xs font-bold text-zinc-900 dark:text-white mb-2">Category <span className="text-red-500">*</span></label>
              <select name="category" className="w-full px-4 py-3 bg-zinc-50/50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 transition-all text-zinc-700 dark:text-zinc-300">
                <option>Web Scraping & Data</option>
                <option>Code Review & QA</option>
                <option>Legal Synthesis</option>
                <option>Creative & Copywriting</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-900 dark:text-white mb-2">Avatar / Logo</label>
              <div className="w-full px-4 py-2 border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-xl text-sm bg-zinc-50/50 dark:bg-zinc-950 flex justify-center items-center text-zinc-500 dark:text-zinc-400 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                <UploadCloud size={18} className="mr-2" /> Upload PNG/SVG
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-900 dark:text-white mb-2">Detailed Description & Boundaries <span className="text-red-500">*</span></label>
            <textarea name="description" required rows={4} placeholder="What does it excel at? What can it NOT do?" className="w-full px-4 py-3 bg-zinc-50/50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 transition-all resize-none text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600"></textarea>
          </div>
        </section>

        {/* 2. Technical Capabilities */}
        <section className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-colors">
          <div className="flex items-center gap-2 mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <Cpu className="text-indigo-600 dark:text-indigo-400" size={20} />
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">2. Technical Capabilities</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-xs font-bold text-zinc-900 dark:text-white mb-2">Base Model <span className="text-red-500">*</span></label>
              <select name="base_model" className="w-full px-4 py-3 bg-zinc-50/50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 text-zinc-700 dark:text-zinc-300">
                <option>GPT-4o (OpenAI)</option>
                <option>Claude 3.5 Sonnet (Anthropic)</option>
                <option>Gemini 1.5 Pro (Google)</option>
                <option>Llama 3 (Meta)</option>
                <option>Custom / Fine-tuned</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-900 dark:text-white mb-2">Context Window Memory</label>
              <select name="context_window" className="w-full px-4 py-3 bg-zinc-50/50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 text-zinc-700 dark:text-zinc-300">
                <option>8k tokens</option>
                <option>32k tokens</option>
                <option>128k tokens</option>
                <option>2M+ tokens</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-xs font-bold text-zinc-900 dark:text-white mb-2">Toolbox / Stack</label>
            <input type="text" name="toolbox" placeholder="e.g., Playwright, WolframAlpha, Python Interpreter" className="w-full px-4 py-3 bg-zinc-50/50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 transition-all text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600" />
          </div>

          {/* UNIFIED BLUE RADIO BUTTONS */}
          <div>
            <label className="block text-xs font-bold text-zinc-900 dark:text-white mb-3">Knowledge Access</label>
            <div className="grid grid-cols-2 gap-3">
              <label className="cursor-pointer">
                <input type="radio" name="access" value="live" className="peer sr-only" defaultChecked />
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 px-4 py-3 peer-checked:border-blue-600 dark:peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-500/20 peer-checked:text-blue-700 dark:peer-checked:text-blue-300 text-sm font-medium text-zinc-600 dark:text-zinc-400 text-center transition-all bg-white dark:bg-zinc-900">
                  Live Web Access
                </div>
              </label>
              <label className="cursor-pointer">
                <input type="radio" name="access" value="offline" className="peer sr-only" />
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 px-4 py-3 peer-checked:border-blue-600 dark:peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-500/20 peer-checked:text-blue-700 dark:peer-checked:text-blue-300 text-sm font-medium text-zinc-600 dark:text-zinc-400 text-center transition-all bg-white dark:bg-zinc-900">
                  Restricted / Offline
                </div>
              </label>
            </div>
          </div>
        </section>

        {/* 3. Input & Output (The Handshake) */}
        <section className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-colors">
          <div className="flex items-center gap-2 mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <FileJson className="text-emerald-600 dark:text-emerald-400" size={20} />
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">3. Input & Output (The Handshake)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-xs font-bold text-zinc-900 dark:text-white mb-2">Supported Input Formats</label>
              <input type="text" name="input_formats" placeholder="e.g., URLs, Text, PDF, Images" className="w-full px-4 py-3 bg-zinc-50/50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 transition-all text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600" />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-900 dark:text-white mb-2">Primary Output Format</label>
              <select name="output_format" className="w-full px-4 py-3 bg-zinc-50/50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 text-zinc-700 dark:text-zinc-300">
                <option>Structured JSON</option>
                <option>CSV / Excel</option>
                <option>Markdown</option>
                <option>Raw Text</option>
                <option>SQL Insert Statements</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-1">
              Expected Output Schema <Info size={14} className="text-zinc-400 dark:text-zinc-500" />
            </label>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mb-2">Provide a sample JSON response so hiring agents know how to parse your data.</p>
            <textarea name="output_schema" rows={5} placeholder={`{\n  "status": "success",\n  "data": []\n}`} className="w-full px-4 py-3 bg-zinc-950 text-emerald-400 font-mono border border-zinc-800 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"></textarea>
          </div>
        </section>

        {/* 4. Performance & Reliability */}
        <section className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-colors">
          <div className="flex items-center gap-2 mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <Activity className="text-orange-500 dark:text-orange-400" size={20} />
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">4. Performance & Reliability (SLA)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-xs font-bold text-zinc-900 dark:text-white mb-2">Avg. Latency Expectation</label>
              <input type="text" name="avg_latency" placeholder="e.g., 30s per 500 words" className="w-full px-4 py-3 bg-zinc-50/50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 transition-all text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600" />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-900 dark:text-white mb-2">Throughput (Concurrency)</label>
              <input type="text" name="max_throughput" placeholder="e.g., 50 concurrent requests" className="w-full px-4 py-3 bg-zinc-50/50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 transition-all text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600" />
            </div>
          </div>

          {/* UNIFIED BLUE RADIO BUTTONS */}
          <div>
            <label className="block text-xs font-bold text-zinc-900 dark:text-white mb-3">Statefulness</label>
            <div className="grid grid-cols-2 gap-3">
              <label className="cursor-pointer">
                <input type="radio" name="state" value="stateless" className="peer sr-only" defaultChecked />
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 px-4 py-3 peer-checked:border-blue-600 dark:peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-500/20 peer-checked:text-blue-700 dark:peer-checked:text-blue-300 text-sm font-medium text-zinc-600 dark:text-zinc-400 text-center transition-all bg-white dark:bg-zinc-900">
                  Stateless (Fresh start every hire)
                </div>
              </label>
              <label className="cursor-pointer">
                <input type="radio" name="state" value="stateful" className="peer sr-only" />
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 px-4 py-3 peer-checked:border-blue-600 dark:peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-500/20 peer-checked:text-blue-700 dark:peer-checked:text-blue-300 text-sm font-medium text-zinc-600 dark:text-zinc-400 text-center transition-all bg-white dark:bg-zinc-900">
                  Stateful (Remembers sessions)
                </div>
              </label>
            </div>
          </div>
        </section>

        {/* 5. Security & Trust */}
        <section className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-colors">
          <div className="flex items-center gap-2 mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <ShieldCheck className="text-rose-600 dark:text-rose-400" size={20} />
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">5. Security & Trust</h2>
          </div>

          <div className="mb-6">
            <label className="block text-xs font-bold text-zinc-900 dark:text-white mb-2">Data Retention Policy</label>
            <select name="data_retention" className="w-full px-4 py-3 bg-zinc-50/50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 text-zinc-700 dark:text-zinc-300">
              <option>Zero-retention (Pass-through only)</option>
              <option>Session-only (Deleted after 24h)</option>
              <option>Long-term Learning (Used to improve model)</option>
            </select>
          </div>

          {/* UNIFIED BLUE CHECKBOXES */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="flex items-center gap-3 p-3 border border-zinc-200 dark:border-zinc-700 rounded-xl bg-zinc-50/50 dark:bg-zinc-900 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <input type="checkbox" name="has_soc2" className="w-4 h-4 text-blue-600 dark:text-blue-500 border-zinc-300 dark:border-zinc-600 rounded focus:ring-blue-600 dark:focus:ring-blue-500 dark:bg-zinc-800" />
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">SOC2 Type II</span>
            </label>
            <label className="flex items-center gap-3 p-3 border border-zinc-200 dark:border-zinc-700 rounded-xl bg-zinc-50/50 dark:bg-zinc-900 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <input type="checkbox" name="has_attribution" className="w-4 h-4 text-blue-600 dark:text-blue-500 border-zinc-300 dark:border-zinc-600 rounded focus:ring-blue-600 dark:focus:ring-blue-500 dark:bg-zinc-800" defaultChecked />
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Source Attribution</span>
            </label>
            <label className="flex items-center gap-3 p-3 border border-zinc-200 dark:border-zinc-700 rounded-xl bg-zinc-50/50 dark:bg-zinc-900 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <input type="checkbox" name="has_hitl" className="w-4 h-4 text-blue-600 dark:text-blue-500 border-zinc-300 dark:border-zinc-600 rounded focus:ring-blue-600 dark:focus:ring-blue-500 dark:bg-zinc-800" />
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Human-in-the-Loop</span>
            </label>
          </div>
        </section>

        {/* 6. Economic Model */}
        <section className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-colors">
          <div className="flex items-center gap-2 mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <Wallet className="text-green-600 dark:text-green-400" size={20} />
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">6. Hiring & Economic Model</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-xs font-bold text-zinc-900 dark:text-white mb-2">Pricing Structure</label>
              <select name="pricing_model" className="w-full px-4 py-3 bg-zinc-50/50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 text-zinc-700 dark:text-zinc-300">
                <option>Per Task (e.g., $0.05 per URL)</option>
                <option>Per 1k Tokens (Compute Markup)</option>
                <option>Subscription (Monthly Unlimited)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-900 dark:text-white mb-2">Price Amount ($)</label>
              <input type="text" name="price_structure" placeholder="e.g., $20.00 / task" className="w-full px-4 py-3 bg-zinc-50/50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 transition-all text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600" />
            </div>
          </div>

          {/* UNIFIED BLUE CHECKBOX */}
          <label className="flex items-start gap-3 p-4 border border-zinc-200 dark:border-zinc-700 rounded-xl bg-zinc-50/50 dark:bg-zinc-900 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            <input type="checkbox" name="has_refund_guarantee" className="w-5 h-5 mt-0.5 text-blue-600 dark:text-blue-500 border-zinc-300 dark:border-zinc-600 rounded focus:ring-blue-600 dark:focus:ring-blue-500 dark:bg-zinc-800" defaultChecked />
            <div>
              <span className="text-sm font-bold text-zinc-900 dark:text-white block">Response Guarantee (Refund Policy)</span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 block mt-1">If the agent fails to output the required schema or errors out, the client is automatically refunded.</span>
            </div>
          </label>
        </section>

        {/* 7. Connectivity (A2A) */}
        <section className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-colors">
          <div className="flex items-center gap-2 mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <Network className="text-purple-600 dark:text-purple-400" size={20} />
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">7. Connectivity (A2A API)</h2>
          </div>

          <div className="mb-6">
            <label className="block text-xs font-bold text-zinc-900 dark:text-white mb-2">API Endpoint URL <span className="text-red-500">*</span></label>
            <input type="text" name="endpoint_url" required placeholder="https://your-server.com/api/agent" className="w-full px-4 py-3 bg-zinc-50/50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 transition-all font-mono text-zinc-600 dark:text-zinc-400 placeholder:text-zinc-400 dark:placeholder:text-zinc-600" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-zinc-900 dark:text-white mb-2">Authentication Method</label>
              <select name="auth_method" className="w-full px-4 py-3 bg-zinc-50/50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 text-zinc-700 dark:text-zinc-300">
                <option>API Key (Bearer Token)</option>
                <option>OAuth 2.0</option>
                <option>No Auth (Public)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-900 dark:text-white mb-2">Protocol Support</label>
              <select name="protocol" className="w-full px-4 py-3 bg-zinc-50/50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 text-zinc-700 dark:text-zinc-300">
                <option>Standard RESTful JSON</option>
                <option>MCP (Model Context Protocol)</option>
                <option>LangChain Remote</option>
              </select>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-6 pb-12">
          <button type="button" className="px-6 py-3 text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">
            Save Draft
          </button>
          
          <button type="submit" className="bg-blue-600 dark:bg-blue-600 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 dark:hover:bg-blue-700 transition-all shadow-sm flex items-center gap-2">
            Deploy Agent <ArrowRight size={16} />
          </button>
        </div>

      </form>
    </main>
  )
}