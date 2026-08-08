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
      <div className="mx-auto flex min-h-[86px] max-w-[1120px] flex-col items-start justify-center gap-3 px-6 py-3 sm:h-[72px] sm:min-h-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-0 lg:px-8">
        <a href="/" className="flex items-center" aria-label="Ooh Energy home">
          <Image
            src={site.logo}
            alt="Ooh Energy"
            width={1088}
            height={426}
            priority
            className="h-11 w-auto object-contain sm:h-12"
          />
        </a>
        <nav className="flex w-full items-center justify-between gap-4 text-[13px] text-brand-muted sm:w-auto sm:justify-start sm:gap-9 sm:text-[14px]">
          {site.nav.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors duration-200 hover:text-brand-blue">
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
    <section className="relative isolate flex min-h-[calc(100vh-180px)] items-center overflow-hidden px-6 pb-12 pt-36 sm:min-h-[calc(100vh-172px)] sm:pt-28 lg:px-8">
      <div className="mx-auto grid w-full max-w-[1220px] items-center gap-14 lg:grid-cols-[1fr_540px]">
        <div className="max-w-[720px]">
          <p className="font-heading text-[12px] font-medium uppercase tracking-[0.32em] text-brand-blue sm:text-[13px]">
            {site.hero.eyebrow}
          </p>
          <h1 className="mt-7 max-w-[740px] font-heading text-[34px] font-medium leading-[1.16] tracking-normal text-brand-ink sm:text-[44px]">
            {site.hero.title}
          </h1>
          <p className="mt-7 max-w-[680px] text-[16px] leading-8 text-brand-muted sm:text-[17px]">
            {site.hero.text}
          </p>
          <a
            href="#make-enquiry"
            className="mt-9 inline-flex items-center rounded-[2px] bg-brand-blue px-10 py-4 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-brand-ink"
          >
            {site.hero.cta}
          </a>
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-brand-rule pt-5">
            {site.hero.summaryItems.map((item) => (
              <span key={item} className="font-heading text-[12px] font-medium uppercase tracking-[0.22em] text-brand-muted">
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

function HeroSignal() {
  return (
    <div className="relative hidden h-[510px] translate-x-8 lg:block" aria-hidden="true">
      <div className="energy-field absolute inset-0" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 540 510" fill="none">
        <path className="flow-line flow-line-a" d="M38 336C118 263 166 260 243 296C320 332 394 302 502 166" />
        <path className="flow-line flow-line-b" d="M50 206C130 157 189 172 259 212C335 259 408 238 491 117" />
        <path className="flow-line flow-line-c" d="M76 398C163 356 218 370 300 404C369 435 432 398 488 332" />
        <circle className="signal-ring signal-ring-a" cx="155" cy="164" r="70" />
        <circle className="signal-ring signal-ring-b" cx="400" cy="321" r="106" />
        <circle className="signal-dot signal-dot-a" cx="155" cy="164" r="5.5" />
        <circle className="signal-dot signal-dot-b" cx="400" cy="321" r="5.5" />
        <circle className="signal-dot signal-dot-c" cx="259" cy="212" r="5" />
      </svg>
      <div className="absolute bottom-6 left-10 right-10 grid grid-cols-4 border-y border-brand-rule/90 py-5">
        {["Dispatch", "Market", "Portfolio", "Risk"].map((label) => (
          <span key={label} className="text-center font-heading text-[12px] uppercase tracking-[0.24em] text-brand-blue">
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-brand-rule px-6 py-7 lg:px-8">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-4 text-[13px] leading-6 text-brand-muted sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-brand-ink">{site.businessName}</p>
          <p>
            ABN {site.abn} / {site.location} / {site.workingArea}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
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
