"use client";
import React, { useEffect } from "react";
import styles from "../../../styles/About.module.css";
import BgAllPage from "../../../components/BgAllPage";
import ScrollToTop from "../../../components/ScrollToTop";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Agency from "../../../components/Agency";
import AOS from "aos";
import "aos/dist/aos.css";
import { urlFor } from "../../../sanity/lib/image";
import About from "./About";

export default function AboutContent({ aboutData, dict, locale }) {
    // Fallback: nếu không có data từ Sanity, dùng component fallback
    if (!aboutData) {
        return <About dict={dict} locale={locale} />;
    }

    // Lấy data từ Sanity
    const displayData = aboutData;

    // Initialize AOS
    useEffect(() => {
        if (typeof window !== "undefined") {
            if (window.innerWidth >= 768) {
                import("aos").then((AOS) =>
                    AOS.init({
                        duration: 1000,
                        once: true,
                    })
                );
            } else {
                document.querySelectorAll("[data-aos]").forEach((el) => {
                    el.removeAttribute("data-aos");
                });
            }
        }
        return () => {
            if (typeof window !== "undefined" && window.AOS) {
                window.AOS.refreshHard();
            }
        };
    }, []);

    // Image error handler
    const handleImageError = (e) => {
        e.target.src = "/images/fallback-image.png";
    };

    const getImageUrl = (image) => {
        return image?._ref ? urlFor(image).quality(80).url() : null;
    };

    return (
        <>
            <BgAllPage title={displayData.pageTitle} parent="SMADS" />

            {/* Section 1 */}
            <section className={styles.content}>
                <div className={styles.text} data-aos="fade-up">
                    <h2>{displayData.section1?.title}</h2>
                    <p>{displayData.section1?.p1}</p>
                    <p>{displayData.section1?.p2}</p>
                    <button className={styles.readMore}>
                        {displayData.section1?.readMore}
                    </button>
                </div>
                <div className={styles.image} data-aos="fade-left">
                    <img
                        src={getImageUrl(displayData.section1?.image) || "/images/about/da_img.png"}
                        alt={displayData.section1?.image?.alt || displayData.section1?.title || "About Illustration"}
                        onError={handleImageError}
                        loading="lazy"
                    />
                </div>
            </section>

            {/* Section 2 */}
            <section className={styles.bestMatchSection}>
                <div className={styles.container}>
                    <div className={styles.textBox} data-aos="flip-left">
                        <h2>{displayData.section2?.title}</h2>
                        <p>{displayData.section2?.desc}</p>
                        <ul className={styles.featureList}>
                            {displayData.section2?.list?.map((item, idx) => (
                                <li key={idx}>
                                    <i className="fa-solid fa-check"></i> {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.imageBox} data-aos="flip-right">
                        <img
                            src={getImageUrl(displayData.section2?.image) || "/images/about/best_match.png"}
                            alt={displayData.section2?.image?.alt || displayData.section2?.title || "Business growth"}
                            onError={handleImageError}
                            width={520}
                            height={520}
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>

            <Agency dict={dict} />
            <ScrollToTop />
        </>
    );
}