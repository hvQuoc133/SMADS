"use client";
import { useEffect, useState } from "react";
import BgAllPage from '../../../../components/BgAllPage';
import ScrollToTop from '../../../../components/ScrollToTop';
import styles from '../../../../styles/ServiceWebDesign.module.css';
import AOS from "aos";
import 'aos/dist/aos.css';

export default function ServiceWebDesign({ locale, dict }) {
    const [openFaq, setOpenFaq] = useState(null);

    // Get data from dict
    const svc = dict?.serviceWebDesign || {};
    const hero = svc.hero || {};
    const whyUs = svc.whyUs || {};
    const pricing = svc.pricing || {};
    const process = svc.process || {};
    const faq = svc.faq || {};

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    // Initialize AOS - Đơn giản hóa
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
            <BgAllPage
                title={dict?.serviceWebDesign ? "Dịch vụ" : "Service"}
                parent="SMADS"
            />

            <div className={styles.wrapper}>
                {/* HERO - Chỉ 2 AOS */}
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
                                    {hero.benefits?.map((benefit, index) => (
                                        <li key={index}>{benefit}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className={styles.heroVisual} data-aos="fade-left">
                                <img src="/images/services/start_img.png" alt="mockup website" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* WHY US - 1 AOS */}
                <section className={`${styles.section} ${styles.whyUs}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>Tại sao chọn <span>Smads</span>?</h2>
                        <div className={styles.features}>
                            {whyUs.features?.map((feature, index) => (
                                <article key={index} className={styles.feature}>
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* PRICING - 1 AOS */}
                <section className={`${styles.section} ${styles.pricing}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>{pricing.title}</h2>
                        <p className={styles.lead}>{pricing.subtitle}</p>

                        <div className={styles.pricingGrid}>
                            {pricing.plans?.map((plan, index) => (
                                <div
                                    key={index}
                                    className={`${styles.planCard} ${index === 1 ? styles.popular : ''}`}
                                >
                                    {index === 1 && <div className={styles.planBadge}>Phổ Biến</div>}
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
                                    <button className={styles.planBtn}>{plan.price.includes('Liên hệ') ? 'Liên Hệ' : 'Chọn Gói'}</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* PROCESS TIMELINE - 1 AOS */}
                <section className={`${styles.section} ${styles.process}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle}>{process.title}</h2>
                        <div className={styles.processTimeline}>
                            {process.steps?.map((step, index) => (
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

                {/* FAQ - 1 AOS */}
                <section className={`${styles.section} ${styles.faq}`} data-aos="fade-up">
                    <div className={styles.container}>
                        <h2>{faq.title}</h2>
                        <div className={styles.faqList}>
                            {faq.items?.map((item, idx) => (
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