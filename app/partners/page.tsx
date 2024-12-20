'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Info } from 'lucide-react'
import Header from '@/components/Header'
import { ProtectedRoute } from '@/lib/AuthContext'

interface Movie {
  id: string;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
}

interface Partner {
  id: string;
  name: string;
  matchedMovies: Movie[];
}

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  useEffect(() => {
    // Simulate fetching partners data
    setPartners([
      { 
        id: '123456', 
        name: 'Alice', 
        matchedMovies: [
          { id: '1', title: 'The Shawshank Redemption', poster_path: '/placeholder.svg?height=150&width=100', overview: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', release_date: '1994-09-23' },
          { id: '2', title: 'Pulp Fiction', poster_path: '/placeholder.svg?height=150&width=100', overview: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', release_date: '1994-10-14' },
        ] 
      },
      { 
        id: '234567', 
        name: 'Bob', 
        matchedMovies: [
          { id: '3', title: 'The Godfather', poster_path: '/placeholder.svg?height=150&width=100', overview: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', release_date: '1972-03-14' },
          { id: '4', title: 'The Dark Knight', poster_path: '/placeholder.svg?height=150&width=100', overview: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.', release_date: '2008-07-18' },
        ] 
      },
    ])
  }, [])

  const removeMovie = (partnerId: string, movieId: string) => {
    setPartners(partners.map(partner => {
      if (partner.id === partnerId) {
        return {
          ...partner,
          matchedMovies: partner.matchedMovies.filter(movie => movie.id !== movieId)
        }
      }
      return partner
    }))
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-900 text-white">
        <Header showBackButton currentPage="partners" />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {partners.length === 0 ? (
            <div className="text-center">
              <p className="text-xl mb-4">You haven't connected with any partners yet.</p>
              <Link href="/main" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-200 ease-in-out">
                Find Partners
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {partners.map((partner) => (
                <div key={partner.id} className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-red-600 rounded-full p-3 mr-4">
                        <span className="text-2xl font-bold">{partner.name[0].toUpperCase()}</span>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{partner.name}</h2>
                        <p className="text-gray-400">ID: {partner.id}</p>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Matched Movies:</h3>
                    {partner.matchedMovies.length === 0 ? (
                      <p className="text-gray-400">No matches yet</p>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-2">
                        {partner.matchedMovies.map((movie) => (
                          <div key={movie.id} className="relative group">
                            <img 
                              src={movie.poster_path} 
                              alt={movie.title} 
                              className="w-full h-32 sm:h-48 object-cover rounded-md mb-2 cursor-pointer"
                              onClick={() => setSelectedMovie(movie)}
                            />
                            <p className="text-sm text-center">{movie.title}</p>
                            <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => removeMovie(partner.id, movie.id)}
                                className="bg-red-600 hover:bg-red-700 text-white rounded-full p-1"
                              >
                                <X className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => setSelectedMovie(movie)}
                                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-1"
                              >
                                <Info className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {selectedMovie && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedMovie.title}</h2>
                <button onClick={() => setSelectedMovie(null)} className="text-gray-400 hover:text-white">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <img 
                src={selectedMovie.poster_path} 
                alt={selectedMovie.title} 
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <p className="text-gray-300 mb-2">Release Date: {selectedMovie.release_date}</p>
              <p className="text-gray-300">{selectedMovie.overview}</p>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}

