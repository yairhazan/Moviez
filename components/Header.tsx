'use client'

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Bell, Film, MessageSquare, UserPlus, Clapperboard } from 'lucide-react';

interface Notification {
  id: number;
  message: string;
  read: boolean;
  type: 'match' | 'friend' | 'system';
}

interface HeaderProps {
  showBackButton?: boolean;
  currentPage: string;
}

export default function Header({ showBackButton = false, currentPage }: HeaderProps) {
  const [userId, setUserId] = useState<string>('')
  const [userName, setUserName] = useState<string>('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const notificationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setUserId(Math.floor(100000 + Math.random() * 900000).toString())
    setUserName('Demo User')
    // Mock notifications
    setNotifications([
      { id: 1, message: "New movie match!", read: false, type: 'match' },
      { id: 2, message: "Friend request from Alice", read: false, type: 'friend' },
      { id: 3, message: "New movies added to your preferences", read: true, type: 'system' },
    ])
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [notificationRef])

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
  }

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <header className="bg-gray-800 shadow-md py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          {showBackButton && (
            <Link href="/main" className="text-white hover:text-gray-300 mr-4">
              <ArrowLeft className="h-6 w-6" />
            </Link>
          )}
          <Link href="/main" className="flex items-center">
            <Film className="h-8 w-8 text-red-600 mr-2" />
            <span className="text-2xl font-bold text-white">Movie Matcher</span>
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row items-center">
          <div className="relative mr-4">
            <button 
              onClick={toggleNotifications}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              <Bell className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600 ring-2 ring-gray-800"></span>
              )}
            </button>
            {showNotifications && (
              <div 
                ref={notificationRef}
                className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-md shadow-lg overflow-hidden z-20 border border-gray-700"
              >
                <div className="py-2">
                  <h3 className="px-4 py-2 text-sm font-semibold text-gray-300 border-b border-gray-700">Notifications</h3>
                  {notifications.length > 0 ? (
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`px-4 py-3 hover:bg-gray-700 cursor-pointer flex items-center ${notification.read ? 'opacity-50' : ''}`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className={`rounded-full p-2 mr-3 ${
                            notification.type === 'match' ? 'bg-green-600' :
                            notification.type === 'friend' ? 'bg-blue-600' : 'bg-yellow-600'
                          }`}>
                            {notification.type === 'match' && <Clapperboard className="h-4 w-4 text-white" />}
                            {notification.type === 'friend' && <UserPlus className="h-4 w-4 text-white" />}
                            {notification.type === 'system' && <MessageSquare className="h-4 w-4 text-white" />}
                          </div>
                          <div className="flex-grow">
                            <p className={`text-sm ${notification.read ? 'text-gray-400' : 'text-white font-semibold'}`}>
                              {notification.message}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-2 text-sm text-gray-400">No notifications</div>
                  )}
                </div>
              </div>
            )}
          </div>
          <span className="text-white mb-2 sm:mb-0 sm:mr-2">{userName}</span>
          <span className="text-gray-400 mb-2 sm:mb-0 sm:mr-4">ID: {userId}</span>
          <Link 
            href="/profile" 
            className={`text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-full transition-colors duration-200 ${currentPage === 'profile' ? 'font-bold' : ''}`}
          >
            Profile
          </Link>
        </div>
      </div>
    </header>
  )
}

