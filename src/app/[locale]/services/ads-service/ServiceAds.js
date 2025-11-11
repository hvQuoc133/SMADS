"use client";
import { useEffect, useState } from "react";
import BgAllPage from "../../../../components/BgAllPage";
import ScrollToTop from "../../../../components/ScrollToTop";
import Image from "next/image";
import "aos/dist/aos.css";
import styles from "../../../../styles/ServiceAds.module.css";

export default function ServiceAds({ dict, locale }) {
    const [openFaq, setOpenFaq] = useState(null);
    const t = dict.serviceAds;

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // Initialize AOS
    useEffect(() => {
        if (typeof window !== "undefined" && window.innerWidth >= 768) {
            import("aos").then((AOS) => {
                AOS.init({ duration: 800, once: true });
            });
        }
    }, []);

    return (
        <>
            <BgAllPage title={t.pageTitle} parent="SMADS" />

            <div className={styles.wrapper}>
                {/* HERO */}
                <section className={`${styles.section} ${styles.hero}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <div className={styles.heroContent}>
                            <div className={styles.heroText}>
                                <h1>{t.title1} <span>{t.title2}</span></h1>
                                <p>{t.desc}</p>

                                <div className={styles.heroMetrics}>
                                    {t.heroMetrics.map((metric, index) => (
                                        <div key={index} className={styles.metric}>
                                            <span className={styles.metricValue}>{metric.value}</span>
                                            <span className={styles.metricLabel}>{metric.label}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.heroActions}>
                                    <a href={`/${locale}/contact`} className={styles.btnPrimary}>
                                        {t.cta}
                                    </a>
                                    <a href="#pricing" className={styles.btnSecondary}>
                                        {t.viewPricing}
                                    </a>
                                </div>
                            </div>
                            <div className={styles.heroVisual}>
                                <Image src="/images/services/b_list02.jpg" alt="Google Ads" width={500} height={350} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* WHY CHOOSE US */}
                <section className={`${styles.section} ${styles.whyUs}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>{t.whyUs.title}</h2>
                        <div className={styles.featuresGrid}>
                            {t.whyUs.features.map((feature, index) => (
                                <div key={index} className={styles.featureCard}>
                                    <div className={styles.featureIcon}>{feature.icon}</div>
                                    <h3>{feature.title}</h3>
                                    <p>{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* AD TYPES */}
                <section className={`${styles.section} ${styles.adTypes}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>{t.adTypes.title}</h2>
                        <div className={styles.adTypesGrid}>
                            {t.adTypes.types.map((type, index) => (
                                <div key={index} className={styles.adTypeCard}>
                                    <div className={styles.adTypeIcon}>{type.icon}</div>
                                    <h3>{type.name}</h3>
                                    <p>{type.desc}</p>
                                    <ul>
                                        {type.features.map((feature, idx) => (
                                            <li key={idx}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* PROCESS TIMELINE */}
                <section className={`${styles.section} ${styles.process}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle}>{t.stepsTitle}</h2>
                        <div className={styles.processTimeline}>
                            {t.steps.map((s, i) => (
                                <div key={i} className={styles.timelineItem}>
                                    <div className={styles.timelineContent}>
                                        <div className={styles.timelineNumber}>{i + 1}</div>
                                        <div className={styles.timelineText}>
                                            <h3>{s.title}</h3>
                                            <p>{s.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* BENEFITS */}
                <section className={`${styles.section} ${styles.benefits}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>{t.benefitsTitle}</h2>
                        <div className={styles.benefitsGrid}>
                            {t.benefits.map((b, i) => (
                                <div key={i} className={styles.benefitCard}>
                                    <Image src={b.icon} alt={b.title} width={64} height={64} />
                                    <h3>{b.title}</h3>
                                    <p>{b.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* RESULTS SHOWCASE */}
                <section className={`${styles.section} ${styles.results}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>{t.results.title}</h2>
                        <div className={styles.resultsGrid}>
                            {t.results.items.map((result, index) => (
                                <div key={index} className={styles.resultCard}>
                                    <div className={styles.resultMetric}>{result.metric}</div>
                                    <div className={styles.resultLabel}>{result.label}</div>
                                    <div className={styles.resultComparison}>
                                        <div className={styles.beforeResult}>
                                            <div className={styles.beforeLabel}>{t.results.before}</div>
                                            <div className={styles.beforeValue}>{result.beforeValue}</div>
                                        </div>
                                        <div className={styles.afterResult}>
                                            <div className={styles.afterLabel}>{t.results.after}</div>
                                            <div className={styles.afterValue}>{result.afterValue}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* PACKAGES */}
                <section id="pricing" className={`${styles.section} ${styles.packages}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>{t.packagesTitle}</h2>
                        <div className={styles.packagesGrid}>
                            {t.packages.map((p, i) => (
                                <div key={i} className={`${styles.packageCard} ${p.highlight ? styles.popular : ""}`}>
                                    {p.highlight && <div className={styles.packageBadge}>{t.popularBadge}</div>}
                                    <div className={styles.packageHeader}>
                                        <h3>{p.name}</h3>
                                        <div className={styles.packagePrice}>{p.price}</div>
                                    </div>
                                    <ul className={styles.packageFeatures}>
                                        {p.features.map((f, idx) => (
                                            <li key={idx}>{f}</li>
                                        ))}
                                    </ul>
                                    <button className={styles.packageBtn}>{t.btnSignup}</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className={`${styles.section} ${styles.faq}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>{t.faq.title}</h2>
                        <div className={styles.faqList}>
                            {t.faq.items.map((item, index) => (
                                <div key={index} className={`${styles.faqItem} ${openFaq === index ? styles.active : ""}`}>
                                    <button className={styles.faqQuestion} onClick={() => toggleFaq(index)}>
                                        <span>{item.question}</span>
                                        <span className={styles.faqIcon}>
                                            {openFaq === index ? "−" : "+"}
                                        </span>
                                    </button>
                                    <div className={styles.faqAnswer}>
                                        <p>{item.answer}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className={`${styles.section} ${styles.cta}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>{t.ctaSection.title}</h2>
                        <p>{t.ctaSection.desc}</p>
                        <div className={styles.ctaActions}>
                            <a href={`/${locale}/contact`} className={styles.btnPrimary}>
                                {t.ctaSection.ctaButton}
                            </a>
                            <a href="tel:+84775779266" className={styles.btnSecondary}>
                                0775.779.266
                            </a>
                        </div>
                    </div>
                </section>
            </div>

            <ScrollToTop />
        </>
    );
}