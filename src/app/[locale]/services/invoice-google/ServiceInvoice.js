"use client";
import { useEffect } from "react";
import BgAllPage from "../../../../components/BgAllPage";
import ScrollToTop from "../../../../components/ScrollToTop";
import styles from "../../../../styles/ServiceAdsInvoice.module.css";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ServiceInvoice({ locale, dict }) {
    // Initialize AOS 
    useEffect(() => {
        if (typeof window !== "undefined" && window.innerWidth >= 768) {
            import("aos").then((AOS) => {
                AOS.init({ duration: 800, once: true });
            });
        }
    }, []);

    const svc = dict?.serviceInvoice || {};
    const advantages = svc.advantages || [];
    const feeTiers = svc.feeTiers || [];

    return (
        <>
            <BgAllPage title={svc.title} parent="SMADS" />

            <div className={styles.wrapper}>
                {/* HERO */}
                <section className={`${styles.section} ${styles.hero}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <div className={styles.heroContent}>
                            <div className={styles.heroText}>
                                <h1>{svc.hero?.title1} <span>{svc.hero?.title2}</span></h1>
                                <p className={styles.heroDesc}>{svc.hero?.desc}</p>

                                <div className={styles.heroActions}>
                                    <a href={`/${locale}/contact`} className={styles.btnPrimary}>
                                        {svc.hero?.btn1}
                                    </a>
                                    <a href="#pricing" className={styles.btnSecondary}>
                                        {svc.hero?.btn2}
                                    </a>
                                </div>

                                <div className={styles.heroMeta}>
                                    <strong>{svc.hero?.metaStrong}</strong> {svc.hero?.metaText}
                                </div>
                            </div>

                            <div className={styles.heroVisual}>
                                <img src="/images/services/b_list04.jpg" alt="Hóa đơn điện tử" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* OVERVIEW  */}
                <section className={`${styles.section} ${styles.overview}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>{svc.overviewTitle}</h2>
                        <p className={styles.overviewText}>{svc.overviewText}</p>

                        <div className={styles.benefitsGrid}>
                            {(svc.benefits || []).map((item, idx) => (
                                <div key={idx} className={styles.benefitCard}>
                                    <h4>{item.title}</h4>
                                    <p>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ADVANTAGES */}
                <section className={`${styles.section} ${styles.advantages}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <div className={styles.advantagesContent}>
                            <div className={styles.advantagesText}>
                                <h2>{svc.advantagesTitle}</h2>
                                <p>{svc.advantagesDesc}</p>
                            </div>

                            <ul className={styles.advantagesList}>
                                {advantages.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* PRICING */}
                <section id="pricing" className={`${styles.section} ${styles.pricing}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>{svc.pricingTitle}</h2>
                        <p className={styles.pricingText}>{svc.pricingDesc}</p>

                        <div className={styles.pricingGrid}>
                            {feeTiers.map((t, idx) => (
                                <div key={idx} className={styles.pricingCard}>
                                    <div className={styles.pricingLabel}>{t.label}</div>
                                    <div className={styles.pricingRate}>{t.rate}</div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.pricingNote}>
                            <strong>{svc.noteTitle}</strong> {svc.noteText}
                        </div>

                        <div className={styles.pricingCta}>
                            <a className={styles.btnPrimary} href={`/${locale}/contact`}>
                                {svc.ctaBtn}
                            </a>
                        </div>
                    </div>
                </section>
            </div>

            <ScrollToTop />
        </>
    );
}