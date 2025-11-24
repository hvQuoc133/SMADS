"use client";
import { useEffect, useState } from "react";
import BgAllPage from '../../../../components/BgAllPage';
import ScrollToTop from '../../../../components/ScrollToTop';
import styles from '../../../../styles/ServiceSeo.module.css';
import AOS from "aos";
import 'aos/dist/aos.css';
import { urlFor } from "../../../../sanity/lib/image";
import ServiceSeoFallback from "./ServiceSeo";

export default function ServiceSeoContent({ pageData, dict, locale }) {
    const [openFaq, setOpenFaq] = useState(null);

    // Initialize AOS
    useEffect(() => {
        if (typeof window !== "undefined" && window.innerWidth >= 768) {
            import("aos").then((AOS) => {
                AOS.init({
                    duration: 800,
                    once: true,
                });
            });
        }
    }, []);

    // Fallback
    if (!pageData) {
        return <ServiceSeoFallback locale={locale} dict={dict} />;
    }

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // Get data Sanity
    const hero = pageData.hero || {};
    const heroMetrics = pageData.heroMetrics || [];
    const searchResults = pageData.searchResults || [];
    const seoServices = pageData.seoServices || {};
    const servicesList = pageData.servicesList || [];
    const seoProcess = pageData.seoProcess || {};
    const processSteps = pageData.processSteps || [];
    const seoResults = pageData.seoResults || {};
    const resultsItems = pageData.resultsItems || [];
    const pricing = pageData.pricing || {};
    const pricingPlans = pageData.pricingPlans || [];
    const faq = pageData.faq || {};
    const faqItems = pageData.faqItems || [];
    const cta = pageData.cta || {};

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
                <section className={`${styles.section} ${styles.heroSeo}`}>
                    <div className={styles.container}>
                        <div className={styles.heroSeoContent}>
                            <div className={styles.heroText} data-aos="fade-right">
                                <h1>{hero.title}</h1>
                                <p>{hero.description}</p>

                                <div className={styles.seoMetrics}>
                                    {heroMetrics.map((metric, index) => (
                                        <div key={index} className={styles.metric}>
                                            <span className={styles.metricValue}>{metric.value}</span>
                                            <span className={styles.metricLabel}>{metric.label}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.heroActions}>
                                    <a href={`/${locale}/contact`} className={styles.btnPrimary}>
                                        {hero.ctaPrimary}
                                    </a>
                                    <a href="#pricing" className={styles.btnSecondary}>
                                        {hero.ctaSecondary}
                                    </a>
                                </div>
                            </div>

                            <div className={styles.heroVisual} data-aos="fade-left">
                                <div className={styles.googleResults}>
                                    {searchResults.map((result, index) => (
                                        <div key={index} className={styles.searchResult}>
                                            <div className={styles.resultUrl}>{result.url}</div>
                                            <div className={styles.resultTitle}>{result.title}</div>
                                            <div className={styles.resultDesc}>{result.description}</div>
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
                        <h2>{seoServices.title}</h2>
                        <div className={styles.servicesGrid}>
                            {servicesList.map((service, index) => (
                                <div key={index} className={styles.serviceCard}>
                                    <div className={styles.serviceIcon}>{service.icon}</div>
                                    <h3>{service.name}</h3>
                                    <p>{service.description}</p>
                                    <ul>
                                        {service.features?.map((feature, idx) => (
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
                        <h2 className={styles.sectionTitle}>{seoProcess.title}</h2>
                        <div className={styles.processTimeline}>
                            {processSteps.map((step, index) => (
                                <div key={index} className={styles.timelineItem}>
                                    <div className={styles.timelineContent}>
                                        <div className={styles.timelineNumber}>{index + 1}</div>
                                        <div className={styles.timelineText}>
                                            <h3>{step.title}</h3>
                                            <p>{step.description}</p>
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
                        <h2>{seoResults.title}</h2>
                        <div className={styles.resultsGrid}>
                            {resultsItems.map((result, index) => (
                                <div key={index} className={styles.resultCard}>
                                    <div className={styles.resultMetric}>{result.metric}</div>
                                    <div className={styles.resultLabel}>{result.label}</div>
                                    <div className={styles.resultComparison}>
                                        <div className={styles.beforeResult}>
                                            <div className={styles.beforeLabel}>{seoResults.beforeLabel}</div>
                                            <div className={styles.beforeValue}>{result.beforeValue}</div>
                                        </div>
                                        <div className={styles.afterResult}>
                                            <div className={styles.afterLabel}>{seoResults.afterLabel}</div>
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
                        <h2>{pricing.title}</h2>
                        <div className={styles.pricingPlans}>
                            {pricingPlans.map((plan, index) => (
                                <div key={index} className={`${styles.planCard} ${plan.popular ? styles.popular : ""}`}>
                                    {plan.popular && <div className={styles.planBadge}>{pricing.popularBadge}</div>}
                                    <div className={styles.planHeader}>
                                        <h3>{plan.name}</h3>
                                        <div className={styles.planPrice}>
                                            {plan.price}
                                        </div>
                                    </div>
                                    <ul className={styles.planFeatures}>
                                        {plan.features?.map((feature, idx) => (
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
                        <h2>{faq.title}</h2>
                        <div className={styles.faqList}>
                            {faqItems.map((item, index) => (
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
                        <h2>{cta.title}</h2>
                        <p>{cta.description}</p>
                        <div className={styles.ctaActions}>
                            <a href={`/${locale}/contact`} className={styles.btnPrimary}>
                                {cta.ctaPrimary}
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