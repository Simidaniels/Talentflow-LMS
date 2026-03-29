import type { Metadata } from "next";
import "./globals.css";
import "aos/dist/aos.css";
import AosProvider from "./components/AosProvider";

export const metadata: Metadata = {
  title: "TalentFlow LMS",
  description: "Learner dashboard for TalentFlow LMS"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AosProvider />
        {children}
      </body>
    </html>
  );
}
