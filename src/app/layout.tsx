import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ELENTRO | AI-Powered Electoral Intelligence",
  description: "Next-generation election simulation and strategy platform. Powered by Google Gemini and advanced 3D geospatial intelligence.",
  keywords: ["Election", "Simulation", "AI", "India", "ECI", "Democracy", "Gemini", "Elentro"],
  authors: [{ name: "Aniket Tagor" }],
  creator: "Aniket Tagor",
  publisher: "Electron Sim Engine",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Electron | The Future of Election Simulation",
    description: "Immersive 10-stage election journey & predictive simulation engine powered by Google Gemini and Vertex AI.",
    url: "https://electron-bd5i2646dq-uc.a.run.app",
    siteName: "Electron Sim Engine",
    images: [
      {
        url: "https://electron-bd5i2646dq-uc.a.run.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Electron Election Simulation Dashboard",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Electron | AI-Powered Election Simulation",
    description: "Experience the Indian electoral process with high-fidelity simulations powered by Gemini 1.5 Pro and Vertex AI.",
    images: ["https://electron-bd5i2646dq-uc.a.run.app/og-image.png"],
    creator: "@anikettagor",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import { SmoothScroll } from "@/components/smooth-scroll";
import { ContactProvider } from "@/providers/contact-provider";
import { ContactModal } from "@/components/contact-modal";
import { Providers } from "./providers";
import { Toaster } from "sonner";
import { ChatAssistant } from "@/components/chat/assistant";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          jakarta.variable,
          spaceGrotesk.variable,
          jetbrainsMono.variable,
          "antialiased bg-black text-white min-h-screen selection:bg-primary/20 selection:text-primary font-sans"
        )}
      >
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-primary focus:text-white focus:rounded-full focus:font-bold focus:shadow-2xl transition-all"
        >
          Skip to main content
        </a>
        <Providers>
          <ContactProvider>
             <SmoothScroll />
             <ContactModal />
             <Toaster position="top-center" richColors />
             <main id="main-content">
               {children}
             </main>
             <ChatAssistant />
           </ContactProvider>
        </Providers>
      </body>
    </html>
  );
}
