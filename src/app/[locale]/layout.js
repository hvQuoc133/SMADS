import "../../styles/globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AosInit from "../aos-init";
import { getDictionary } from "../../lib/dictionaries";
import ToastProvider from "../../components/ToastProvider";

export const metadata = {
  title: "SMADS - Truyền thông sáng tạo",
  description: "Website truyền thông SMADS",
};

export default async function LocaleLayout({ children, params }) {
  // ✅ Phải await params theo chuẩn Next.js 15+
  const { locale } = await params;

  // 🔥 Lấy dữ liệu ngôn ngữ tương ứng
  const dict = await getDictionary(locale);

  return (
    <>
      <AosInit />
      <Header dict={dict} locale={locale} />
      <main>{children}</main>
      <Footer dict={dict} locale={locale} />
      <ToastProvider />
    </>
  );
}
