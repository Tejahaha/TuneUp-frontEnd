import React from "react";

// Hero Section
const Hero = () => {
  return (
    <section className="bg-black text-white py-24 px-6 text-center relative">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our Platform</h1>
        <p className="text-lg text-gray-300 mb-8">
          Discover the best features and seamless experience with our product.
        </p>
      </div>
      <div className="absolute bottom-6 left-6">
        <a href="/signup" className="bg-blue-600 text-white px-6 py-3 rounded-lg mr-4">Sign Up</a>
        <a href="/login" className="bg-gray-700 text-white px-6 py-3 rounded-lg">Login</a>
      </div>
    </section>
  );
};

// Testimonials Section
const Testimonials = () => {
  const feedback = [
    { name: "John Doe", text: "Amazing platform! It changed the way I work." },
    { name: "Jane Smith", text: "Super intuitive and easy to use. Highly recommend!" },
    { name: "Alex Johnson", text: "Great support and features. Love it!" }
  ];

  return (
    <section className="bg-gray-900 text-white py-16 px-6 text-center">
      <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
      <div className="flex flex-col md:flex-row justify-center gap-6">
        {feedback.map((review, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg w-full md:w-1/3">
            <p className="text-gray-300">"{review.text}"</p>
            <h3 className="text-lg font-bold mt-4">- {review.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

// About Us Section
const AboutUs = () => {
  return (
    <section className="bg-black text-white py-16 px-6 text-center">
      <h2 className="text-3xl font-bold mb-6">About Us</h2>
      <p className="text-lg text-gray-300 max-w-3xl mx-auto">
        We are a team of passionate developers and designers committed to bringing you
        the best experience. Our mission is to create seamless and powerful solutions
        that make your life easier.
      </p>
    </section>
  );
};

// Main Landing Page Component
const LandingPage = () => {
  return (
    <div>
      <Hero />
      <Testimonials />
      <AboutUs />
    </div>
  );
};

export default LandingPage;

