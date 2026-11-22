import Link from "next/link";
import reports from "@/lib/reports.json";

type Report = { id: string; title: string; url: string; lastSuccess: string | null; error?: string | null };

export const metadata = { title: "Official Reports | Ooh Energy" };

export default function ReportsPage() {
  return (
    <main className="min-h-screen bg-brand-bg px-5 py-10 text-brand-muted">
      <div className="mx-auto max-w-[960px]">
        <Link href="/" className="text-sm text-brand-blue hover:underline">Back to home</Link>
        <h1 className="mt-8 text-[28px] font-medium text-brand-ink">Official Energy Reports</h1>
        <p className="mt-3 text-sm leading-6">Reports from AEMO Summer Operations. Links open the original publisher's documents.</p>
        <div className="mt-5 border-y border-brand-rule py-4 text-sm leading-6">
          <a href={reports.source.url} className="text-brand-blue hover:underline">{reports.source.name}</a>
          <p>Last check: {reports.source.lastAttempt ? new Date(reports.source.lastAttempt).toLocaleString("en-AU", { timeZone: "Australia/Sydney" }) : "Not yet checked"} (Sydney)</p>
          {reports.source.error && <p>Source check unavailable. Previously verified links are retained.</p>}
        </div>
        <div className="mt-6 divide-y divide-brand-rule">
          {reports.items.length === 0 && <p>No report links have been verified yet.</p>}
          {(reports.items as Report[]).map((item) => (
            <article key={item.id} className="py-5">
              <a href={item.url} className="text-base font-medium text-brand-blue hover:underline">{item.title}</a>
              <p className="mt-2 text-sm">{item.lastSuccess ? `PDF link verified ${new Date(item.lastSuccess).toLocaleDateString("en-AU", { timeZone: "Australia/Sydney" })}` : "Awaiting PDF verification"}{item.error && item.lastSuccess ? " · Latest check unavailable" : ""}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
