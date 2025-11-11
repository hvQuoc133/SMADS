"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../styles/header.css";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({ locale = "vi", dict }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef(null);

  // Follow scroll page & click outside nav
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js").catch(() => { });

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
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Close toggle menu when transferring route
  useEffect(() => {
    setIsCollapsed(true);
    setDropdownOpen(false);
  }, [pathname]);

  const toggleNavbar = () => setIsCollapsed(!isCollapsed);

  // Link active
  const isActive = (href) => {
    if (href.includes("/activities")) {
      return pathname.includes("/activities");
    }
    if (href.includes("/services")) {
      return pathname.startsWith(`/${locale}/services`);
    }
    return pathname === href;
  };

  // Menu item
  const menuItems = [
    { href: `/${locale}`, label: dict?.header?.home || "Trang chủ" },
    { href: `/${locale}/about`, label: dict?.header?.about || "Giới thiệu" },
    { href: `/${locale}/services`, label: dict?.header?.services || "Dịch vụ" },
    { href: `/${locale}/activities`, label: dict?.header?.activities || "Hoạt động" },
    { href: `/${locale}/career`, label: dict?.header?.career || "Tuyển dụng" },
    { href: `/${locale}/contact`, label: dict?.header?.contact || "Liên hệ" },
  ];

  const servicesSubmenu = [
    {
      href: `/${locale}/services/ads-service`,
      label: dict?.header?.servicesMenu?.ads || "Google Ads",
    },
    {
      href: `/${locale}/services/invoice-google`,
      label: dict?.header?.servicesMenu?.invoice || "Invoice Google",
    },
    {
      href: `/${locale}/services/seo-service`,
      label: dict?.header?.servicesMenu?.seo || "SEO",
    },
    {
      href: `/${locale}/services/web-design`,
      label: dict?.header?.servicesMenu?.webDesign || "Web Design",
    },
  ];
  return (
    <nav
      ref={navRef}
      className={`navbar navbar-expand-lg fixed-top ${scrolled ? "navbar-scrolled" : "navbar-top"
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
            {menuItems.map((item, idx) => {
              if (item.href.includes("/services")) {
                return (
                  <li
                    key={idx}
                    className="nav-item dropdown"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <Link
                      href={item.href}
                      className={`nav-link ${isActive(item.href) ? "active" : ""}`}
                      onClick={(e) => e.preventDefault()}
                    >
                      <span>{item.label}</span>
                    </Link>

                    <ul className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
                      {servicesSubmenu.map((sub, subIdx) => (
                        <li key={subIdx}>
                          <Link
                            href={sub.href}
                            className="dropdown-item"
                            onClick={() => {
                              setDropdownOpen(false);
                              setIsCollapsed(true);
                            }}
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }

              return (
                <li key={idx} className="nav-item">
                  <Link
                    href={item.href}
                    className={`nav-link ${isActive(item.href) ? "active" : ""}`}
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}

            {/* Flag change language */}
            <li className="nav-item d-flex align-items-center ms-lg-3">
              <LanguageSwitcher currentLocale={locale} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
