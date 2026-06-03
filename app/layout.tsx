import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "RAYDENFLY - Digital Identity & Portfolio",
  description:
    "Ruang digital RAYDENFLY, kreator digital yang mencintai teknologi, estetika, dan desain. Portfolio, karya, dan pemikiran dalam satu tempat.",
  keywords: ["RAYDENFLY", "Digital Identity", "Portfolio", "Kreator Digital", "Desain Grafis", "Teknologi", "Web Developer Indonesia"],
  authors: [{ name: "Ray" }],
  openGraph: {
    title: "RAYDENFLY - Digital Identity",
    description: "Kreator digital yang mencintai teknologi, estetika, dan desain.",
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
    title: "RAYDENFLY - Digital Identity",
    description: "Kreator digital yang mencintai teknologi, estetika, dan desain.",
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
      <body>
        {children}
      </body>
    </html>
  );
}
