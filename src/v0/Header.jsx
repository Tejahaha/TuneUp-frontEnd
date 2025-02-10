"use client"

import { useState } from "react"
import { Search, ChevronDown } from "lucide-react"

export default function Header({ setSearchQuery }) {
  const [localSearchQuery, setLocalSearchQuery] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchQuery(localSearchQuery)
  }

  return (
    <header className="bg-gray-800 p-4 flex items-center justify-between">
      <form onSubmit={handleSearch} className="flex-1 max-w-xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for Artists, Songs, or Podcasts"
            className="w-full bg-gray-700 rounded-full py-2 px-4 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </form>
      <div className="flex items-center ml-4">
        <span className="mr-2 text-white">Username</span>
        <ChevronDown className="text-gray-400" />
      </div>
    </header>
  )
}

