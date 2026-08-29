import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BaytLogic Technologies | Where Intelligence Meets Security",
  description: "Nigeria's leading integrator of intelligent surveillance, cybersecurity, smart home automation, and networking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
