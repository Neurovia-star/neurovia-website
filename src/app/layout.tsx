import type { Metadata } from "next";
import { Sora, Space_Grotesk } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "NEUROVIA — Learn the Skills of the Future",
  description:
    "NEUROVIA is a future-focused learning platform for cybersecurity, cloud engineering, AI automation, and digital skills. Practical, career-ready training built for the next generation.",
  keywords: [
    "cybersecurity training",
    "ethical hacking",
    "cloud engineering",
    "AI automation",
    "online courses",
    "NEUROVIA",
  ],
  openGraph: {
    title: "NEUROVIA — Learn the Skills of the Future",
    description:
      "Practical, career-ready training in cybersecurity, cloud, AI, and automation.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-night-950 text-foreground">
        {/* Runs before first paint: hides the boot loader for returning
            visitors so the server-rendered frame never flashes.
            Key must match SEEN_KEY in components/LoadingScreen.tsx.
            The style is inlined (not in globals.css) so it applies at parse
            time, independent of stylesheet load timing. */}
        <style>{`html[data-boot-seen] [data-boot-loader]{display:none}`}</style>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("neurovia-loader-seen")==="1")document.documentElement.setAttribute("data-boot-seen","")}catch(e){}`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
