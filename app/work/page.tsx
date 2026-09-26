import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nityanand Yadav — Explore My Work",
  description: "Select a category to dive into my core domains of expertise.",
};

const NAME = "Nityanand Yadav";

// Same destination as the "Let's talk" button on the home hero.
// Keep this in sync with TALK_LINK in components/glass-hero.tsx.
const TALK_LINK = "https://wa.me/916388223572";

const CATEGORIES = [
  {
    title: "My Civil Work",
    description: "Plan, design, and structural execution",
    href: "https://dc.crsorgi.gov.in/crs/",
    image: "/images/work/civil-work.png",
  },
  {
    title: "My Resume",
    description: "Professional credentials & expertise",
    href: "https://myhouse.designsoftware.com/English/myhouse/",
    image: "/images/work/resume.png",
  },
  {
    title: "My Digital Designs",
    description: "Visual portfolios and creative arts",
    href: "https://ibb.co/album/h1P2qk",
    image: "/images/work/digital-designs.png",
  },
];

export default function WorkPage() {
  return (
    <div className="font-grotesk bg-[#f0f6fc]/50 text-slate-900 min-h-screen relative overflow-x-hidden selection:bg-slate-900 selection:text-white flex flex-col justify-between">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-[10px] scale-105 opacity-90"
          style={{ backgroundImage: "url('https://i.ibb.co/zH044ZqH/image.jpg')" }}
        />
      </div>

      <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0" aria-hidden />

      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40" aria-hidden>
        <svg
          className="absolute -top-32 -left-32 w-[1200px] h-[1200px] text-slate-300"
          viewBox="0 0 800 800"
          fill="none"
        >
          <circle cx="200" cy="200" r="600" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
      </div>

      <header className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 py-8 w-full flex items-center justify-between glass-card rounded-2xl my-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full border border-slate-900 flex items-center justify-center font-medium text-sm transition-transform group-hover:scale-105">
            {NAME.charAt(0)}
          </div>
          <span className="font-medium tracking-tight text-lg">{NAME}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <Link href="/work" className="hover:text-slate-900 transition-colors">
            Work
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={TALK_LINK}
            target="_blank"
            rel="noreferrer"
            className="bg-white/80 border border-slate-200 text-slate-900 px-5 py-2.5 rounded-full text-sm font-medium shadow-sm hover:bg-slate-900 hover:text-white transition-all duration-300"
          >
            Let&rsquo;s talk
          </a>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 py-12 flex flex-col items-center justify-center text-center my-auto">
        <div className="mb-14 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 mb-4">
            What you want to explore?
          </h1>
          <p className="text-slate-600 text-lg">
            Select a category below to dive into my core domains of expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {CATEGORIES.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-box p-0 rounded-[40px] text-left flex flex-col justify-end group overflow-hidden relative h-64 sm:h-72 shadow-lg"
            >
              <div className="absolute inset-0 z-0 overflow-hidden rounded-[40px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              </div>
              <div className="relative z-10 p-6 text-white">
                <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="text-xs text-slate-200 mt-0.5">{item.description}</p>
              </div>
            </a>
          ))}
        </div>
      </main>

      <footer className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 pb-8 w-full flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200/60 pt-6 text-xs text-slate-500 glass-card rounded-2xl mb-4">
        <div>© 2026 {NAME}. All rights reserved.</div>
      </footer>
    </div>
  );
}
