import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const metadata = {
  title: "SMADS",
  description: "Website truyền thông sáng tạo",
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
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
