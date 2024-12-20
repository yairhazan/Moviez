import Link from 'next/link'
import { Film } from 'lucide-react'
import SlidingMoviePosters from '@/components/SlidingMoviePosters'


export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <Film className="mx-auto h-12 w-12 text-red-600" />
            <h1 className="mt-6 text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              Moviez
            </h1>
            <p className="mt-3 text-xl text-gray-300 sm:mt-5">
              Discover Your Perfect Movie Match
            </p>
            <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg">
              Swipe, match, and enjoy movies with friends. Your next favorite film is just a click away.
            </p>
          </div>
          <div className="mt-8 sm:mt-10 space-y-4">
            <Link href="/login" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out">
              Sign In
            </Link>
            <Link href="/register" className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out">
              Sign Up
            </Link>
          </div>
        </div>
      </main>
      <footer className="py-4 text-center text-sm text-gray-400">
        <div className="space-x-4">
          <Link href="/about" className="hover:text-white transition duration-150 ease-in-out">About</Link>
          <Link href="/contact" className="hover:text-white transition duration-150 ease-in-out">Contact</Link>
          <Link href="/privacy" className="hover:text-white transition duration-150 ease-in-out">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  )
}

