"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import styles from "../styles/Language-switcher.module.css";
import viDict from "@/lib/dictionaries/vi.json";
import enDict from "@/lib/dictionaries/en.json";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.split("/")[1]; // 'vi' hoặc 'en'
  const otherLocale = currentLocale === "vi" ? "en" : "vi";

  const handleChange = (locale) => {
    const parts = pathname.split("/").filter(Boolean);

    // xử lý trang activities
    if (parts[1] === "activities" && parts[2]) {
      const slug = decodeURIComponent(parts[2]);

      if (currentLocale === "vi") {
        const match = viDict.activities.list.find((a) => a.slug === slug);
        if (match?.slug_en) {
          return router.push(`/${locale}/activities/${match.slug_en}`);
        }
      } else {
        const match = enDict.activities.list.find((a) => a.slug === slug);
        if (match?.slug_vi) {
          return router.push(`/${locale}/activities/${match.slug_vi}`);
        }
      }
    }

    // các trang khác → chỉ đổi locale
    router.push(pathname.replace(`/${currentLocale}`, `/${locale}`));
  };

  return (
    <div className={styles.languageSwitcher}>
      {["vi", "en"].map((locale) => (
        <button
          key={locale}
          onClick={() => handleChange(locale)}
          className={`${styles.langBtn} ${
            currentLocale === locale ? styles.active : ""
          }`}
        >
          <Image
            src={`/images/icon/${locale}.png`}
            alt={locale === "vi" ? "Tiếng Việt" : "English"}
            width={28}
            height={28}
            className={styles.langFlag}
          />
        </button>
      ))}
    </div>
  );
}
