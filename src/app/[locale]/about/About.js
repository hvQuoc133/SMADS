"use client";
import React, { useEffect } from "react";
import styles from "../../../styles/About.module.css";
import BgAllPage from "../../../components/BgAllPage";
import ScrollToTop from "../../../components/ScrollToTop";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Agency from "../../../components/Agency";
import AOS from "aos";
import "aos/dist/aos.css";

export default function About({ dict }) {
    const a = dict.about;

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (window.innerWidth >= 768) {
                import("aos").then((AOS) =>
                    AOS.init({
                        duration: 1000,
                        once: true,
                    })
                );
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
            <BgAllPage title={a.pageTitle} parent="SMADS" />

            {/* Section 1 */}
            <section className={styles.content}>
                <div className={styles.text} data-aos="fade-up">
                    <h2>{a.section1.title}</h2>
                    <p>{a.section1.p1}</p>
                    <p>{a.section1.p2}</p>
                    <button className={styles.readMore}>{a.section1.readMore}</button>
                </div>
                <div className={styles.image} data-aos="fade-left">
                    <img src="/images/about/da_img.png" alt="About Illustration" />
                </div>
            </section>

            {/* Section 2 */}
            <section className={styles.bestMatchSection}>
                <div className={styles.container}>
                    <div className={styles.textBox} data-aos="flip-left">
                        <h2>{a.section2.title}</h2>
                        <p>{a.section2.desc}</p>
                        <ul className={styles.featureList}>
                            {a.section2.list.map((item, idx) => (
                                <li key={idx}>
                                    <i className="fa-solid fa-check"></i> {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.imageBox} data-aos="flip-right">
                        <img
                            src="/images/about/best_match.png"
                            alt="Business growth"
                            width={520}
                            height={520}
                        />
                    </div>
                </div>
            </section>

            <Agency dict={dict} />
            <ScrollToTop />
        </>
    );
}
