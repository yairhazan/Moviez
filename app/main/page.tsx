'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Film, Play, UserPlus, Users } from 'lucide-react'
import Header from '@/components/Header'
import { HowItWorksPopup } from '@/components/HowItWorksPopup'
import { ProtectedRoute } from '@/lib/AuthContext'

export default function MainPage() {
  const [showConnectPopup, setShowConnectPopup] = useState(false)
  const [partnerId, setPartnerId] = useState('')
  const [showHowItWorks, setShowHowItWorks] = useState(false)

  useEffect(() => {
    // Check if it's the user's first visit
    const isFirstVisit = localStorage.getItem('isFirstVisit') !== 'false'
    if (isFirstVisit) {
      setShowHowItWorks(true)
      localStorage.setItem('isFirstVisit', 'false')
    }
  }, [])

  const handleConnect = () => {
    // Implement connection logic here
    console.log('Connecting with partner:', partnerId)
    setShowConnectPopup(false)
    setPartnerId('')
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-900 text-white">
        <Header currentPage="main" />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold mb-4">Welcome to Movie Matcher</h1>
            <p className="text-xl text-gray-300">Find your perfect movie match and enjoy cinema with friends!</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 flex flex-col items-center transition duration-300 ease-in-out transform hover:scale-105">
              <Play className="h-16 w-16 text-red-600 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Start Swiping</h2>
              <p className="text-gray-300 mb-4 text-center">Discover new movies and find your next favorite!</p>
              <Link href="/swipe" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition duration-200 ease-in-out w-full text-center">
                Swipe Now
              </Link>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-xl p-6 flex flex-col items-center transition duration-300 ease-in-out transform hover:scale-105">
              <UserPlus className="h-16 w-16 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Connect Partner</h2>
              <p className="text-gray-300 mb-4 text-center">Find a movie buddy and start matching together!</p>
              <button
                onClick={() => setShowConnectPopup(true)}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-200 ease-in-out w-full"
              >
                Connect Now
              </button>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-xl p-6 flex flex-col items-center transition duration-300 ease-in-out transform hover:scale-105">
              <Users className="h-16 w-16 text-blue-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Your Partners</h2>
              <p className="text-gray-300 mb-4 text-center">View your connected partners and shared matches!</p>
              <Link href="/partners" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-200 ease-in-out w-full text-center">
                View Partners
              </Link>
            </div>
          </div>
        </main>

        {showConnectPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Connect with a Partner</h2>
              <div className="mb-4">
                <label htmlFor="partnerId" className="block text-sm font-medium text-gray-300 mb-2">
                  Enter Partner's Name, Email, or 6-digit ID
                </label>
                <input
                  type="text"
                  id="partnerId"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={partnerId}
                  onChange={(e) => setPartnerId(e.target.value)}
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowConnectPopup(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConnect}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full"
                >
                  Connect
                </button>
              </div>
            </div>
          </div>
        )}

        <HowItWorksPopup isOpen={showHowItWorks} onClose={() => setShowHowItWorks(false)} />
      </div>
    </ProtectedRoute>
  )
}

