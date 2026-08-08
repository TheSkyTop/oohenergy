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
    <section id="brand-tabs" className="flex min-h-[calc(100vh-120px)] items-center px-6 py-16 sm:py-20 lg:px-8">
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
    <p className="font-heading text-[12px] font-medium uppercase tracking-[0.32em] text-brand-blue sm:text-[13px]">
      {children}
    </p>
  );
}

function WhoWeArePanel() {
  return (
    <div id="who-we-are-panel" role="tabpanel" aria-labelledby="who-we-are-tab" className="grid gap-10 md:grid-cols-[240px_1fr] md:gap-16">
      <div>
        <SectionLabel>{site.about.eyebrow}</SectionLabel>
      </div>
      <div>
        <h2 className="font-heading text-[28px] font-medium leading-[1.22] text-brand-ink sm:text-[34px]">
          {site.about.title}
        </h2>
        <div className="mt-7 grid gap-9 lg:grid-cols-[1fr_300px]">
          <div className="space-y-5 text-[15px] leading-7 text-brand-muted sm:text-[16px]">
            {site.about.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="border-y border-brand-rule py-6">
            <div className="grid gap-6">
              {site.about.facts.map((fact) => (
                <div key={fact.label}>
                  <p className="font-heading text-[11px] font-medium uppercase tracking-[0.28em] text-brand-blue">
                    {fact.label}
                  </p>
                  <p className="mt-2 text-[15px] leading-7 text-brand-ink">{fact.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhatWeDoPanel() {
  return (
    <div id="what-we-do-panel" role="tabpanel" aria-labelledby="what-we-do-tab">
      <div className="max-w-[720px]">
        <SectionLabel>{site.whatWeDo.eyebrow}</SectionLabel>
        <h2 className="mt-5 font-heading text-[28px] font-medium leading-[1.22] text-brand-ink sm:text-[34px]">
          {site.whatWeDo.title}
        </h2>
      </div>
      <div className="mt-9 grid gap-x-10 gap-y-8 md:grid-cols-2">
        {site.whatWeDo.items.map((item) => (
          <article key={item.title} className="flex min-h-[205px] flex-col border-t border-brand-rule pt-5">
            <h3 className="font-heading text-[19px] font-medium leading-snug text-brand-ink">{item.title}</h3>
            <p className="mt-4 text-[15px] leading-7 text-brand-muted">{item.text}</p>
            <StatusLine item={item} />
          </article>
        ))}
      </div>
    </div>
  );
}

function StatusLine({ item }: { item: { status: string; href: string | null } }) {
  const className = "mt-auto pt-6 font-heading text-[11px] font-medium uppercase tracking-[0.26em] text-brand-blue";

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
    <div id="make-enquiry-panel" role="tabpanel" aria-labelledby="make-enquiry-tab" className="grid gap-12 md:grid-cols-[360px_1fr] md:gap-16">
      <div>
        <SectionLabel>{site.contact.eyebrow}</SectionLabel>
        <h2 className="mt-5 font-heading text-[28px] font-medium leading-[1.22] text-brand-ink sm:text-[34px]">
          {site.contact.title}
        </h2>
        <p className="mt-5 text-[16px] leading-7 text-brand-muted">{site.contact.text}</p>
      </div>
      <ContactForm />
    </div>
  );
}
