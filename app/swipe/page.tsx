'use client'

import { useState, useEffect } from 'react'
import { X, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/Header'
import { ProtectedRoute } from '@/lib/AuthContext'
import { getMoviesToSwipe, Movie } from '@/lib/tmdb'
import { addMovieLike } from '@/lib/matches'
import { useAuth } from '@/lib/AuthContext'

export default function SwipePage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const fetchedMovies = await getMoviesToSwipe()
        setMovies(fetchedMovies)
      } catch (error) {
        console.error('Error fetching movies:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovies()
  }, [])

  const handleSwipe = async (newDirection: 'left' | 'right') => {
    if (currentIndex >= movies.length || !user) return

    setDirection(newDirection)
    setCurrentIndex(prevIndex => prevIndex + 1)
    
    if (newDirection === 'right') {
      try {
        await addMovieLike(user.uid, movies[currentIndex].id)
        console.log('Liked:', movies[currentIndex].title)
      } catch (error) {
        console.error('Error adding movie like:', error)
      }
    } else {
      console.log('Disliked:', movies[currentIndex].title)
    }
  }

  const currentMovie = movies[currentIndex]

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-900 flex flex-col">
          <Header showBackButton currentPage="swipe" />
          <div className="flex-grow flex items-center justify-center">
            <div className="loading-pulse">
              <Film className="h-16 w-16 text-red-600" />
            </div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Header showBackButton currentPage="swipe" />

        <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-sm mx-auto">
            <div className="relative aspect-[2/3]">
              <AnimatePresence initial={false} mode="wait">
                {currentMovie && (
                  <motion.div
                    key={currentMovie.id}
                    className="movie-card absolute inset-0 bg-gray-800 rounded-lg shadow-xl overflow-hidden"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{
                      x: direction === 'left' ? -300 : 300,
                      opacity: 0,
                      scale: 0.8,
                      rotate: direction === 'left' ? -20 : 20,
                      transition: { duration: 0.3, ease: "easeInOut" }
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    <img
                      src={currentMovie.poster_path}
                      alt={currentMovie.title}
                      className="w-full h-full object-cover"
                      draggable="false"
                    />
                    <div className="poster-gradient absolute bottom-0 left-0 right-0 pt-20 px-4 pb-4">
                      <h2 className="text-2xl font-bold text-white mb-2">{currentMovie.title}</h2>
                      <p className="text-yellow-400 mb-2">Rating: {currentMovie.vote_average.toFixed(1)}/10</p>
                      <p className="text-gray-200 text-sm line-clamp-3">{currentMovie.overview}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {currentIndex >= movies.length ? (
              <div className="text-center text-white mt-8">
                <h2 className="text-2xl font-bold mb-4">No more movies to swipe!</h2>
                <Link 
                  href="/main" 
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-200 ease-in-out"
                >
                  Back to Main
                </Link>
              </div>
            ) : (
              <div className="flex justify-center space-x-8 mt-8">
                <button
                  onClick={() => handleSwipe('left')}
                  className="swipe-button bg-red-600 hover:bg-red-700 text-white font-bold p-4 rounded-full shadow-lg w-16 h-16 flex items-center justify-center"
                >
                  <X className="h-8 w-8" />
                </button>
                <button
                  onClick={() => handleSwipe('right')}
                  className="swipe-button bg-green-600 hover:bg-green-700 text-white font-bold p-4 rounded-full shadow-lg w-16 h-16 flex items-center justify-center"
                >
                  <Check className="h-8 w-8" />
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}

