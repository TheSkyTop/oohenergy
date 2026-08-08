import Link from "next/link";
import { site } from "@/lib/content";

export const metadata = {
  title: "Privacy Policy | Ooh Energy",
  description: "Privacy Policy for Ooh Energy enquiries."
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-brand-bg px-5 py-16 text-brand-ink">
      <article className="mx-auto max-w-[760px]">
        <Link href="/" className="text-[14px] text-brand-blue underline-offset-4 hover:underline">
          Back to home
        </Link>
        <h1 className="mt-12 font-heading text-[32px] font-medium leading-[1.18] text-brand-ink">Privacy Policy</h1>
        <div className="mt-10 space-y-8 text-[16px] leading-8 text-brand-muted">
          <p>
            This policy explains how {site.businessName} handles personal information submitted through this website.
            It is intended to align with the Privacy Act 1988 and the Australian Privacy Principles.
          </p>
          <section>
            <h2 className="font-heading text-[19px] font-medium text-brand-ink">Information collected</h2>
            <p className="mt-3">
              The enquiry form may collect your name, email address, organisation, enquiry type, message and consent
              confirmation. Technical hosting providers may also process basic server logs.
            </p>
          </section>
          <section>
            <h2 className="font-heading text-[19px] font-medium text-brand-ink">Purpose</h2>
            <p className="mt-3">
              Information is used only to assess and respond to your enquiry, maintain basic business records and meet
              legal obligations. It is not sold or used for unrelated marketing lists.
            </p>
          </section>
          <section>
            <h2 className="font-heading text-[19px] font-medium text-brand-ink">Storage and deletion</h2>
            <p className="mt-3">
              Enquiry information may be stored in email, form service and business record systems. You may request
              access, correction or deletion of your enquiry information, subject to any legal record-keeping obligations.
            </p>
          </section>
          <section>
            <h2 className="font-heading text-[19px] font-medium text-brand-ink">Contact</h2>
            <p className="mt-3">
              To make a privacy request, use the enquiry form on the home page and select Other.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
