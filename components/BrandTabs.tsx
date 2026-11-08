"use client";

import { useEffect, useState } from "react";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/content";

type TabId = (typeof site.tabs)[number]["id"];

export default function BrandTabs() {
  const [activeTab, setActiveTab] = useState<TabId | null>(null);

  useEffect(() => {
    function syncFromHash(isInitialLoad = false) {
      if (isInitialLoad && window.location.hash) {
        window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
        setActiveTab(null);
        return;
      }

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
    <section id="brand-tabs" className="flex min-h-[calc(100svh-106px)] items-center px-5 py-5 sm:min-h-[calc(100vh-112px)] sm:px-6 sm:py-8 lg:px-8">
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
    <div id="who-we-are-panel" role="tabpanel" aria-labelledby="who-we-are-tab" className="grid items-start gap-4 md:grid-cols-[150px_minmax(0,1fr)_260px] md:gap-9 lg:grid-cols-[160px_minmax(0,1fr)_292px] lg:gap-10">
      <div>
        <SectionLabel>{site.about.eyebrow}</SectionLabel>
      </div>
      <div className="min-w-0">
        <h2 className="max-w-[620px] font-heading text-[20px] font-medium leading-[1.3] text-brand-ink sm:text-[22px]">
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
      <div className="relative h-[240px] md:h-[320px]" aria-hidden="true">
        <div className="energy-field absolute inset-0 opacity-50" />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 360 360" fill="none">
          <image href="/brand/australia-map-silhouette.png" x="24" y="82" width="312" height="220" opacity="0.84" preserveAspectRatio="xMidYMid meet" />
          <path d="M22 254C77 207 104 195 150 215S241 230 338 121" stroke="#1668e3" strokeWidth="1" opacity="0.15" />
          <path className="flow-line flow-line-a" d="M22 254C77 207 104 195 150 215S241 230 338 121" />
          <path className="flow-line flow-line-b" d="M38 151C101 124 131 159 181 177S264 175 319 233" />
          <path className="flow-line flow-line-c" d="M56 294C115 267 155 274 200 291S279 288 328 262" />
          <circle className="signal-ring signal-ring-a" cx="100" cy="178" r="35" />
          <circle className="signal-ring signal-ring-b" cx="258" cy="242" r="48" />
          <circle className="signal-dot signal-dot-a" cx="100" cy="178" r="3.5" />
          <circle className="signal-dot signal-dot-b" cx="258" cy="242" r="3.5" />
          <circle className="signal-dot signal-dot-c" cx="181" cy="177" r="3" />
        </svg>
      </div>
      <figcaption className="border-y border-brand-rule py-3 text-center">
        <div className="flex justify-between gap-2 font-heading text-[9px] font-medium uppercase tracking-[0.16em] text-brand-blue">
          <span>Markets</span><span>Intelligence</span><span>Technology</span>
        </div>
        <p className="mt-2 text-[11px] leading-5 text-brand-muted">Melbourne · Working nationally</p>
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
