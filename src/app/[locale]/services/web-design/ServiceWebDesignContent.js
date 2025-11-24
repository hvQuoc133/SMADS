"use client";
import { useEffect, useState } from "react";
import BgAllPage from '../../../../components/BgAllPage';
import ScrollToTop from '../../../../components/ScrollToTop';
import styles from '../../../../styles/ServiceWebDesign.module.css';
import AOS from "aos";
import 'aos/dist/aos.css';
import { urlFor } from "../../../../sanity/lib/image";
import ServiceWebDesignFallback from "./ServiceWebDesign";

export default function ServiceWebDesignContent({ pageData, dict, locale }) {
    // HOOKS 
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
        return <ServiceWebDesignFallback locale={locale} dict={dict} />;
    }

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // Lấy data từ Sanity
    const hero = pageData.hero || {};
    const heroBenefits = pageData.heroBenefits || [];
    const whyUs = pageData.whyUs || {};
    const features = pageData.features || [];
    const pricing = pageData.pricing || {};
    const pricingPlans = pageData.pricingPlans || [];
    const process = pageData.process || {};
    const processSteps = pageData.processSteps || [];
    const cta = pageData.cta || {};
    const faq = pageData.faq || {};
    const faqItems = pageData.faqItems || [];

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
                <section className={`${styles.section} ${styles.hero}`}>
                    <div className={styles.container}>
                        <div className={styles.heroInner}>
                            <div className={styles.heroText} data-aos="fade-right">
                                <h1>{hero.title}</h1>
                                <p>{hero.description}</p>

                                <div className={styles.heroActions}>
                                    <a href={`/${locale}/contact`} className={styles.btnPrimary}>
                                        {hero.cta}
                                    </a>
                                </div>

                                <ul className={styles.heroBenefits}>
                                    {heroBenefits.map((benefit, index) => (
                                        <li key={index}>{benefit.text}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className={styles.heroVisual} data-aos="fade-left">
                                <img
                                    src={getImageUrl(hero.heroImage) || "/images/services/start_img.png"}
                                    alt={hero.heroImage?.alt || "mockup website"}
                                    onError={handleImageError}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* WHY US SECTION */}
                <section className={`${styles.section} ${styles.whyUs}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>{whyUs.title}</h2>
                        <div className={styles.features}>
                            {features.map((feature, index) => (
                                <article key={index} className={styles.feature}>
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* PRICING SECTION */}
                <section className={`${styles.section} ${styles.pricing}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>{pricing.title}</h2>
                        <p className={styles.lead}>{pricing.subtitle}</p>

                        <div className={styles.pricingGrid}>
                            {pricingPlans.map((plan, index) => (
                                <div
                                    key={index}
                                    className={`${styles.planCard} ${index === 1 ? styles.popular : ''}`}
                                >
                                    {index === 1 && <div className={styles.planBadge}>{pricing.popularBadge}</div>}
                                    <div className={styles.planHeader}>
                                        <h3>{plan.name}</h3>
                                        <div className={styles.planPrice}>{plan.price}</div>
                                    </div>
                                    <p className={styles.planDesc}>{plan.description}</p>
                                    <ul className={styles.planFeatures}>
                                        {plan.features?.map((feature, featureIndex) => (
                                            <li key={featureIndex}>{feature}</li>
                                        ))}
                                    </ul>
                                    <button className={styles.planBtn}>
                                        {plan.price.includes('Liên hệ') ? 'Liên Hệ' : 'Chọn Gói'}
                                    </button>
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
                            {processSteps.map((step, index) => (
                                <div
                                    key={index}
                                    className={styles.timelineItem}
                                >
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

                {/* CTA SECTION */}
                <section className={`${styles.section} ${styles.ctaSection}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <div className={styles.ctaContent}>
                            <h2>{cta.title}</h2>
                            <p>{cta.description}</p>
                            <div className={styles.ctaActions}>
                                <a href={`/${locale}/contact`} className={styles.btnPrimary}>
                                    {cta.ctaButton}
                                </a>
                                <a href="tel:+84775779266" className={styles.btnSecondary}>
                                    0775.779.266
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ SECTION */}
                <section className={`${styles.section} ${styles.faq}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>{faq.title}</h2>
                        <div className={styles.faqList}>
                            {faqItems.map((item, idx) => (
                                <div key={idx} className={`${styles.faqItem} ${openFaq === idx ? styles.active : ""}`}>
                                    <button className={styles.faqQuestion} onClick={() => toggleFaq(idx)}>
                                        <span>{item.question}</span>
                                        <span className={styles.faqIcon}>
                                            {openFaq === idx ? "−" : "+"}
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
            </div>

            <ScrollToTop />
        </>
    );
}