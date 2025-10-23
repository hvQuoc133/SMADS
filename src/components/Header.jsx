"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../styles/header.css";

export default function Header() {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const navRef = useRef(null);

    useEffect(() => {
        // Import Bootstrap JS
        import("bootstrap/dist/js/bootstrap.bundle.min.js").catch(() => { });

        // Follow scoll page
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };
        window.addEventListener("scroll", handleScroll);

        // Close toggle when click outside
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

        // Cleanup
        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    // Close toggle when turn pgae
    useEffect(() => {
        setIsCollapsed(true);
    }, [pathname]);

    const toggleNavbar = () => setIsCollapsed(!isCollapsed);

    return (
        <nav
            ref={navRef}
            className={`navbar navbar-expand-lg fixed-top ${scrolled ? "navbar-scrolled" : "navbar-top"
                }`}
        >
            <div className="container navbar-container">
                <Link href="/" className="navbar-brand fw-bold fs-4">
                    <img
                        className="logo-header"
                        src="/images/logo/logo-header.png"
                        alt="Logo SMAds"
                    />
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

                <div
                    className={`collapse navbar-collapse ${!isCollapsed ? "show" : ""}`}
                    id="navbarNav"
                >
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <Link
                                href="/"
                                className={`nav-link ${pathname === "/" ? "active" : ""}`}
                            >
                                <span>Trang chủ</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                href="/about"
                                className={`nav-link ${pathname === "/about" ? "active" : ""}`}
                            >
                                <span>Giới thiệu</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                href="/services"
                                className={`nav-link ${pathname === "/services" ? "active" : ""
                                    }`}
                            >
                                <span>Dịch vụ</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                href="/activities"
                                className={`nav-link ${pathname === "/activities" ? "active" : ""
                                    }`}
                            >
                                <span>Hoạt động</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                href="/career"
                                className={`nav-link ${pathname === "/career" ? "active" : ""}`}
                            >
                                <span>Tuyển dụng</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                href="/contact"
                                className={`nav-link ${pathname === "/contact" ? "active" : ""}`}
                            >
                                <span>Liên hệ</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
