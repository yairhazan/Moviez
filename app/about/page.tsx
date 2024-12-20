'use client'

import { useEffect } from 'react'
import { Film, Users, Shield, Star, Popcorn, Clapperboard, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      <motion.button
        onClick={() => window.history.back()}
        className="absolute top-6 left-6 text-white hover:text-gray-300 transition-colors duration-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
      >
        <ArrowLeft className="h-8 w-8" />
      </motion.button>
      <main className="max-w-6xl mx-auto px-4 py-12">
        <motion.h1 
          className="text-5xl font-bold mb-12 text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          About Movie Matcher
        </motion.h1>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <Film className="h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p>
              Movie Matcher is dedicated to bringing movie lovers together. We believe that cinema is a powerful medium for connection and shared experiences.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <Users className="h-12 w-12 text-green-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-3">Community</h2>
            <p>
              Join a vibrant community of film enthusiasts. Share recommendations, discuss your favorite scenes, and find your movie soulmates.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <Shield className="h-12 w-12 text-blue-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-3">Our Commitment</h2>
            <p>
              We're committed to providing a safe, engaging platform for all movie enthusiasts. Your enjoyment and privacy are our top priorities.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <Star className="h-12 w-12 text-yellow-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-3">Personalized Experience</h2>
            <p>
              Our advanced algorithms learn your preferences to suggest films you'll love. Discover hidden gems and new favorites tailored just for you.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <Popcorn className="h-12 w-12 text-orange-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-3">Movie Nights</h2>
            <p>
              Plan the perfect movie night with friends. Sync your preferences, vote on films, and create unforgettable cinema experiences together.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <Clapperboard className="h-12 w-12 text-purple-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-3">Diverse Selection</h2>
            <p>
              From classic masterpieces to the latest blockbusters, indie darlings to foreign films, we've got something for every taste and mood.
            </p>
          </motion.div>
        </motion.div>
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <p className="text-xl">
            Ready to embark on your cinematic journey?
          </p>
          <button 
            onClick={() => window.history.back()} 
            className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-200 ease-in-out"
          >
            Get Started
          </button>
        </motion.div>
      </main>
    </div>
  )
}

