
"use client";
import { useEffect, useState } from "react";
import BgAllPage from '../../../components/BgAllPage';
import ScrollToTop from '../../../components/ScrollToTop';
import AOS from "aos";
import 'aos/dist/aos.css';

export default function Activities() {
    
    // Initialize AOS
    useEffect(() => {
        if (typeof window !== "undefined") {
            if (window.innerWidth >= 768) {
                import("aos").then((AOS) => {
                    AOS.init({
                        duration: 1000,
                        once: true,
                    });
                });
            } else {
                // Render all elements without AOS for smaller screens
                document.querySelectorAll("[data-aos]").forEach((el) => {
                    el.removeAttribute("data-aos");
                });
            }
        }

        // Cleanup function: when out page or unmount component
        return () => {
            if (typeof window !== "undefined" && window.AOS) {
                window.AOS.refreshHard(); // reset AOS 
            }
        };
    }, []);

    return (
        <>
            {/* Hero section with background */}
            <BgAllPage title="Activities" parent="SMADS" />

            <ScrollToTop />
        </>
    );
}