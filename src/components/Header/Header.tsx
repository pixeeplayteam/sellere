'use client'

import { Globe, User } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-gray-900">Inventory Dashboard</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition">
              <Globe className="h-4 w-4 mr-2" />
              <span>English</span>
            </button>
            <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition">
              <User className="h-4 w-4 mr-2" />
              <span>Account</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
