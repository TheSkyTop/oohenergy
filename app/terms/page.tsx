import Link from "next/link";
import { site } from "@/lib/content";

export const metadata = {
  title: "Terms & Disclaimer | Ooh Energy",
  description: "Terms and disclaimer for Ooh Energy."
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-brand-bg px-5 py-8 text-brand-ink sm:py-10">
      <article className="mx-auto max-w-[720px]">
        <Link href="/" className="text-[13px] text-brand-blue underline-offset-4 hover:underline">
          Back to home
        </Link>
        <h1 className="mt-8 font-heading text-[26px] font-medium leading-[1.18] text-brand-ink">Terms & Disclaimer</h1>
        <div className="mt-6 space-y-5 text-[14px] leading-6 text-brand-muted">
          <p>
            This website provides general information about {site.businessName} and its areas of professional focus.
            Use of the website does not create a client relationship.
          </p>
          <section>
            <h2 className="font-heading text-[16px] font-medium text-brand-ink">General information only</h2>
            <p className="mt-2">
              Content on this website is general information only. It is not financial advice, investment advice,
              legal advice or a recommendation to take or avoid any market, commercial or technical action.
            </p>
          </section>
          <section>
            <h2 className="font-heading text-[16px] font-medium text-brand-ink">No employer representation</h2>
            <p className="mt-2">
              Views expressed through this website or associated materials do not represent the views of any current
              or former employer, university, client or affiliated organisation.
            </p>
          </section>
          <section>
            <h2 className="font-heading text-[16px] font-medium text-brand-ink">No accreditation claims</h2>
            <p className="mt-2">
              This website does not claim government accreditation, regulatory endorsement or third-party certification.
              No client names or third-party logos are presented as endorsements.
            </p>
          </section>
          <section>
            <h2 className="font-heading text-[16px] font-medium text-brand-ink">Business details</h2>
            <p className="mt-2">
              {site.businessName}, ABN {site.abn}, {site.location}, {site.workingArea}.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
