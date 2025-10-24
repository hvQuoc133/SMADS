// src/app/layout.js
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AosInit from "./aos-init";
import ClientWrapper from "./ClientWrapper";

export const metadata = {
  title: "SMADS",
  description: "Trang web demo được xây bằng Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/images/logo/logo-favicon.png" />
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
      </head>
      <body suppressHydrationWarning={true}>
        <AosInit />
        <Header />
        <ClientWrapper>{children}</ClientWrapper>
        <Footer />
      </body>
    </html>
  );
}
