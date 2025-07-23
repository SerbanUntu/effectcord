import "@/styles/globals.css";

import { type Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Effectcord",
  description: "Effectcord is a modern and sleek Discord-like application built with React, Tailwind CSS, and Shadcn UI.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <TooltipProvider>
      <Sonner />
    	<html lang="en" suppressHydrationWarning>
				<body>
					{children}
				</body>
    	</html>
    </TooltipProvider>
  );
}
