"use client"

import { useState } from 'react'
import { Star, MessageSquare, Lock } from 'lucide-react'
import { submitReview } from '../app/actions/reviews'
import { useUser } from '@clerk/nextjs'

export default function ReviewSection({ 
  agentId, 
  existingReviews,
  hasHired
}: { 
  agentId: string, 
  existingReviews: any[],
  hasHired: boolean
}) {
  const { isSignedIn, user } = useUser()
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const userExistingReview = existingReviews.find(r => r.user_id === user?.id)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isSignedIn) return alert("Please sign in.")
    if (rating === 0) return alert("Please select a star rating.")

    setIsSubmitting(true)
    try {
      await submitReview(agentId, rating, comment, `/agents/${agentId}`)
      setRating(0)
      setComment('')
      alert("Review submitted successfully!")
    } catch (error: any) {
      console.error(error)
      alert(error.message || "Failed to submit review.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200/80 dark:border-zinc-800 p-8 shadow-sm mt-8">
      <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-4 flex items-center gap-2">
        <MessageSquare size={20} className="text-blue-500" />
        Verified Reviews
      </h2>

      {/* Conditional Form / Lock State */}
      <div className="mb-10 bg-zinc-50 dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800">
        {!hasHired ? (
          <div className="text-center py-6">
            <Lock className="mx-auto mb-3 text-zinc-300 dark:text-zinc-700" size={32} />
            <h3 className="font-bold text-zinc-900 dark:text-white mb-1">Verified Buyers Only</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">You must hire and deploy this agent before you can leave a review.</p>
          </div>
        ) : (
          <>
            <h3 className="font-bold text-zinc-900 dark:text-white mb-4">
              {userExistingReview ? 'Update your review' : 'Rate your experience'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star 
                      size={28} 
                      className={`${(hoverRating || rating) >= star ? 'fill-yellow-400 text-yellow-400' : 'text-zinc-300 dark:text-zinc-700'} transition-colors duration-200`} 
                    />
                  </button>
                ))}
              </div>
              <textarea 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What was your experience with this agent? (Optional)" 
                className="w-full px-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-zinc-900 dark:text-white placeholder:text-zinc-400 resize-none mb-4"
                rows={3}
              />
              <button 
                type="submit" 
                disabled={isSubmitting || rating === 0}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Verified Review'}
              </button>
            </form>
          </>
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {existingReviews.length === 0 ? (
          <p className="text-zinc-500 dark:text-zinc-400 italic text-sm">No verified reviews yet.</p>
        ) : (
          existingReviews.map((review) => (
            <div key={review.id} className="border-b border-zinc-100 dark:border-zinc-800 pb-6 last:border-0 last:pb-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={14} className={review.rating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-zinc-200 dark:text-zinc-800'} />
                  ))}
                </div>
                <span className="text-xs text-zinc-400">{new Date(review.created_at).toLocaleDateString()}</span>
              </div>
              {review.comment && <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{review.comment}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  )
}