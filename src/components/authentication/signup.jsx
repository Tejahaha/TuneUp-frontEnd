"use client"

import { useState } from "react"
import { FaGoogle, FaApple, FaFacebookF } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { userService } from "../../services/api"
import { motion } from "framer-motion"
import "./Signup.css"
import {cn} from '../lib/utils'

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

const Signup = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" })
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await userService.register(formData.username, formData.email, formData.password)
      toast.success("Account created successfully!")
      navigate("/login")
    } catch (error) {
      setErrorMessage(error.message || "Signup failed")
      toast.error(error.message || "Signup failed")
    }
  }

  return (
    <div className="signup-container relative min-h-screen w-full overflow-hidden bg-[#030303] text-white">
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
      <div className="signup-box relative z-10 bg-white/10 backdrop-blur-md rounded-lg p-8">
        <h2 className="signup-title text-3xl font-bold mb-4">Create an Account</h2>
        <p className="signup-subtitle text-white/70 mb-6">Join and start streaming music today</p>

        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-field w-full px-4 py-2 bg-white/20 rounded-md text-white placeholder-white/50 mb-4"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
          />
          <input
            type="email"
            className="input-field w-full px-4 py-2 bg-white/20 rounded-md text-white placeholder-white/50 mb-4"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            type="password"
            className="input-field w-full px-4 py-2 bg-white/20 rounded-md text-white placeholder-white/50 mb-4"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          {errorMessage && <div className="error-message text-red-500 mt-2">{errorMessage}</div>}

          <motion.button
            type="submit"
            className="signup-button w-full mt-6 bg-gradient-to-r from-indigo-500 to-rose-500 text-white font-semibold py-2 px-4 rounded-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </motion.button>
        </form>

        <div className="divider my-6 text-white/50">
          <span>Or sign up with</span>
        </div>

        <div className="social-login flex justify-center space-x-4">
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

        <p className="login-link mt-6 text-center text-white/70">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="text-white cursor-pointer hover:underline">
            Log in
          </span>
        </p>
      </div>
    </div>
  )
}

export default Signup

