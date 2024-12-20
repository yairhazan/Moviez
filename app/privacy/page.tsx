'use client'

import Link from 'next/link'
import { ArrowLeft, Shield, Eye, Lock, Trash2 } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/" className="inline-block mb-8">
          <ArrowLeft className="h-6 w-6 text-white hover:text-red-500 transition-colors duration-200" />
        </Link>
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3 flex items-center">
              <Shield className="mr-2 text-red-500" /> Introduction
            </h2>
            <p>
              At Movie Matcher, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3 flex items-center">
              <Eye className="mr-2 text-green-500" /> Information We Collect
            </h2>
            <p>We collect information that you provide directly to us, such as:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Personal information (e.g., name, email address)</li>
              <li>Profile information (e.g., movie preferences)</li>
              <li>Communication data (e.g., messages sent through our platform)</li>
              <li>Usage data (e.g., how you interact with our service)</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3 flex items-center">
              <Lock className="mr-2 text-blue-500" /> How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Provide, maintain, and improve our services</li>
              <li>Personalize your experience and provide movie recommendations</li>
              <li>Communicate with you about our service</li>
              <li>Monitor and analyze trends and usage of our service</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-3 flex items-center">
              <Trash2 className="mr-2 text-yellow-500" /> Data Retention and Deletion
            </h2>
            <p>
              We retain your information for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy. You can request deletion of your account and associated data at any time by contacting our support team.
            </p>
          </section>
        </div>
        <div className="mt-8">
          <p className="text-sm text-gray-400">
            This privacy policy was last updated on {new Date().toLocaleDateString()}. We may update this policy from time to time, and will notify you of any significant changes.
          </p>
        </div>
      </div>
    </div>
  )
}

