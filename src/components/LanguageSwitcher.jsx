// components/LanguageSwitcher.jsx
"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../styles/Language-switcher.module.css";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [slugMapping, setSlugMapping] = useState({});

  const currentLocale = pathname.split("/")[1];

  // Fetch slug mapping từ tất cả activities
  useEffect(() => {
    const fetchSlugMapping = async () => {
      try {
        const response = await fetch('/api/slug-mapping');
        const data = await response.json();
        if (data.success) {
          setSlugMapping(data.mapping);
        }
      } catch (error) {
        console.error('Failed to load slug mapping:', error);
      }
    };

    fetchSlugMapping();
  }, []);

  const handleChange = (locale) => {
    const parts = pathname.split("/").filter(Boolean);

    if (parts[1] === "activities" && parts[2]) {
      const currentSlug = decodeURIComponent(parts[2]);

      // Tìm slug tương ứng
      const newSlug = slugMapping[currentSlug] || currentSlug;

      return router.push(`/${locale}/activities/${newSlug}`);
    }

    router.push(pathname.replace(`/${currentLocale}`, `/${locale}`));
  };

  return (
    <div className={styles.languageSwitcher}>
      {["vi", "en"].map((locale) => (
        <button
          key={locale}
          onClick={() => handleChange(locale)}
          className={`${styles.langBtn} ${currentLocale === locale ? styles.active : ""}`}
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