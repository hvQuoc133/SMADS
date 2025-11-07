"use client";
import { useEffect } from "react";
import Image from "next/image";
import BgAllPage from "../../../../components/BgAllPage";
import ScrollToTop from "../../../../components/ScrollToTop";
import styles from "../../../../styles/ServiceAdsInvoice.module.css";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ServiceInvoice({ locale, dict }) {
    useEffect(() => {
        if (typeof window !== "undefined") {
            if (window.innerWidth >= 768) {
                import("aos").then((AOS) => {
                    AOS.init({ duration: 1000, once: true });
                });
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

    const svc = dict?.serviceInvoice || {};
    const advantages = svc.advantages || [];
    const feeTiers = svc.feeTiers || [];

    return (
        <>
            <BgAllPage title={svc.title} parent="SMADS" />

            {/* HERO */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <div className={styles.left} data-aos="fade-right">
                        <h1 className={styles.title}>
                            {svc.hero?.title1} <span>{svc.hero?.title2}</span>
                        </h1>

                        <p className={styles.lead}>{svc.hero?.desc}</p>

                        <div className={styles.actions}>
                            <a href={`/${locale}/contact`} className={styles.btnPrimary}>
                                {svc.hero?.btn1}
                            </a>
                            <a href="#pricing" className={styles.btnGhost}>
                                {svc.hero?.btn2}
                            </a>
                        </div>

                        <div className={styles.meta}>
                            <strong>{svc.hero?.metaStrong}</strong> {svc.hero?.metaText}
                        </div>
                    </div>

                    <div className={styles.right} data-aos="fade-left">
                        <div className={styles.cardImg}>
                            <Image
                                src={svc.hero?.image}
                                alt={svc.hero?.title2}
                                width={540}
                                height={360}
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* OVERVIEW */}
            <section className={styles.overview}>
                <div className={styles.container}>
                    <h2 className={styles.h2} data-aos="fade-down">{svc.overviewTitle}</h2>
                    <p className={styles.text} data-aos="fade-down">{svc.overviewText}</p>

                    <div className={styles.benefitsGrid} data-aos="zoom-in">
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
            <section className={styles.advantages}>
                <div className={styles.wrap}>
                    <div className={styles.advHeader} data-aos="flip-left">
                        <h2>{svc.advantagesTitle}</h2>
                        <p>{svc.advantagesDesc}</p>
                    </div>

                    <ul className={styles.advList} data-aos="flip-right">
                        {advantages.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* PRICING */}
            <section id="pricing" className={styles.pricing}>
                <div className={styles.container}>
                    <h2 className={styles.h2}>{svc.pricingTitle}</h2>
                    <p className={styles.text}>{svc.pricingDesc}</p>

                    <div className={styles.feeList} data-aos="fade-up"
                        data-aos-anchor-placement="center-center">
                        {feeTiers.map((t, idx) => (
                            <div key={idx} className={styles.feeCard}>
                                <div className={styles.feeLabel}>{t.label}</div>
                                <div className={styles.feeRate}>{t.rate}</div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.note}>
                        <strong>{svc.noteTitle}</strong> {svc.noteText}
                    </div>

                    <div className={styles.ctaRow} data-aos="fade-down">
                        <a className={styles.btnPricing} href={`/${locale}/contact`}>
                            {svc.ctaBtn}
                        </a>
                    </div>
                </div>
            </section>

            <ScrollToTop />
        </>
    );
}
