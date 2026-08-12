import Image from "next/image";
import BrandTabs from "@/components/BrandTabs";
import { site } from "@/lib/content";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-brand-bg">
      <JsonLd />
      <Header />
      <HomeView />
      <BrandTabs />
      <Footer />
    </main>
  );
}

function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.businessName,
    url: `https://${site.domain}`,
    areaServed: "Australia",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Melbourne",
      addressRegion: "Victoria",
      addressCountry: "AU"
    },
    knowsAbout: [
      "Energy training",
      "Market advisory",
      "Data centre and large load energy",
      "Practical solutions",
      "Applied research",
      "Australia Energy Market training",
      "Australia Energy Market advisory"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-brand-rule/90 bg-brand-bg/92 backdrop-blur-sm">
      <div className="mx-auto flex min-h-[76px] max-w-[1120px] flex-col items-start justify-center gap-2 px-5 py-2 sm:h-14 sm:min-h-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 sm:py-0 lg:px-8">
        <a href="/" className="flex items-center" aria-label="Ooh Energy home">
          <Image
            src={site.logo}
            alt="Ooh Energy"
            width={1088}
            height={426}
            priority
            className="h-8 w-auto object-contain sm:h-9"
          />
        </a>
        <nav className="grid w-full grid-cols-3 items-center gap-2 text-[11px] text-brand-muted sm:flex sm:w-auto sm:justify-start sm:gap-8 sm:text-[13px]">
          {site.nav.map((item) => (
            <a key={item.href} href={item.href} className="whitespace-nowrap transition-colors duration-200 hover:text-brand-blue">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-108px)] items-center overflow-hidden px-5 pb-5 pt-24 sm:min-h-[calc(100vh-104px)] sm:px-6 sm:pt-20 lg:px-8">
      <MobileEnergyField />
      <div className="mx-auto grid w-full max-w-[1120px] items-center gap-10 lg:grid-cols-[1fr_420px]">
        <div className="max-w-[660px]">
          <p className="font-heading text-[11px] font-medium uppercase tracking-[0.28em] text-brand-blue sm:text-[13px] sm:tracking-[0.32em]">
            {site.hero.eyebrow}
          </p>
          <h1 className="mt-4 max-w-[640px] font-heading text-[26px] font-medium leading-[1.18] tracking-normal text-brand-ink sm:text-[34px]">
            {site.hero.title}
          </h1>
          <p className="mt-4 max-w-[600px] text-[14px] leading-6 text-brand-muted sm:text-[15px]">
            {site.hero.text}
          </p>
          <a
            href="#make-enquiry"
            className="mt-6 inline-flex items-center rounded-[2px] bg-brand-blue px-7 py-2.5 text-[13px] font-medium text-white transition-colors duration-200 hover:bg-brand-ink"
          >
            {site.hero.cta}
          </a>
          <div className="mt-6 grid grid-cols-1 gap-2 border-t border-brand-rule pt-3 sm:flex sm:flex-wrap sm:gap-x-5">
            {site.hero.summaryItems.map((item) => (
              <span key={item} className="font-heading text-[11px] font-medium uppercase tracking-[0.2em] text-brand-muted">
                {item}
              </span>
            ))}
          </div>
        </div>
        <HeroSignal />
      </div>
    </section>
  );
}

function HomeView() {
  return (
    <div className="home-view">
      <Hero />
    </div>
  );
}

function MobileEnergyField() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 top-20 -z-10 overflow-hidden lg:hidden" aria-hidden="true">
      <div className="mobile-energy-field absolute inset-0" />
      <svg className="absolute -right-16 bottom-10 h-56 w-72 opacity-70" viewBox="0 0 320 240" fill="none">
        <path className="flow-line flow-line-a" d="M22 156C74 112 111 111 160 134C209 156 246 139 305 78" />
        <path className="flow-line flow-line-b" d="M36 93C85 66 119 77 158 98C205 124 247 113 296 49" />
        <circle className="signal-ring signal-ring-a" cx="96" cy="74" r="38" />
        <circle className="signal-ring signal-ring-b" cx="230" cy="152" r="58" />
        <circle className="signal-dot signal-dot-a" cx="96" cy="74" r="4" />
        <circle className="signal-dot signal-dot-b" cx="230" cy="152" r="4" />
      </svg>
    </div>
  );
}

function HeroSignal() {
  return (
    <div className="relative hidden h-[330px] translate-x-4 lg:block" aria-hidden="true">
      <div className="energy-field absolute inset-0" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 540 510" fill="none">
        <image
          href="/brand/australia-map-silhouette.png"
          x="74"
          y="108"
          width="392"
          height="275"
          opacity="0.72"
          preserveAspectRatio="xMidYMid meet"
        />
        <path className="flow-line flow-line-a" d="M38 336C118 263 166 260 243 296C320 332 394 302 502 166" />
        <path className="flow-line flow-line-b" d="M50 206C130 157 189 172 259 212C335 259 408 238 491 117" />
        <path className="flow-line flow-line-c" d="M76 398C163 356 218 370 300 404C369 435 432 398 488 332" />
        <circle className="signal-ring signal-ring-a" cx="155" cy="164" r="70" />
        <circle className="signal-ring signal-ring-b" cx="400" cy="321" r="106" />
        <circle className="signal-dot signal-dot-a" cx="155" cy="164" r="5.5" />
        <circle className="signal-dot signal-dot-b" cx="400" cy="321" r="5.5" />
        <circle className="signal-dot signal-dot-c" cx="259" cy="212" r="5" />
      </svg>
      <div className="absolute bottom-3 left-8 right-8 grid grid-cols-4 border-y border-brand-rule/90 py-3">
        {["Dispatch", "Market", "Portfolio", "Risk"].map((label) => (
          <span key={label} className="text-center font-heading text-[10px] uppercase tracking-[0.22em] text-brand-blue">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-brand-rule px-5 py-3.5 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-2 text-[11px] leading-5 text-brand-muted sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-brand-ink">{site.businessName}</p>
          <p>
            ABN {site.abn} / {site.location} / {site.workingArea}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 sm:gap-x-6 sm:gap-y-2">
          {site.footer.links.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-brand-blue">
              {link.label}
            </a>
          ))}
          <span>Copyright {new Date().getFullYear()} {site.footer.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
