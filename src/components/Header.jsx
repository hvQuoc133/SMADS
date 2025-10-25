"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../styles/header.css";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({ locale = "vi", dict }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const navRef = useRef(null);

  // 🧠 Theo dõi cuộn trang & click ngoài nav
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js").catch(() => {});

    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (e) => {
      if (
        navRef.current &&
        e.target instanceof Node &&
        !navRef.current.contains(e.target) &&
        !e.target.closest(".navbar-toggler")
      ) {
        setIsCollapsed(true);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Đóng toggle menu khi chuyển route
  useEffect(() => {
    setIsCollapsed(true);
  }, [pathname]);

  const toggleNavbar = () => setIsCollapsed(!isCollapsed);

  // 🧭 Hàm xác định link đang active
  const isActive = (href) => pathname === href;

  // 🧾 Các item menu (sẽ tự động đổi text theo dict)
   const menuItems = [
    { href: `/${locale}`, label: dict?.nav?.home || "Trang chủ" },
    { href: `/${locale}/about`, label: dict?.nav?.about || "Giới thiệu" },
    { href: `/${locale}/services`, label: dict?.nav?.services || "Dịch vụ" },
    { href: `/${locale}/activities`, label: dict?.nav?.activities || "Hoạt động" },
    { href: `/${locale}/career`, label: dict?.nav?.career || "Tuyển dụng" },
    { href: `/${locale}/contact`, label: dict?.nav?.contact || "Liên hệ" },
  ];

  return (
    <nav
      ref={navRef}
      className={`navbar navbar-expand-lg fixed-top ${
        scrolled ? "navbar-scrolled" : "navbar-top"
      }`}
    >
      <div className="container navbar-container">
        {/* Logo */}
        <Link href={`/${locale}`} className="navbar-brand fw-bold fs-4">
          <img
            className="logo-header"
            src="/images/logo/logo-header.png"
            alt="Logo SMAds"
          />
          <span className="logo-text">SMADS</span>
        </Link>

        {/* Toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav links */}
        <div
          className={`collapse navbar-collapse ${!isCollapsed ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav mx-auto">
            {menuItems.map((item, idx) => (
              <li key={idx} className="nav-item">
                <Link
                  href={item.href}
                  className={`nav-link ${isActive(item.href) ? "active" : ""}`}
                >
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}

            {/* Cờ đổi ngôn ngữ */}
            <li className="nav-item d-flex align-items-center ms-lg-3">
              <LanguageSwitcher currentLocale={locale} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
