import type { Metadata } from "next";
import { AppFrame } from "@/components/ui/AppFrame";
import { BetaGate } from "@/components/ui/BetaGate";
import "./globals.css";

export const metadata: Metadata = {
  title: "ConstellaX",
  description: "The intelligent operating system for the creator economy"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <BetaGate>
          <AppFrame>{children}</AppFrame>
        </BetaGate>
      </body>
    </html>
  );
}
