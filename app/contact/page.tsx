'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail, Phone, MapPin, Send } from 'lucide-react'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', { name, email, message })
    // Reset form fields
    setName('')
    setEmail('')
    setMessage('')
    // Show a success message (in a real app, you'd want to handle this more robustly)
    alert('Thank you for your message. We will get back to you soon!')
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/" className="inline-block mb-8">
          <ArrowLeft className="h-6 w-6 text-white hover:text-red-500 transition-colors duration-200" />
        </Link>
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="mb-4">We'd love to hear from you. Please fill out the form or use our contact information below.</p>
            <div className="space-y-2">
              <p className="flex items-center">
                <Mail className="mr-2 text-red-500" /> support@moviematcher.com
              </p>
              <p className="flex items-center">
                <Phone className="mr-2 text-green-500" /> +1 (555) 123-4567
              </p>
              <p className="flex items-center">
                <MapPin className="mr-2 text-blue-500" /> 123 Movie Lane, Hollywood, CA 90001
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
              <textarea
                id="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition duration-200 ease-in-out flex items-center justify-center"
            >
              <Send className="mr-2" /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

