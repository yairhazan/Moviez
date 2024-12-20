'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Settings, Lock, Eye, EyeOff } from 'lucide-react'
import Header from '@/components/Header'
import { ProtectedRoute } from '@/lib/AuthContext'

interface StreamingPlatform {
  name: string;
  color: string;
  isActive: boolean;
}

export default function ProfilePage() {
  const [streamingPlatforms, setStreamingPlatforms] = useState<StreamingPlatform[]>([
    { name: 'Netflix', color: 'bg-red-600', isActive: true },
    { name: 'Hulu', color: 'bg-green-500', isActive: false },
    { name: 'Disney+', color: 'bg-blue-600', isActive: true },
    { name: 'Amazon Prime', color: 'bg-yellow-500', isActive: false },
  ])
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const togglePlatform = (index: number) => {
    setStreamingPlatforms(platforms => 
      platforms.map((platform, i) => 
        i === index ? { ...platform, isActive: !platform.isActive } : platform
      )
    )
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement password change logic here
    console.log('Changing password:', { currentPassword, newPassword, confirmPassword })
    // Reset form and hide it after submission
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setShowChangePassword(false)
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-900 text-white">
        <Header showBackButton currentPage="profile" />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gray-800 rounded-lg shadow-xl p-6">
            <h2 className="text-3xl font-bold mb-4">User Profile</h2>
            
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <Settings className="mr-2" /> User Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-xl font-semibold mb-2">Streaming Platforms</h4>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    {streamingPlatforms.map((platform, index) => (
                      <button
                        key={platform.name}
                        onClick={() => togglePlatform(index)}
                        className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full font-semibold text-sm sm:text-base ${
                          platform.isActive ? platform.color : 'bg-gray-600'
                        } transition-colors duration-200`}
                      >
                        {platform.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => setShowChangePassword(!showChangePassword)}
                    className="flex items-center text-red-500 hover:text-red-400 transition-colors duration-200"
                  >
                    <Lock className="mr-2" /> Change Password
                  </button>
                  {showChangePassword && (
                    <form onSubmit={handleChangePassword} className="mt-4 space-y-4 max-w-md mx-auto">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300">
                          Current Password
                        </label>
                        <div className="mt-1 relative">
                          <input
                            type={showCurrentPassword ? "text" : "password"}
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                          >
                            {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300">
                          New Password
                        </label>
                        <div className="mt-1 relative">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                          >
                            {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          className="mt-1 w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-200 ease-in-out transform hover:scale-105"
                      >
                        Change Password
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Link 
                href="/swipe" 
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition duration-200 ease-in-out transform hover:scale-105"
              >
                Start Swiping
              </Link>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}

