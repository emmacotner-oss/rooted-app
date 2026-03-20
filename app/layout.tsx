import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "./context/AppContext";

export const metadata: Metadata = {
  title: "Rooted - Pop Culture Through a Biblical Lens",
  description: "Explore trending pop culture topics through a Christian perspective. Discover biblical values and lessons in today's celebrity news and social trends.",
  keywords: "Christian, pop culture, biblical perspective, teen faith, Christian values, faith and culture, teen discipleship, biblical insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
