"use client";

import { useLayoutEffect, useState } from "react";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/content";

type TabId = (typeof site.tabs)[number]["id"];

export default function BrandTabs() {
  const [activeTab, setActiveTab] = useState<TabId | null>(null);

  useLayoutEffect(() => {
    function syncFromHash(isInitialLoad = false) {
      const hash = window.location.hash.replace("#", "");
      const matchingTab = site.tabs.find((tab) => tab.id === hash);

      if (matchingTab) {
        setActiveTab(matchingTab.id as TabId);
        window.scrollTo({ top: 0, behavior: "instant" });
        return;
      }

      setActiveTab(null);
    }

    syncFromHash(true);

    const handleHashChange = () => syncFromHash();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (!activeTab) {
    return null;
  }

  return (
    <section id="brand-tabs" className="site-stage flex-1 px-5 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1120px]">
        <div>
          {activeTab === "who-we-are" && <WhoWeArePanel />}
          {activeTab === "what-we-do" && <WhatWeDoPanel />}
          {activeTab === "make-enquiry" && <EnquiryPanel />}
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-heading text-[10px] font-medium uppercase leading-none tracking-[0.24em] text-brand-blue sm:text-[11px] sm:tracking-[0.3em]">
      {children}
    </p>
  );
}

function WhoWeArePanel() {
  return (
    <div id="who-we-are-panel" role="tabpanel" aria-labelledby="who-we-are-tab" className="grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_240px] lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10">
      <div className="min-w-0">
        <SectionLabel>{site.about.eyebrow}</SectionLabel>
        <h2 className="mt-3 font-heading text-[22px] font-medium leading-[1.3] text-brand-ink sm:text-[24px] lg:whitespace-nowrap lg:text-[18px] xl:text-[20px]">
          {site.about.title}
        </h2>
        <div className="mt-4 space-y-3 text-[13px] leading-6 text-brand-muted sm:text-[14px]">
          {site.about.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
      <AboutSignal />
    </div>
  );
}

function AboutSignal() {
  return (
    <figure className="about-signal mx-auto w-full max-w-[360px] self-center md:mx-0" aria-label="Illustration connecting Australian energy markets, intelligence and technology">
      <div className="relative h-[260px] md:h-[300px]" aria-hidden="true">
        <div className="energy-field absolute inset-0" style={{ animationDirection: "reverse" }} />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 540 510" fill="none">
          <image href="/brand/australia-map-silhouette.png" x="52" y="86" width="436" height="306" opacity="0.88" preserveAspectRatio="xMidYMid meet" />
          <g transform="translate(540 0) scale(-1 1)">
            <path className="flow-line flow-line-a" style={{ animationDirection: "reverse" }} d="M38 336C118 263 166 260 243 296C320 332 394 302 502 166" />
            <path className="flow-line flow-line-b" style={{ animationDirection: "reverse" }} d="M50 206C130 157 189 172 259 212C335 259 408 238 491 117" />
            <path className="flow-line flow-line-c" style={{ animationDirection: "reverse" }} d="M76 398C163 356 218 370 300 404C369 435 432 398 488 332" />
            <circle className="signal-ring signal-ring-a" cx="155" cy="164" r="70" />
            <circle className="signal-ring signal-ring-b" cx="400" cy="321" r="106" />
            <circle className="signal-dot signal-dot-a" cx="155" cy="164" r="5.5" />
            <circle className="signal-dot signal-dot-b" cx="400" cy="321" r="5.5" />
            <circle className="signal-dot signal-dot-c" cx="259" cy="212" r="5" />
          </g>
        </svg>
      </div>
      <figcaption className="border-y border-brand-rule py-3 text-center">
        <div className="flex justify-between gap-2 font-heading text-[9px] font-medium uppercase tracking-[0.16em] text-brand-blue">
          <span>Markets</span><span>Intelligence</span><span>Technology</span>
        </div>
        <p className="mt-2 text-[11px] leading-5 text-brand-muted">Melbourne &middot; Working nationally</p>
      </figcaption>
    </figure>
  );
}

function WhatWeDoPanel() {
  return (
    <div id="what-we-do-panel" role="tabpanel" aria-labelledby="what-we-do-tab">
      <div>
        <SectionLabel>{site.whatWeDo.eyebrow}</SectionLabel>
        <h2 className="mt-3 font-heading text-[22px] font-medium leading-[1.3] text-brand-ink sm:text-[24px] lg:whitespace-nowrap lg:text-[18px] xl:text-[20px]">
          {site.whatWeDo.title}
        </h2>
      </div>
      <div className="mt-5 grid gap-x-8 gap-y-4 md:grid-cols-2">
        {site.whatWeDo.items.map((item) => (
          <article key={item.title} className="flex min-h-0 flex-col border-t border-brand-rule pt-3.5 md:min-h-[145px] md:pt-4">
            <h3 className="font-heading text-[15px] font-medium leading-snug text-brand-ink sm:text-[16px]">{item.title}</h3>
            {item.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-2 text-[12px] leading-5 text-brand-muted sm:text-[13px]">{paragraph}</p>
            ))}
            <StatusLine item={item} />
          </article>
        ))}
      </div>
    </div>
  );
}

function StatusLine({ item }: { item: { status: string; href: string | null } }) {
  const className = "mt-auto pt-2.5 font-heading text-[9px] font-medium uppercase tracking-[0.2em] text-brand-blue sm:text-[10px] sm:tracking-[0.22em]";

  if (item.href) {
    return (
      <a href={item.href} className={`${className} underline-offset-4 hover:underline`}>
        {item.status}
      </a>
    );
  }

  return <p className={className}>{item.status}</p>;
}

function EnquiryPanel() {
  return (
    <div id="make-enquiry-panel" role="tabpanel" aria-labelledby="make-enquiry-tab" className="grid gap-5 md:grid-cols-[280px_1fr] md:gap-10">
      <div>
        <SectionLabel>{site.contact.eyebrow}</SectionLabel>
        <h2 className="mt-3 font-heading text-[20px] font-medium leading-[1.3] text-brand-ink sm:text-[22px]">
          {site.contact.title}
        </h2>
        <p className="mt-2.5 text-[13px] leading-6 text-brand-muted">{site.contact.text}</p>
      </div>
      <ContactForm />
    </div>
  );
}
