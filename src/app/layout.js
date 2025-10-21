// src/app/layout.js
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";

export const metadata = {
  title: "SMADS",
  description: "Trang web demo được xây bằng Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/images/logo/logo-favicon.png" />
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
