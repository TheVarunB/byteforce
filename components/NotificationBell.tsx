"use client"

import { useState, useEffect, useRef } from 'react'
import { Bell, CheckCircle2, AlertCircle, Info, DollarSign, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { getNotifications, markAsRead, markAllAsRead } from '../app/actions/notifications'
import Link from 'next/link'

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<any[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fetch notifications on mount
  useEffect(() => {
    const fetchNotifs = async () => {
      const data = await getNotifications()
      setNotifications(data)
    }
    fetchNotifs()
  }, [])

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const unreadCount = notifications.filter(n => !n.is_read).length

  const handleMarkAsRead = async (id: string) => {
    // Optimistic UI update
    setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: true } : n))
    await markAsRead(id)
  }

  const handleMarkAllAsRead = async () => {
    // Optimistic UI update
    setNotifications(notifications.map(n => ({ ...n, is_read: true })))
    await markAllAsRead()
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 size={16} className="text-emerald-500" />
      case 'error': return <AlertCircle size={16} className="text-red-500" />
      case 'payment': return <DollarSign size={16} className="text-blue-500" />
      default: return <Info size={16} className="text-zinc-500" />
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      
      {/* The Bell Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors flex items-center justify-center"
      >
        <Bell size={18} />
        {/* The Pulsing Unread Badge */}
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-white dark:border-zinc-950"></span>
          </span>
        )}
      </button>

      {/* The Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden z-50"
          >
            <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-950/50">
              <h3 className="font-bold text-zinc-900 dark:text-white">Notifications</h3>
              {unreadCount > 0 && (
                <button 
                  onClick={handleMarkAllAsRead}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-1"
                >
                  <Check size={14} /> Mark all read
                </button>
              )}
            </div>

            <div className="max-h-[400px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-zinc-500 dark:text-zinc-400 text-sm">
                  <Bell size={24} className="mx-auto mb-2 opacity-20" />
                  You're all caught up!
                </div>
              ) : (
                <div className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                  {notifications.map((notif) => (
                    <div 
                      key={notif.id}
                      onClick={() => !notif.is_read && handleMarkAsRead(notif.id)}
                      className={`p-4 flex gap-3 transition-colors ${!notif.is_read ? 'bg-blue-50/30 dark:bg-blue-900/10 cursor-pointer' : 'bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'}`}
                    >
                      <div className="shrink-0 mt-0.5">
                        {getIcon(notif.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className={`text-sm ${!notif.is_read ? 'font-bold text-zinc-900 dark:text-white' : 'font-semibold text-zinc-700 dark:text-zinc-300'}`}>
                            {notif.title}
                          </h4>
                          {!notif.is_read && <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5"></span>}
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-2">
                          {notif.message}
                        </p>
                        {notif.action_link && (
                          <Link 
                            href={notif.action_link}
                            onClick={() => handleMarkAsRead(notif.id)}
                            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            View details &rarr;
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}