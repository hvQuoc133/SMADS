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

    // Fallback
    if (!aboutData) {
        return <About dict={dict} locale={locale} />;
    }

    // Helper function 
    const getLocalizedContent = (viContent, enContent) => {
        return locale === 'vi' ? viContent : enContent || viContent;
    };

    // Page title 
    const pageTitle = getLocalizedContent(aboutData.pageTitle, aboutData.pageTitleEn);

    // Image error handler
    const handleImageError = (e) => {
        e.target.src = "/images/fallback-image.png";
    };

    const getImageUrl = (image) => {
        return image?._ref ? urlFor(image).quality(80).url() : null;
    };

    return (
        <>
            <BgAllPage title={pageTitle} parent="SMADS" />

            {/* Section 1 */}
            <section className={styles.content}>
                <div className={styles.text} data-aos="fade-up">
                    <h2>{getLocalizedContent(aboutData.section1?.title, aboutData.section1?.titleEn)}</h2>
                    <p>{getLocalizedContent(aboutData.section1?.p1, aboutData.section1?.p1En)}</p>
                    <p>{getLocalizedContent(aboutData.section1?.p2, aboutData.section1?.p2En)}</p>
                    <button className={styles.readMore}>
                        {getLocalizedContent(aboutData.section1?.readMore, aboutData.section1?.readMoreEn)}
                    </button>
                </div>
                <div className={styles.image} data-aos="fade-left">
                    <img
                        src={getImageUrl(aboutData.section1?.image) || "/images/about/da_img.png"}
                        alt={aboutData.section1?.image?.alt || getLocalizedContent(aboutData.section1?.title, aboutData.section1?.titleEn) || "About Illustration"}
                        onError={handleImageError}
                        loading="lazy"
                    />
                </div>
            </section>

            {/* Section 2 */}
            <section className={styles.bestMatchSection}>
                <div className={styles.container}>
                    <div className={styles.textBox} data-aos="flip-left">
                        <h2>{getLocalizedContent(aboutData.section2?.title, aboutData.section2?.titleEn)}</h2>
                        <p>{getLocalizedContent(aboutData.section2?.desc, aboutData.section2?.descEn)}</p>
                        <ul className={styles.featureList}>
                            {(locale === 'vi' ? aboutData.section2?.list : aboutData.section2?.listEn || aboutData.section2?.list)?.map((item, idx) => (
                                <li key={idx}>
                                    <i className="fa-solid fa-check"></i> {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.imageBox} data-aos="flip-right">
                        <img
                            src={getImageUrl(aboutData.section2?.image) || "/images/about/best_match.png"}
                            alt={aboutData.section2?.image?.alt || getLocalizedContent(aboutData.section2?.title, aboutData.section2?.titleEn) || "Business growth"}
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