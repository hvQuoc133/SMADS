import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const metadata = {
  title: "SMADS",
  description: "Website truyền thông sáng tạo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
