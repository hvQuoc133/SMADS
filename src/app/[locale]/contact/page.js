import { getDictionary } from "../../../lib/dictionaries";
import Contact from "./Contact";

export default async function ContactPage(props) {
  // ✅ Trong Next.js 15+, params là Promise — phải await
  const { locale } = await props.params;

  // ✅ Lấy dữ liệu dictionary
  const dict = await getDictionary(locale);

  // ✅ Log ra terminal (xem trong nơi bạn chạy npm run dev)
  console.log("📦 dict nhận được:", dict);

  // ✅ Truyền dict xuống component client
  return <Contact dict={dict} />;
}
