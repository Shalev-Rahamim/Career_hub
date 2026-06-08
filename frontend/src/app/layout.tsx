import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  weight: ["300", "400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Career Hub | פלטפורמת הכנה לקריירה מבוססת AI",
  description: "הפלטפורמה המובילה להכנה לראיונות עבודה, סימולציות מותאמות אישית ושדרוג קורות חיים באמצעות בינה מלאכותית.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${heebo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}

