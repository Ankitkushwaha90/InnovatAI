export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      

      {/* Hero Section */}
      <section className="text-center py-24 px-6 bg-gradient-to-r from-green-900 via-black to-gray-800">
        <h2 className="text-4xl font-bold mb-4">Empowering Hackers. Securing the Future.</h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          CyberMind is an AI-driven cybersecurity assistant for vulnerability detection, penetration testing, and intelligent threat analysis.
        </p>
        <button className="mt-8 bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-6 rounded-xl shadow-xl">
          Launch Platform
        </button>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-10 bg-gray-900">
        <h3 className="text-3xl font-bold mb-10 text-center text-green-400">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <FeatureCard
            title="🔍 Vulnerability Scanner"
            desc="Real-time scanning of networks and web apps for known CVEs and unknown threats."
          />
          <FeatureCard
            title="🧠 AI Threat Analysis"
            desc="LLMs trained on cybersecurity datasets for intelligent exploit detection and insights."
          />
          <FeatureCard
            title="💻 Pentesting Toolkit"
            desc="Built-in terminal tools for recon, Wi-Fi hacking, and exploitation simulations."
          />
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-6 bg-gray-950 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6 text-green-400">About CyberMind</h3>
          <p className="text-gray-400 leading-relaxed">
            CyberMind is designed for ethical hackers and security teams to streamline threat detection and proactive defense.
            Combining AI with cybersecurity workflows, it provides real-time protection and learning resources.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black p-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} CyberMind. Built with ❤️ for Security.
      </footer>
    </main>
  );
}

// Reusable Card
type FeatureCardProps = {
  title: string;
  desc: string;
};
function FeatureCard({ title, desc }: FeatureCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-green-500/30 transition duration-200">
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-300">{desc}</p>
    </div>
  );
}
