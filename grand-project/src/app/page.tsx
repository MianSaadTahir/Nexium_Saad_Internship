// src/app/login/page.tsx
'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    const { error } = await supabase.auth.signInWithOtp({ email })

    if (error) {
      console.error(error)
      setStatus('error')
    } else {
      setStatus('success')
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleLogin} className="w-full max-w-md bg-white shadow-md rounded-xl p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {status === 'loading' ? 'Sending...' : 'Send Magic Link'}
        </button>

        {status === 'success' && (
          <p className="text-green-600 text-sm text-center">Check your email for the login link!</p>
        )}
        {status === 'error' && (
          <p className="text-red-600 text-sm text-center">Something went wrong. Try again.</p>
        )}
      </form>
    </main>
  )
}
