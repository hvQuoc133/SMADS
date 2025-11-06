"use client";
import { useEffect } from "react";
import BgAllPage from "../../../../components/BgAllPage";
import ScrollToTop from "../../../../components/ScrollToTop";
import Image from "next/image";
import "aos/dist/aos.css";
import styles from "../../../../styles/ServiceAds.module.css";

export default function Service({ dict, locale }) {
    const t = dict.serviceAds;


    // Initialize AOS
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



    return (
        <>
            <BgAllPage title="Service" parent="SMADS" />

            <section className={styles.servicePage}>
                {/* HERO */}
                <div className={styles.hero}>
                    <div className={styles.container}>
                        <h1>{t.title}</h1>
                        <p>{t.desc}</p>
                        <button className={styles.cta}>{t.cta}</button>
                    </div>
                </div>

                {/* OVERVIEW */}
                <div className={styles.overview}>
                    <div className={styles.containerFlex}>
                        <div className={styles.text}>
                            <h2>{t.overviewTitle}</h2>
                            <p>{t.overviewDesc}</p>
                            <ul>
                                {t.overviewList.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.image}>
                            <Image src="/images/services/blog-009.jpg" alt="Google Ads overview" width={500} height={350} />
                        </div>
                    </div>
                </div>

                {/* BENEFITS */}
                <div className={styles.benefits}>
                    <div className={styles.container}>
                        <h2>{t.benefitsTitle}</h2>
                        <div className={styles.benefitGrid}>
                            {t.benefits.map((b, i) => (
                                <div key={i} className={styles.card}>
                                    <Image src={b.icon} alt={b.title} width={64} height={64} />
                                    <h3>{b.title}</h3>
                                    <p>{b.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* STEPS */}
                <div className={styles.steps}>
                    <div className={styles.container}>
                        <h2>{t.stepsTitle}</h2>
                        <div className={styles.timeline}>
                            {t.steps.map((s, i) => (
                                <div key={i} className={styles.step}>
                                    <div className={styles.circle}>{i + 1}</div>
                                    <div className={styles.line}></div>
                                    <div className={styles.content}>
                                        <h3>{s.title}</h3>
                                        <p>{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* PACKAGES */}
                <div className={styles.packages}>
                    <div className={styles.container}>
                        <h2>{t.packagesTitle}</h2>
                        <div className={styles.packageGrid}>
                            {t.packages.map((p, i) => (
                                <div key={i} className={`${styles.package} ${p.highlight ? styles.highlight : ""}`}>
                                    <h3>{p.name}</h3>
                                    <p className={styles.price}>{p.price}</p>
                                    <ul className={styles.ulContent}>
                                        {p.features.map((f, idx) => (
                                            <li key={idx}>{f}</li>
                                        ))}
                                    </ul>
                                    <button className={styles.btn}>Đăng ký ngay</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <ScrollToTop />
        </>
    );
}
