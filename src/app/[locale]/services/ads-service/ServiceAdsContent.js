"use client";
import { useEffect, useState } from "react";
import BgAllPage from "../../../../components/BgAllPage";
import ScrollToTop from "../../../../components/ScrollToTop";
import Image from "next/image";
import "aos/dist/aos.css";
import styles from "../../../../styles/ServiceAds.module.css";
import { urlFor } from "../../../../sanity/lib/image";
import ServiceAdsFallback from "./ServiceAds";

export default function ServiceAdsContent({ pageData, dict, locale }) {
    const [openFaq, setOpenFaq] = useState(null);

    // Initialize AOS
    useEffect(() => {
        if (typeof window !== "undefined" && window.innerWidth >= 768) {
            import("aos").then((AOS) => {
                AOS.init({ duration: 800, once: true });
            });
        }
    }, []);

    // Fallback 
    if (!pageData) {
        return <ServiceAdsFallback dict={dict} locale={locale} />;
    }

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // Get data Sanity
    const hero = pageData.hero || {};
    const heroMetrics = pageData.heroMetrics || [];
    const whyUs = pageData.whyUs || {};
    const features = pageData.features || [];
    const adTypes = pageData.adTypes || {};
    const adTypesList = pageData.adTypesList || [];
    const process = pageData.process || {};
    const steps = pageData.steps || [];
    const benefits = pageData.benefits || {};
    const benefitsList = pageData.benefitsList || [];
    const results = pageData.results || {};
    const resultsItems = pageData.resultsItems || [];
    const pricing = pageData.pricing || {};
    const packages = pageData.packages || [];
    const faq = pageData.faq || {};
    const faqItems = pageData.faqItems || [];
    const ctaSection = pageData.ctaSection || {};

    // Image handler
    const handleImageError = (e) => {
        e.target.src = "/images/fallback-image.png";
    };

    const getImageUrl = (image) => {
        return image?._ref ? urlFor(image).quality(80).url() : null;
    };

    console.log('🔍 Benefits List Data:', {
        benefitsList: benefitsList,
        firstBenefit: benefitsList[0],
        hasIcon: benefitsList[0]?.icon,
        iconRef: benefitsList[0]?.icon?._ref
    });

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
                                <p>{hero.description}</p>

                                <div className={styles.heroMetrics}>
                                    {heroMetrics.map((metric, index) => (
                                        <div key={index} className={styles.metric}>
                                            <span className={styles.metricValue}>{metric.value}</span>
                                            <span className={styles.metricLabel}>{metric.label}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.heroActions}>
                                    <a href={`/${locale}/contact`} className={styles.btnPrimary}>
                                        {hero.cta}
                                    </a>
                                    <a href="#pricing" className={styles.btnSecondary}>
                                        {hero.viewPricing}
                                    </a>
                                </div>
                            </div>
                            <div className={styles.heroVisual}>
                                <Image
                                    src={getImageUrl(hero.heroImage) || "/images/services/b_list02.jpg"}
                                    alt={hero.heroImage?.alt || "Google Ads"}
                                    width={500}
                                    height={350}
                                    onError={handleImageError}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* WHY CHOOSE US SECTION */}
                <section className={`${styles.section} ${styles.whyUs}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>{whyUs.title}</h2>
                        <div className={styles.featuresGrid}>
                            {features.map((feature, index) => (
                                <div key={index} className={styles.featureCard}>
                                    <div className={styles.featureIcon}>{feature.icon}</div>
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* AD TYPES SECTION */}
                <section className={`${styles.section} ${styles.adTypes}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>{adTypes.title}</h2>
                        <div className={styles.adTypesGrid}>
                            {adTypesList.map((type, index) => (
                                <div key={index} className={styles.adTypeCard}>
                                    <div className={styles.adTypeIcon}>{type.icon}</div>
                                    <h3>{type.name}</h3>
                                    <p>{type.description}</p>
                                    <ul>
                                        {type.features?.map((feature, idx) => (
                                            <li key={idx}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* PROCESS TIMELINE SECTION */}
                <section className={`${styles.section} ${styles.process}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle}>{process.title}</h2>
                        <div className={styles.processTimeline}>
                            {steps.map((step, index) => (
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

                {/* BENEFITS SECTION */}
                <section className={`${styles.section} ${styles.benefits}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>{benefits.title}</h2>
                        <div className={styles.benefitsGrid}>
                            {benefitsList.map((benefit, index) => (
                                <div key={index} className={styles.benefitCard}>
                                    <Image
                                        // EDIT: Use benefit.icon.asset?.url
                                        src={benefit.icon?.asset?.url || "/images/fallback-image.png"}
                                        alt={benefit.icon?.alt || benefit.title}
                                        width={64}
                                        height={64}
                                        onError={handleImageError}
                                    />
                                    <h3>{benefit.title}</h3>
                                    <p>{benefit.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* RESULTS SHOWCASE SECTION */}
                <section className={`${styles.section} ${styles.results}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>{results.title}</h2>
                        <div className={styles.resultsGrid}>
                            {resultsItems.map((result, index) => (
                                <div key={index} className={styles.resultCard}>
                                    <div className={styles.resultMetric}>{result.metric}</div>
                                    <div className={styles.resultLabel}>{result.label}</div>
                                    <div className={styles.resultComparison}>
                                        <div className={styles.beforeResult}>
                                            <div className={styles.beforeLabel}>{results.beforeLabel}</div>
                                            <div className={styles.beforeValue}>{result.beforeValue}</div>
                                        </div>
                                        <div className={styles.afterResult}>
                                            <div className={styles.afterLabel}>{results.afterLabel}</div>
                                            <div className={styles.afterValue}>{result.afterValue}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* PRICING PACKAGES SECTION */}
                <section id="pricing" className={`${styles.section} ${styles.packages}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>{pricing.title}</h2>
                        <div className={styles.packagesGrid}>
                            {packages.map((pkg, index) => (
                                <div key={index} className={`${styles.packageCard} ${pkg.highlight ? styles.popular : ""}`}>
                                    {pkg.highlight && <div className={styles.packageBadge}>{pricing.popularBadge}</div>}
                                    <div className={styles.packageHeader}>
                                        <h3>{pkg.name}</h3>
                                        <div className={styles.packagePrice}>{pkg.price}</div>
                                    </div>
                                    <ul className={styles.packageFeatures}>
                                        {pkg.features?.map((feature, idx) => (
                                            <li key={idx}>{feature}</li>
                                        ))}
                                    </ul>
                                    <button className={styles.packageBtn}>{pricing.signupButton}</button>
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
                        <h2>{ctaSection.title}</h2>
                        <p>{ctaSection.description}</p>
                        <div className={styles.ctaActions}>
                            <a href={`/${locale}/contact`} className={styles.btnPrimary}>
                                {ctaSection.button}
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