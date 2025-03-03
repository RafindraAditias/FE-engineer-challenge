"use client";

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

const montserrat = Montserrat({
  variable: "--font-Montserrat-sans",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Front End Engineer Challenge",
//   description: "Challenge Test Stage - Synapsis Recruitment",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  // Pastikan QueryClient dibuat dalam state agar persist di seluruh re-render
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
