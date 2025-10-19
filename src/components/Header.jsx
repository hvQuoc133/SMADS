"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../styles/header.css";

export default function Header() {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        // Import Bootstrap JS
        import("bootstrap/dist/js/bootstrap.bundle.min.js").catch(() => { });

        // Theo dõi cuộn trang
        const handleScroll = () => {
            if (window.scrollY > 30) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleNavbar = () => setIsCollapsed(!isCollapsed);

    return (
        <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? "navbar-scrolled" : "navbar-top"}`}>
            <div className="container navbar-container">
                <Link href="/" className="navbar-brand fw-bold fs-4">
                    <img className="logo-header" src="/images/logo/logo-header.png" alt="Logo SMAds" />
                    <span className="logo-text">SMADS</span>
                </Link>

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

                <div className={`collapse navbar-collapse ${!isCollapsed ? "show" : ""}`} id="navbarNav">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
                                <span>Trang chủ</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/about" className={`nav-link ${pathname === "/about" ? "active" : ""}`}>
                                <span>Giới thiệu</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/services" className={`nav-link ${pathname === "/services" ? "active" : ""}`}>
                                <span>Dịch vụ</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/activities" className={`nav-link ${pathname === "/activities" ? "active" : ""}`}>
                                <span>Hoạt động</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/career" className={`nav-link ${pathname === "/career" ? "active" : ""}`}>
                                <span>Tuyển dụng</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/contact" className={`nav-link ${pathname === "/contact" ? "active" : ""}`}>
                                <span>Liên hệ</span>
                            </Link>
                        </li>
                        <li className="nav-item d-flex align-items-center ms-3">
                            <button className="btn-lang" onClick={() => setLang('vi')}>
                                <img src="/images/icon/vi.png" alt="Tiếng Việt" />
                            </button>
                            <button className="btn-lang ms-2" onClick={() => setLang('en')}>
                                <img src="/images/icon/en.png" alt="English" />
                            </button>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    );
}
