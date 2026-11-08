import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.oohenergy.com"),
  title: "OohEnergy | Australia Energy Services Company",
  description:
    "Independent energy information services, training, advisory, practical solutions and applied research for the Australia Energy Market.",
  openGraph: {
    title: "OohEnergy",
    description:
      "Independent energy information services, training, advisory, practical solutions and applied research for the Australia Energy Market.",
    url: "https://www.oohenergy.com",
    siteName: "OohEnergy",
    type: "website",
    images: [
      {
        url: "/brand/oohenergy-logo.png",
        width: 1254,
        height: 1254,
        alt: "OohEnergy logo"
      }
    ]
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
