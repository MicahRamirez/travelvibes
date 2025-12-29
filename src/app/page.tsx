export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/10 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-white">TravelVibes</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-white/90 hover:text-white transition">Destinations</a>
              <a href="#" className="text-white/90 hover:text-white transition">Experiences</a>
              <a href="#" className="text-white/90 hover:text-white transition">About</a>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-full font-medium hover:bg-blue-50 transition">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Burmese Mountain Dog Section */}
          <div className="mb-12">
            <img
              src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=600&fit=crop"
              alt="Burmese Mountain Dog"
              className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full mx-auto shadow-2xl border-4 border-white"
            />
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-6">
              Kanako :)
            </h2>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Discover Your Next
            <span className="block text-yellow-300">Adventure</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
            Plan unforgettable trips, explore breathtaking destinations, and create memories that last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition shadow-lg hover:shadow-xl">
              Start Exploring
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose TravelVibes?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="🌍"
              title="Global Destinations"
              description="Access thousands of destinations worldwide with curated recommendations and local insights."
            />
            <FeatureCard
              icon="📅"
              title="Smart Planning"
              description="Create detailed itineraries with our intelligent trip planner that adapts to your preferences."
            />
            <FeatureCard
              icon="💬"
              title="Travel Community"
              description="Connect with fellow travelers, share experiences, and get tips from locals."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of travelers who have discovered their perfect trips with TravelVibes.
          </p>
          <button className="bg-white text-indigo-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-50 transition shadow-lg">
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold mb-4 md:mb-0">TravelVibes</div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition">Contact</a>
            </div>
          </div>
          <div className="text-center text-gray-500 mt-8">
            © 2024 TravelVibes. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
