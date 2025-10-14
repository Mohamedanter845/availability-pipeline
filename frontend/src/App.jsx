import { useState } from 'react'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-dvh flex flex-col bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <header className="sticky top-0 z-20 border-b bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <a href="/" className="text-xl font-bold tracking-tight">Teamavail</a>
          <button
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md border border-slate-300 hover:bg-slate-100 active:bg-slate-200 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
              <path fillRule="evenodd" d="M3.75 6.75A.75.75 0 014.5 6h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zm0 5.25a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zm0 5.25a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z" clipRule="evenodd" />
            </svg>
          </button>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#features" className="hover:text-blue-600">Features</a>
            <a href="#docs" className="hover:text-blue-600">Docs</a>
            <a href="#contact" className="hover:text-blue-600">Contact</a>
            <a href="#get-started" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-500">Get Started</a>
          </nav>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="px-4 py-2 grid gap-2 text-sm">
              <a href="#features" className="py-1">Features</a>
              <a href="#docs" className="py-1">Docs</a>
              <a href="#contact" className="py-1">Contact</a>
              <a href="#get-started" className="py-2 text-center rounded-md bg-blue-600 text-white">Get Started</a>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 py-16 grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Build and Ship with CI/CD
            </h1>
            <p className="text-lg text-slate-600">
              Ship faster with a modern starter using Vite, React and Tailwind.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#get-started" className="px-5 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-500 text-center">Get Started</a>
              <a href="#learn" className="px-5 py-3 rounded-md border border-slate-300 hover:bg-slate-50 text-center">Learn More</a>
            </div>
            <ul className="grid grid-cols-2 gap-4 text-slate-600">
              <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-green-500"></span>Responsive</li>
              <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-blue-500"></span>Fast HMR</li>
              <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-purple-500"></span>Utility-first</li>
              <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-amber-500"></span>Production-ready</li>
            </ul>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] w-full rounded-xl border bg-white/80 shadow-sm overflow-hidden">
              <div className="absolute inset-0 p-4 grid grid-cols-12 grid-rows-6 gap-2">
                <div className="col-span-12 row-span-1 rounded-md bg-slate-100"></div>
                <div className="col-span-3 row-span-5 rounded-md bg-slate-100"></div>
                <div className="col-span-9 row-span-5 rounded-md bg-slate-100"></div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Teamavail. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#privacy" className="hover:text-slate-700">Privacy</a>
            <a href="#terms" className="hover:text-slate-700">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
