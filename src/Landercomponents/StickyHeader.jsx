"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Menu, X, Music } from "lucide-react"

export function StickyHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const { scrollY } = useScroll()
  const backgroundColor = useTransform(scrollY, [0, 100], ["rgba(3, 3, 3, 0)", "rgba(3, 3, 3, 0.8)"])

  useEffect(() => {
    const handleResize = () => setIsOpen(false)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <motion.header style={{ backgroundColor }} className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <nav className="flex items-center justify-between">
          <motion.a
            href="#"
            className="text-white text-2xl font-bold flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Music className="w-8 h-8" />
            <span>MusicApp</span>
          </motion.a>
          <div className="hidden md:flex space-x-8">
            {["Home", "Features", "Pricing", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white/80 hover:text-white transition-colors"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
          <motion.button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X /> : <Menu />}
          </motion.button>
        </nav>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-black/90 backdrop-blur-md"
        >
          <div className="container mx-auto px-4 py-4">
            {["Home", "Features", "Pricing", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block py-2 text-white/80 hover:text-white transition-colors"
                whileHover={{ x: 5 }}
                whileTap={{ x: 0 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

