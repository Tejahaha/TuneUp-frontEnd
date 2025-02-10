import { Headphones, Mic2, Share2, Radio, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import Logo from "../components/Logo"
import { Link } from "react-router-dom";

const HarmonyLandingPage = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      {/* Header */}

<header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/75">
  <div className="container mx-auto flex h-14 items-center justify-between px-4">
    <div className="w-32"><Logo/></div>
    <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
      <button
        onClick={() => scrollToSection("features")}
        className="text-yellow-300 hover:text-yellow-500 transition-colors"
      >
        Features
      </button>
      <button
        onClick={() => scrollToSection("testimonials")}
        className="text-yellow-300 hover:text-yellow-500 transition-colors"
      >
        Testimonials
      </button>
    </nav>
    <div className="flex space-x-2">
      <Link to="/Login">
        <button className="px-4 py-2 text-sm font-medium text-yellow-300 border border-yellow-300 rounded hover:bg-yellow-300 hover:text-gray-900 transition-colors">
          Login
        </button>
      </Link>
      <Link to="/SignUp">
        <button className="px-4 py-2 text-sm font-medium bg-yellow-300 text-gray-900 rounded hover:bg-yellow-400 transition-colors">
          Sign Up
        </button>
      </Link>
    </div>
  </div>
</header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Your Music, Your Way
            </h1>
            <p className="mx-auto max-w-[600px] text-yellow-100 md:text-xl">
              Harmony brings your favorite tunes to life with advanced features and a sleek interface. Discover, play,
              and share music like never before.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-yellow-300">
            Key Features
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {[
              {
                icon: <Headphones className="h-10 w-10 text-yellow-300" />,
                title: "Smart Playlists",
                description: "Create dynamic playlists that adapt to your listening habits.",
              },
              {
                icon: <Mic2 className="h-10 w-10 text-yellow-300" />,
                title: "Lyrics Sync",
                description: "Sing along with real-time synchronized lyrics.",
              },
              {
                icon: <Share2 className="h-10 w-10 text-yellow-300" />,
                title: "Social Sharing",
                description: "Share your favorite tracks and playlists with friends.",
              },
              {
                icon: <Radio className="h-10 w-10 text-yellow-300" />,
                title: "Offline Mode",
                description: "Enjoy your music anywhere, even without an internet connection.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-2 border border-yellow-300/20 p-4 rounded-lg bg-gray-800"
              >
                {feature.icon}
                <h3 className="text-xl font-bold text-yellow-300">{feature.title}</h3>
                <p className="text-yellow-100 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-yellow-300">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {[
              {
                quote: "Harmony has completely changed how I experience music. The smart playlists are incredible!",
                author: "Alex Johnson",
                title: "Music Enthusiast",
              },
              {
                quote: "As a professional DJ, Harmony's features have become an essential part of my workflow.",
                author: "Samantha Lee",
                title: "Professional DJ",
              },
              {
                quote: "The social sharing feature has helped me discover so much great new music through my friends.",
                author: "Mike Chen",
                title: "Indie Artist",
              },
            ].map((testimonial, index) => (
              <div key={index} className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <p className="text-xl italic text-yellow-100">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold text-yellow-300">{testimonial.author}</p>
                    <p className="text-sm text-yellow-100/80">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-yellow-300">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">
                Ready to Transform Your Music Experience?
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl">
                Join millions of music lovers and start your Harmony journey today. Your perfect soundtrack awaits!
              </p>
            </div>
            <button className="px-8 py-3 text-lg font-semibold bg-gray-900 text-yellow-300 rounded-full hover:bg-gray-800 transition-colors">
              Sign Up Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-yellow-300">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-yellow-100 hover:text-yellow-300 transition-colors">
                    Features
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-yellow-300">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-yellow-100 hover:text-yellow-300 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-yellow-100 hover:text-yellow-300 transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-yellow-300">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-yellow-100 hover:text-yellow-300 transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-yellow-100 hover:text-yellow-300 transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 flex justify-between items-center">
            <p className="text-sm text-yellow-100/80">© 2023 TuneUp. All rights reserved.</p>
            <div className="flex space-x-4">
              {[
                { icon: <Facebook className="h-6 w-6" />, label: "Facebook" },
                { icon: <Twitter className="h-6 w-6" />, label: "Twitter" },
                { icon: <Instagram className="h-6 w-6" />, label: "Instagram" },
                { icon: <Youtube className="h-6 w-6" />, label: "YouTube" },
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  aria-label={social.label}
                  className="text-yellow-100/80 hover:text-yellow-300 transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HarmonyLandingPage

