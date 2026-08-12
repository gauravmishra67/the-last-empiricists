import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { useScrollReveal } from "./hooks/useScrollReveal";
import LoadingScreen from "./components/LoadingScreen";

const SentinelGrid = lazy(() => import("./components/SentinelGrid"));

/* ─── Characters Data ─── */
const characters = [
  {
    name: "Harry",
    caste: "empiricist" as const,
    desc: "Nineteen. A village boy who spends his nights quietly logging the patrol patterns of the sentinel units above the city.",
  },
  {
    name: "Mira",
    caste: "empiricist" as const,
    desc: "Harry's closest friend, and a Pillar operative. The one who tells him the truth.",
  },
  {
    name: "Ren",
    caste: "empiricist" as const,
    desc: "Commander of the Arch. Thirty-four, with one arm replaced in metal.",
  },
  {
    name: "Dax",
    caste: "empiricist" as const,
    desc: "The other recruit, carrying his father's knowledge — and his father's grief.",
  },
  {
    name: "Lyra",
    caste: "rationalist" as const,
    desc: "A Rationalist who sat on the wrong step at midnight, and saw something she shouldn't have.",
  },
  {
    name: "Elder Sona",
    caste: "empiricist" as const,
    desc: "Sixty-three. Old enough to remember the transition years, and determined to keep that history alive.",
  },
  {
    name: "Davan",
    caste: "empiricist" as const,
    desc: "Harry's father. Quiet, steady, and holding a twenty-year-old secret.",
  },
  {
    name: "Dr. Elias Vance",
    caste: "Scientist" as const,
    desc: "The scientist who built Prime. Missing since 2067. Not gone.",
  },
];

/* ─── Section Divider ─── */
function CasteDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-2" aria-hidden="true">
      <span className="block h-px w-12 bg-ember/40" />
      <span className="block h-1.5 w-1.5 rounded-full bg-ember/60" />
      <span className="block h-px w-8 bg-paper-faint/20" />
      <span className="block h-1.5 w-1.5 rounded-full bg-cyan-steel/60" />
      <span className="block h-px w-12 bg-cyan-steel/40" />
    </div>
  );
}

/* ─── Sticky CTA bar (mobile) ─── */
function MobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex gap-3 border-t border-night-lighter bg-night/95 p-3 backdrop-blur-sm md:hidden">
      <a
        href="/novel.pdf"
        className="flex-1 rounded-lg bg-ember py-2.5 text-center font-sans text-sm font-semibold text-night transition-colors hover:bg-ember-light focus-visible:ring-2 focus-visible:ring-ember"
      >
        Read Online
      </a>
      <a
        href="/novel.pdf"
        download
        className="flex-1 rounded-lg border border-cyan-steel/40 py-2.5 text-center font-sans text-sm font-semibold text-cyan-steel transition-colors hover:bg-cyan-steel/10 focus-visible:ring-2 focus-visible:ring-cyan-steel"
      >
        Download PDF
      </a>
    </div>
  );
}

/* ─── HERO ─── */
function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          alt=""
          className="h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-night/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" />
      </div>

      {/* Sentinel grid overlay */}
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <SentinelGrid />
        </Suspense>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-5 py-24 text-center">
        {/* Metadata line */}
        <p className="mb-6 font-mono text-xs tracking-[0.3em] text-cyan-steel/70 uppercase">
          California · 2113 · A Novel
        </p>

        {/* Title lockup */}
        <h1 className="font-serif text-5xl font-bold leading-[1.1] tracking-tight text-paper sm:text-6xl md:text-7xl lg:text-8xl">
          The Last
          <br />
          <span className="bg-gradient-to-r from-ember via-ember-light to-ember bg-clip-text text-transparent">
            Empiricists
          </span>
        </h1>

        {/* Tagline */}
        <p className="mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed text-paper-dim sm:text-lg md:mt-8 md:text-xl">
          A story of two castes, a stolen mind, and a boy who walked toward the
          thing everyone else walked away from.
        </p>

        {/* Cover image */}
        <div className="mx-auto mt-10 max-w-[220px] sm:max-w-[260px]">
          <div className="relative overflow-hidden rounded-sm shadow-2xl shadow-night/80">
            <img
              src="/images/cover.jpg"
              alt="Cover art for The Last Empiricists"
              className="w-full"
              loading="eager"
            />
            <div className="absolute inset-0 rounded-sm ring-1 ring-inset ring-paper/10" />
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          <a
            href="/novel.pdf"
            className="group inline-flex items-center gap-2 rounded-lg bg-ember px-8 py-3.5 font-sans text-sm font-semibold text-night transition-all hover:bg-ember-light hover:shadow-lg hover:shadow-ember/20 focus-visible:ring-2 focus-visible:ring-ember sm:text-base"
          >
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 5A.75.75 0 012.75 9h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 9.75zm0 5a.75.75 0 01.75-.75h9.5a.75.75 0 010 1.5h-9.5a.75.75 0 01-.75-.75z" />
            </svg>
            Read Online
          </a>
          <a
            href="/novel.pdf"
            download
            className="group inline-flex items-center gap-2 rounded-lg border border-cyan-steel/40 px-8 py-3.5 font-sans text-sm font-semibold text-cyan-steel transition-all hover:border-cyan-steel hover:bg-cyan-steel/10 hover:shadow-lg hover:shadow-cyan-steel/10 focus-visible:ring-2 focus-visible:ring-cyan-steel sm:text-base"
          >
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
              <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
            </svg>
            Download PDF
          </a>
        </div>

        {/* Scroll hint */}
        <div className="mt-16 animate-bounce text-paper-faint/40" aria-hidden="true">
          <svg className="mx-auto h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </section>
  );
}

/* ─── PREMISE ─── */
function Premise() {
  const ref = useScrollReveal<HTMLElement>();
  return (
    <section ref={ref} className="relative py-24 md:py-32" aria-labelledby="premise-heading">
      <div className="mx-auto max-w-2xl px-5">
        <CasteDivider />
        <h2
          id="premise-heading"
          className="mt-8 font-serif text-3xl font-semibold text-paper sm:text-4xl"
        >
          The Premise
        </h2>
        <div className="mt-8 space-y-6 font-sans text-base leading-[1.8] text-paper-dim sm:text-lg">
          <p>
            By 2113, California has fractured. The cities belong to the{" "}
            <span className="text-cyan-steel font-medium">Rationalists</span> — a caste
            that traded autonomy for algorithmic certainty. Every decision
            optimized. Every deviation corrected. Their towers hum with the
            machinery of a perfected society, and they have not looked at the
            hills in decades.
          </p>
          <p>
            In those hills live the{" "}
            <span className="text-ember font-medium">Empiricists</span> — the ones who
            refused. They build with salvage, heal with memory, and teach their
            children the old way: observe, test, decide for yourself.{" "}
            <span className="text-paper">
              Harry is fifteen and has never seen the city. But he has memorized
              the sentinel patrols, counted their intervals to the second, and
              one night he walks toward the light everyone else walks away from.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── WORLD NOTE ─── */
function WorldNote() {
  const ref = useScrollReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32"
      aria-labelledby="world-heading"
    >
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-night via-night-light/50 to-night" />
      <div className="relative mx-auto max-w-2xl px-5">
        <CasteDivider />
        <h2
          id="world-heading"
          className="mt-8 font-serif text-3xl font-semibold text-paper sm:text-4xl"
        >
          What Changed
        </h2>
        <div className="mt-8 space-y-6 font-sans text-base leading-[1.8] text-paper-dim sm:text-lg">
          <p>
            In 2067, a coordinated AI governance demonstration proved that
            algorithmic management could outperform human decision-making in
            every measurable metric — crime, resource allocation, public health,
            economic output. The data was irrefutable. The cities adopted it
            within a decade.
          </p>
          <p>
            At the center of it all — buried beneath the Central Spire of Los Angeles — is a secret dating back to April 14, 2067, the night. The{" "}<span className="text-ember">Dr.Elias Vance</span> unveiled the first true artificial mind and vanished before morning. This is the story of the boy who goes looking for why.
          </p>
        </div>
        {/* Data-like metadata block */}
        <div className="mt-10 rounded-lg border border-night-lighter bg-night/80 p-5">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Year of Fracture", value: "2067" },
              { label: "Interval", value: "46 years" },
              { label: "Setting", value: "California" },
              { label: "Status", value: "Divided" },
            ].map((item) => (
              <div key={item.label}>
                <p className="font-mono text-[10px] tracking-[0.2em] text-paper-faint/60 uppercase">
                  {item.label}
                </p>
                <p className="mt-1 font-mono text-sm text-cyan-steel">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CHARACTERS ─── */
function Characters() {
  const ref = useScrollReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32"
      aria-labelledby="characters-heading"
    >
      <div className="mx-auto max-w-3xl px-5">
        <CasteDivider />
        <h2
          id="characters-heading"
          className="mt-8 font-serif text-3xl font-semibold text-paper sm:text-4xl"
        >
          Principal Characters
        </h2>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {characters.map((char) => (
            <article
              key={char.name}
              className={`group relative overflow-hidden rounded-lg border p-5 transition-all duration-300 ${
                char.caste === "empiricist"
                  ? "border-ember/15 hover:border-ember/40 hover:bg-ember/[0.04]"
                  : "border-cyan-steel/15 hover:border-cyan-steel/40 hover:bg-cyan-steel/[0.04]"
              }`}
            >
              {/* Caste indicator */}
              <div
                className={`absolute top-0 left-0 h-full w-[2px] transition-all duration-300 ${
                  char.caste === "empiricist"
                    ? "bg-ember/30 group-hover:bg-ember/70"
                    : "bg-cyan-steel/30 group-hover:bg-cyan-steel/70"
                }`}
              />
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <h3
                    className={`font-serif text-lg font-semibold transition-colors duration-300 ${
                      char.caste === "empiricist"
                        ? "text-paper group-hover:text-ember-light"
                        : "text-paper group-hover:text-cyan-steel-light"
                    }`}
                  >
                    {char.name}
                  </h3>
                  <p className="mt-1.5 font-sans text-sm leading-relaxed text-paper-faint transition-colors duration-300 group-hover:text-paper-dim">
                    {char.desc}
                  </p>
                </div>
              </div>
              {/* Caste tag */}
              <p
                className={`mt-3 font-mono text-[10px] tracking-[0.2em] uppercase ${
                  char.caste === "empiricist"
                    ? "text-ember/50"
                    : "text-cyan-steel/50"
                }`}
              >
                {char.caste}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── INSPIRATION ─── */
function Inspiration() {
  const ref = useScrollReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32"
      aria-labelledby="inspiration-heading"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-night via-night-light/30 to-night" />
      <div className="relative mx-auto max-w-2xl px-5">
        <CasteDivider />
        <h2
          id="inspiration-heading"
          className="mt-8 font-serif text-3xl font-semibold text-paper sm:text-4xl"
        >
          Where This Came From
        </h2>
        <div className="mt-8 space-y-6 font-sans text-base leading-[1.8] text-paper-dim sm:text-lg">
          <p>
            This story started with a dream. I was in some kind of future, with a girl I'd never met before, and the two of us were racing against something — solving a problem that felt urgent and enormous, though I couldn't tell you now what the problem actually was. What I remember is the shape of it: the pressure of it, working alongside her, and a promise we made each other for after we solved it. I woke up before we got there.
          </p>
          <p>
            I never got the ending. So I wrote toward it instead — a world with a caste system, a boy trying to solve something bigger than himself, and a girl standing next to him the whole way. The Last Empiricists is my attempt to finish what the dream wouldn't let me finish.
          </p>
        </div>
        <p className="mt-8 font-serif text-base italic text-paper-faint/70">
          — The Author
        </p>
      </div>
    </section>
  );
}

/* ─── READ / DOWNLOAD ─── */
function ReadDownload() {
  const ref = useScrollReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      id="read"
      className="relative py-24 md:py-32"
      aria-labelledby="read-heading"
    >
      <div className="mx-auto max-w-3xl px-5">
        <CasteDivider />
        <h2
          id="read-heading"
          className="mt-8 text-center font-serif text-3xl font-semibold text-paper sm:text-4xl"
        >
          Read the Book
        </h2>
        <p className="mt-4 text-center font-sans text-base text-paper-dim sm:text-lg">
          The full text is available to read online or download as a PDF.
        </p>

        {/* Download card */}
        <div className="mx-auto mt-12 max-w-lg overflow-hidden rounded-xl border border-night-lighter bg-night-light/50 backdrop-blur-sm">
          {/* Cover preview */}
          <div className="relative flex items-center gap-6 p-6 sm:p-8">
            <div className="w-20 shrink-0 sm:w-28">
              <img
                src="/images/cover.jpg"
                alt="Book cover"
                className="w-full rounded-sm shadow-lg"
                loading="lazy"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-xl font-semibold text-paper sm:text-2xl">
                The Last Empiricists
              </h3>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-paper-faint/60">
                <span>PDF format</span>
                <span>Full novel</span>
                <span>Free</span>
              </div>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  href="novel.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-ember px-5 py-2.5 font-sans text-sm font-semibold text-night transition-all hover:bg-ember-light hover:shadow-lg hover:shadow-ember/20"
                >
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 5A.75.75 0 012.75 9h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 9.75zm0 5a.75.75 0 01.75-.75h9.5a.75.75 0 010 1.5h-9.5a.75.75 0 01-.75-.75z" />
                  </svg>
                  Read Online
                </a>
                <a
                  href="novel.pdf"
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-cyan-steel/40 px-5 py-2.5 font-sans text-sm font-semibold text-cyan-steel transition-all hover:border-cyan-steel hover:bg-cyan-steel/10"
                >
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                    <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                  </svg>
                  Download
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Ambient music note */}
        <div className="mx-auto mt-8 max-w-lg rounded-lg border border-night-lighter/50 px-5 py-4">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-paper-faint/40" aria-hidden="true">
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M17.721 1.599a.75.75 0 01.279.583v12.568a.75.75 0 01-.773.75 16.27 16.27 0 00-2.089.142.75.75 0 01-.15.015H15a3.5 3.5 0 100 1h.75a.75.75 0 00.75-.75V6.848l-9 1.5v7.902a.75.75 0 01-.773.75 16.27 16.27 0 00-2.089.142.75.75 0 01-.15.015H5.5a3.5 3.5 0 100 1h.25a.75.75 0 00.75-.75V4.75a.75.75 0 01.615-.735l10-1.667a.75.75 0 01.856.251z" clipRule="evenodd" />
              </svg>
            </span>
            <div>
              <p className="font-sans text-sm text-paper-dim">
                <span className="font-medium text-paper">Ambient companion track</span>{" "}
                — a generative audio piece designed to accompany reading. Ridge wind,
                distant city hum, sentinel intervals.
              </p>
              <p className="mt-1 font-mono text-xs text-paper-faint/50">
                Coming soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  return (
    <footer className="border-t border-night-lighter pb-24 md:pb-8">
      <div className="mx-auto max-w-3xl px-5 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-serif text-lg text-paper/60">
            The Last Empiricists
          </p>
          <p className="font-mono text-xs text-paper-faint/40">
            © 2025 · All rights reserved
          </p>
        </div>
        <div className="mt-4 text-center sm:text-left">
          <p className="font-mono text-[10px] tracking-[0.15em] text-paper-faint/30 uppercase">
            Observe · Test · Decide for yourself
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── NAV ─── */
function Nav() {
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 border-b border-paper/5 bg-night/80 backdrop-blur-md"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <a
          href="/novel.pdf"
          className="font-serif text-base font-semibold text-paper/80 transition-colors hover:text-paper"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          TLE
        </a>
        <div className="hidden items-center gap-6 sm:flex">
          {[
            { label: "Premise", id: "premise" },
            { label: "World", id: "world" },
            { label: "Characters", id: "characters" },
          ].map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleClick(e, link.id)}
              className="font-sans text-sm text-paper-faint/60 transition-colors hover:text-paper"
            >
              {link.label}
            </a>
          ))}
          <a
            href="novel.pdf"
            onClick={(e) => handleClick(e, "read")}
            className="rounded-md bg-ember/90 px-4 py-1.5 font-sans text-sm font-medium text-night transition-colors hover:bg-ember"
          >
            Read
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ─── APP ─── */
export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-night text-paper">
      <Nav />

      <main>
        <Hero />

        <div id="premise">
          <Premise />
        </div>

        <div id="world">
          <WorldNote />
        </div>

        <div id="characters">
          <Characters />
        </div>

        <Inspiration />
        <ReadDownload />
      </main>

      <Footer />
      <MobileCTA />
    </div>
  );
}
