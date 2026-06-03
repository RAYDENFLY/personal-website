import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Ray — A Personal Space",
  description:
    "Website pribadi Azis Maulana Suhada (Ray). Mahasiswa Teknik Komputer, freelancer, pecinta teknologi, musik, otomotif, dan eksplorasi hal-hal baru.",
  keywords: ["RAYDENFLY", "Digital Identity", "Portfolio", "Kreator Digital", "Desain Grafis", "Teknologi", "Web Developer Indonesia", "Azis Maulana Suhada", "Azis Maulana", "Azis"],
  authors: [{ name: "Ray Extended" }],
  openGraph: {
    title: "Ray — A Personal Space",
    description: "Website pribadi Azis Maulana Suhada (Ray). Mahasiswa Teknik Komputer, freelancer, pecinta teknologi, musik, otomotif, dan eksplorasi hal-hal baru.",
    url: "https://raydenfly.my.id", // Sesuaikan dengan domain aslimu nanti
    siteName: "RAYDENFLY",
    images: [
      {
        url: "/assets/images/photoray.png",
        width: 1200,
        height: 630,
        alt: "RAYDENFLY Digital Identity",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ray — A Personal Space",
    description: "Website pribadi Azis Maulana Suhada (Ray). Mahasiswa Teknik Komputer, freelancer, pecinta teknologi, musik, otomotif, dan eksplorasi hal-hal baru.",
    images: ["/assets/images/photoray.png"],
    creator: "@rayryyty", // Sesuaikan dengan username twittermu
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.variable}>
        {children}
      </body>
    </html>
  );
}
