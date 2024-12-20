'use client'

import { AuthProvider } from '../lib/AuthContext'

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-900 text-white">
      <AuthProvider>{children}</AuthProvider>
    </div>
  )
} 