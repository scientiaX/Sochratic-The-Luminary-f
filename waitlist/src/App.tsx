export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between px-4 sm:px-6 py-4 bg-white">
        <div className="text-lg sm:text-xl font-bold text-gray-900">Nova X</div>
        <nav className="hidden sm:flex items-center space-x-7">
          <a href="#" className="text-gray-600 hover:text-gray-900 font-bold">
            masukan
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 font-bold">
            dukungan
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 font-bold">
            coming soon feature
          </a>
          <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
            pre-register
          </button>
        </nav>
        <button className="sm:hidden bg-black text-white px-3 py-2 rounded-lg text-sm">
          Menu
        </button>
      </header>

      <main className="px-4 sm:px-6 py-2">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              10 menit sehari
              <br />
              meningkatkan problem
              <br />
              solving
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl">
              cukup 1% dari waktumu untuk latih soft skill tingkat dewa
            </p>
            <a
              href="#"
              className="bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-medium hover:bg-gray-800 transition-colors w-full sm:w-auto inline-block text-center"
            >
              mulai 10 menit pertamamu
            </a>
          </div>

          <div className="relative">
            <div className="p-0 relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-500 mb-4">
                world economic forum
              </h2>
              <p className="text-base sm:text-lg text-gray-700 mb-8 sm:mb-12">
                menurut WEF problem solving adalah skill paling di butuhkan di era
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>automatisasi dan era ai orchestrator(nanti)
              </p>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-500 mb-4">
                top skills on linkedIn
              </h2>
              <p className="text-base sm:text-lg text-gray-700">
                problem solving adalah skill yang paling di cari di linkedIn
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
