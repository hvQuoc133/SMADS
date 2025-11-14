"use client";
import { useEffect } from "react";
import BgAllPage from "../../../../components/BgAllPage";
import ScrollToTop from "../../../../components/ScrollToTop";
import styles from "../../../../styles/ServiceAdsInvoice.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { urlFor } from "../../../../sanity/lib/image";
import ServiceInvoiceFallback from "./ServiceInvoice";

export default function ServiceInvoiceContent({ pageData, dict, locale }) {
    // Initialize AOS 
    useEffect(() => {
        if (typeof window !== "undefined" && window.innerWidth >= 768) {
            import("aos").then((AOS) => {
                AOS.init({ duration: 800, once: true });
            });
        }
    }, []);

    // Fallback nếu không có data từ Sanity
    if (!pageData) {
        return <ServiceInvoiceFallback locale={locale} dict={dict} />;
    }

    // Lấy data từ Sanity
    const hero = pageData.hero || {};
    const overview = pageData.overview || {};
    const benefits = pageData.benefits || [];
    const advantages = pageData.advantages || {};
    const advantagesList = pageData.advantagesList || [];
    const pricing = pageData.pricing || {};
    const feeTiers = pageData.feeTiers || [];

    // Image handler
    const handleImageError = (e) => {
        e.target.src = "/images/fallback-image.png";
    };

    const getImageUrl = (image) => {
        return image?.asset?._ref ? urlFor(image).quality(80).url() : null;
    };

    return (
        <>
            <BgAllPage title={pageData.pageTitle} parent="SMADS" />

            <div className={styles.wrapper}>
                {/* HERO SECTION */}
                <section className={`${styles.section} ${styles.hero}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <div className={styles.heroContent}>
                            <div className={styles.heroText}>
                                <h1>{hero.title1} <span>{hero.title2}</span></h1>
                                <p className={styles.heroDesc}>{hero.description}</p>

                                <div className={styles.heroActions}>
                                    <a href={`/${locale}/contact`} className={styles.btnPrimary}>
                                        {hero.button1}
                                    </a>
                                    <a href="#pricing" className={styles.btnSecondary}>
                                        {hero.button2}
                                    </a>
                                </div>

                                <div className={styles.heroMeta}>
                                    <strong>{hero.metaStrong}</strong> {hero.metaText}
                                </div>
                            </div>

                            <div className={styles.heroVisual}>
                                <img
                                    src={getImageUrl(hero.heroImage) || "/images/services/b_list04.jpg"}
                                    alt={hero.heroImage?.alt || "Hóa đơn điện tử"}
                                    onError={handleImageError}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* OVERVIEW SECTION */}
                <section className={`${styles.section} ${styles.overview}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>{overview.title}</h2>
                        <p className={styles.overviewText}>{overview.description}</p>

                        <div className={styles.benefitsGrid}>
                            {benefits.map((item, idx) => (
                                <div key={idx} className={styles.benefitCard}>
                                    <h4>{item.title}</h4>
                                    <p>{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ADVANTAGES SECTION */}
                <section className={`${styles.section} ${styles.advantages}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <div className={styles.advantagesContent}>
                            <div className={styles.advantagesText}>
                                <h2>{advantages.title}</h2>
                                <p>{advantages.description}</p>
                            </div>

                            <ul className={styles.advantagesList}>
                                {advantagesList.map((item, i) => (
                                    <li key={i}>{item.text}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* PRICING SECTION */}
                <section id="pricing" className={`${styles.section} ${styles.pricing}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>{pricing.title}</h2>
                        <p className={styles.pricingText}>{pricing.description}</p>

                        <div className={styles.pricingGrid}>
                            {feeTiers.map((tier, idx) => (
                                <div key={idx} className={styles.pricingCard}>
                                    <div className={styles.pricingLabel}>{tier.label}</div>
                                    <div className={styles.pricingRate}>{tier.rate}</div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.pricingNote}>
                            <strong>{pricing.noteTitle}</strong> {pricing.noteText}
                        </div>

                        <div className={styles.pricingCta}>
                            <a className={styles.btnPrimary} href={`/${locale}/contact`}>
                                {pricing.ctaButton}
                            </a>
                        </div>
                    </div>
                </section>
            </div>

            <ScrollToTop />
        </>
    );
}