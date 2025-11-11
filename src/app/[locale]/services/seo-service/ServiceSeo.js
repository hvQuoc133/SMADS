"use client";
import { useEffect, useState } from "react";
import BgAllPage from '../../../../components/BgAllPage';
import ScrollToTop from '../../../../components/ScrollToTop';
import styles from '../../../../styles/ServiceSeo.module.css';
import AOS from "aos";
import 'aos/dist/aos.css';

export default function ServiceSeo({ locale, dict }) {
    const [openFaq, setOpenFaq] = useState(null);
    const t = dict.serviceSeo;

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // Initialize AOS
    useEffect(() => {
        if (typeof window !== "undefined" && window.innerWidth >= 768) {
            AOS.init({
                duration: 800,
                once: true,
            });
        }
    }, []);

    return (
        <>
            <BgAllPage title={t.pageTitle} parent="SMADS" />

            <div className={styles.wrapper}>
                {/* HERO SECTION */}
                <section className={`${styles.section} ${styles.heroSeo}`}>
                    <div className={styles.container}>
                        <div className={styles.heroSeoContent}>
                            <div className={styles.heroText} data-aos="fade-right">
                                <h1>{t.hero.title}</h1>
                                <p>{t.hero.desc}</p>

                                <div className={styles.seoMetrics}>
                                    {t.hero.metrics.map((metric, index) => (
                                        <div key={index} className={styles.metric}>
                                            <span className={styles.metricValue}>{metric.value}</span>
                                            <span className={styles.metricLabel}>{metric.label}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.heroActions}>
                                    <a href={`/${locale}/contact`} className={styles.btnPrimary}>
                                        {t.hero.ctaPrimary}
                                    </a>
                                    <a href="#pricing" className={styles.btnSecondary}>
                                        {t.hero.ctaSecondary}
                                    </a>
                                </div>
                            </div>

                            <div className={styles.heroVisual} data-aos="fade-left">
                                <div className={styles.googleResults}>
                                    {t.hero.searchResults.map((result, index) => (
                                        <div key={index} className={styles.searchResult}>
                                            <div className={styles.resultUrl}>{result.url}</div>
                                            <div className={styles.resultTitle}>{result.title}</div>
                                            <div className={styles.resultDesc}>{result.desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SEO SERVICES GRID */}
                <section className={`${styles.section} ${styles.seoServices}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>{t.services.title}</h2>
                        <div className={styles.servicesGrid}>
                            {t.services.items.map((service, index) => (
                                <div key={index} className={styles.serviceCard}>
                                    <div className={styles.serviceIcon}>{service.icon}</div>
                                    <h3>{service.name}</h3>
                                    <p>{service.desc}</p>
                                    <ul>
                                        {service.features.map((feature, idx) => (
                                            <li key={idx}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SEO PROCESS */}
                <section className={`${styles.section} ${styles.process}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle}>{t.process.title}</h2>
                        <div className={styles.processTimeline}>
                            {t.process.steps.map((step, index) => (
                                <div key={index} className={styles.timelineItem}>
                                    <div className={styles.timelineContent}>
                                        <div className={styles.timelineNumber}>{index + 1}</div>
                                        <div className={styles.timelineText}>
                                            <h3>{step.title}</h3>
                                            <p>{step.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SEO RESULTS - Card Grid */}
                <section className={`${styles.section} ${styles.seoResults}`} data-aos="fade-up">
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

                {/* SEO PRICING - Card Grid */}
                <section id="pricing" className={`${styles.section} ${styles.seoPricing}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>{t.pricing.title}</h2>
                        <div className={styles.pricingPlans}>
                            {t.pricing.plans.map((plan, index) => (
                                <div key={index} className={`${styles.planCard} ${plan.popular ? styles.popular : ""}`}>
                                    {plan.popular && <div className={styles.planBadge}>{t.pricing.popularBadge}</div>}
                                    <div className={styles.planHeader}>
                                        <h3>{plan.name}</h3>
                                        <div className={styles.planPrice}>{plan.price}{plan.price !== t.pricing.contactPrice && <small>{t.pricing.perMonth}</small>}</div>
                                    </div>
                                    <ul className={styles.planFeatures}>
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx}>{feature}</li>
                                        ))}
                                    </ul>
                                    <button className={styles.planBtn}>{plan.buttonText}</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ SECTION */}
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

                {/* CTA SECTION */}
                <section className={`${styles.section} ${styles.cta}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>{t.cta.title}</h2>
                        <p>{t.cta.desc}</p>
                        <div className={styles.ctaActions}>
                            <a href={`/${locale}/contact`} className={styles.btnPrimary}>
                                {t.cta.ctaPrimary}
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