"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import styles from "../styles/Language-switcher.module.css";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.split("/")[1]; // 'vi' hoặc 'en'
  const handleChange = (locale) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPath);
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
