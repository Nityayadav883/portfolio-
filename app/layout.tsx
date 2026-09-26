import type { Metadata, Viewport } from "next";
import { Albert_Sans, Fragment_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const albertSans = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-albert-sans",
  display: "swap",
});

const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fragment-mono",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nityanand yadav — Building Beyond Possible",
  description:
    "I build interfaces where engineering precision meets human detail.",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
  lang="en"
  className={`${albertSans.variable} ${fragmentMono.variable} ${spaceGrotesk.variable}`}
>
      <body>{children}</body>
    </html>
  );
}
