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
    <p className="font-heading text-[10px] font-medium uppercase tracking-[0.24em] text-brand-blue sm:text-[11px] sm:tracking-[0.3em]">
      {children}
    </p>
  );
}

function WhoWeArePanel() {
  return (
    <div id="who-we-are-panel" role="tabpanel" aria-labelledby="who-we-are-tab" className="grid gap-4 md:grid-cols-[160px_1fr] md:gap-10">
      <div>
        <SectionLabel>{site.about.eyebrow}</SectionLabel>
      </div>
      <div>
        <h2 className="max-w-[680px] font-heading text-[21px] font-medium leading-[1.24] text-brand-ink sm:text-[28px]">
          {site.about.title}
        </h2>
        <div className="mt-4 grid gap-5 lg:grid-cols-[1fr_260px]">
          <div className="space-y-3 text-[13px] leading-6 text-brand-muted sm:text-[14px]">
            {site.about.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="border-y border-brand-rule py-3.5 sm:py-4">
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 lg:grid-cols-1">
              {site.about.facts.map((fact) => (
                <div key={fact.label}>
                  <p className="font-heading text-[9px] font-medium uppercase tracking-[0.2em] text-brand-blue sm:text-[10px] sm:tracking-[0.26em]">
                    {fact.label}
                  </p>
                  <p className="mt-1 text-[12px] leading-5 text-brand-ink sm:text-[13px]">{fact.value}</p>
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
      <div className="max-w-[660px]">
        <SectionLabel>{site.whatWeDo.eyebrow}</SectionLabel>
        <h2 className="mt-3 font-heading text-[21px] font-medium leading-[1.24] text-brand-ink sm:text-[28px]">
          {site.whatWeDo.title}
        </h2>
      </div>
      <div className="mt-5 grid gap-x-8 gap-y-4 md:grid-cols-2">
        {site.whatWeDo.items.map((item) => (
          <article key={item.title} className="flex min-h-0 flex-col border-t border-brand-rule pt-3.5 md:min-h-[145px] md:pt-4">
            <h3 className="font-heading text-[15px] font-medium leading-snug text-brand-ink sm:text-[16px]">{item.title}</h3>
            <p className="mt-2 text-[12px] leading-5 text-brand-muted sm:text-[13px]">{item.text}</p>
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
        <h2 className="mt-3 font-heading text-[21px] font-medium leading-[1.24] text-brand-ink sm:text-[28px]">
          {site.contact.title}
        </h2>
        <p className="mt-2.5 text-[13px] leading-6 text-brand-muted">{site.contact.text}</p>
      </div>
      <ContactForm />
    </div>
  );
}
