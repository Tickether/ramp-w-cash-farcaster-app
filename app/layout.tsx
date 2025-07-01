import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { FrameProvider } from "@/context/FrameProvider";
import { WagmiContext } from "@/context/wagmiContext";
import { MiniAppContext } from "@/context/miniAppContext";
import { Toaster } from "@/components/ui/sonner";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ramp w/ Cash 💸",
  description: "Onramp cUSD, USDT & USDC using African Local Currencies onto Farcaster wallet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const frame = {
    version: "next",
    imageUrl: "https://ramp-w-cash.vercel.app/opengraph-image.png",
    button: {
      title: "Ramp w/ Cash 💸",
      action: {
        type: "launch_frame",
        url: "https://ramp-w-cash.vercel.app",
        name:"Ramp w/ Cash 💸",
        splashImageUrl: "https://ramp-w-cash.vercel.app/logo.png",
        splashBackgroundColor:"#f5f0ec"
      }
    }
  }
  return (
    <html lang="en">
      <head>
        <meta 
        property="og:image" 
          content="https://ramp-w-cash.vercel.app/opengraph-image.png" 
        />
        <meta 
          name="fc:frame"
          content={JSON.stringify(frame)} 
        />
      </head>
      <body
        className={`${geistMono.className}`}
      >
        <WagmiContext>
          <MiniAppContext>
            <FrameProvider>
              {children}
              <Toaster expand={true} richColors />
            </FrameProvider>
          </MiniAppContext>
        </WagmiContext>
      </body>
    </html>
  );
}
