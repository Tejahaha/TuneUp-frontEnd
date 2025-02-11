"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { userService } from "../../services/api"
import { FaGoogle, FaApple, FaFacebookF } from "react-icons/fa"
import { motion } from "framer-motion"
import "./Login.css"
import { cn } from "../lib/utils"

function ElegantShape({ className, delay = 0, width = 400, height = 100, rotate = 0, gradient = "from-white/[0.08]" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate: rotate }}
      transition={{ duration: 2.4, delay, ease: [0.23, 0.86, 0.39, 0.96], opacity: { duration: 1.2 } }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]",
          )}
        />
      </motion.div>
    </motion.div>
  )
}

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await userService.login(email, password)
      toast.success("Welcome back!")
      navigate("/app")
    } catch (error) {
      setErrorMessage(error.message || "Invalid email or password")
      toast.error(error.message || "Login failed")
    }
  }

  return (
    <div className="login-container relative min-h-screen w-full overflow-hidden bg-[#030303] text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-indigo-500/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />
        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-rose-500/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />
        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-violet-500/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />
      </div>
      <div className="login-box relative z-10 bg-white/10 backdrop-blur-md rounded-lg p-8">
        <div className="text-center">
          <h2 className="login-title text-3xl font-bold mb-4">Welcome back to TuneUp</h2>
          <p className="login-subtitle text-white/70 mb-6">Let's get back to the rhythm</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group space-y-4">
            <input
              id="email-address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field w-full px-4 py-2 bg-white/20 rounded-md text-white placeholder-white/50"
              placeholder="Email address"
              required
            />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field w-full px-4 py-2 bg-white/20 rounded-md text-white placeholder-white/50"
              placeholder="Password"
              required
            />
          </div>
          {errorMessage && <div className="error-message text-red-500 mt-2">{errorMessage}</div>}
          <motion.button
            type="submit"
            className="login-button w-full mt-6 bg-gradient-to-r from-indigo-500 to-rose-500 text-white font-semibold py-2 px-4 rounded-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign in and feel the beat
          </motion.button>
        </form>
        <div className="social-login mt-6 flex justify-center space-x-4">
          <motion.button
            className="social-button google bg-white/20 p-2 rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaGoogle />
          </motion.button>
          <motion.button
            className="social-button apple bg-white/20 p-2 rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaApple />
          </motion.button>
          <motion.button
            className="social-button facebook bg-white/20 p-2 rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaFacebookF />
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default Login

