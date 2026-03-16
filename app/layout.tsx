import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rooted - Pop Culture Through a Biblical Lens",
  description: "Explore trending pop culture topics through a Christian perspective. Discover biblical values and lessons in today's celebrity news and social trends.",
  keywords: "Christian, pop culture, biblical perspective, teen faith, Christian values, faith and culture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
