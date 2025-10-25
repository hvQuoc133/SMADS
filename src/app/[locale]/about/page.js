"use client";
import React from 'react';
import styles from '../../../styles/About.module.css';
import BgAllPage from '../../../components/BgAllPage';
import ScrollToTop from '../../../components/ScrollToTop';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Agency from '../../../components/Agency';
import { useEffect } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';

export default function About() {

    // Initialize AOS
    useEffect(() => {
        if (typeof window !== "undefined") {
            if (window.innerWidth >= 768) {
                import("aos").then((AOS) => {
                    AOS.init({
                        duration: 1000,
                        once: true,
                    });
                });
            } else {
                // Render all elements without AOS for smaller screens
                document.querySelectorAll("[data-aos]").forEach((el) => {
                    el.removeAttribute("data-aos");
                });
            }
        }

        // Cleanup function: when out page or unmount component
        return () => {
            if (typeof window !== "undefined" && window.AOS) {
                window.AOS.refreshHard(); // reset AOS 
            }
        };
    }, []);


    return (
        <>
            {/* Hero section with background */}
            <BgAllPage title="About Us" parent="SMADS" />
            {/* Content 1 */}
            <section className={styles.content}>
                <div className={styles.text} data-aos="fade-up">
                    <h2>Why We Are Different Digital Agency</h2>
                    <p>
                        There are many variations of passages of Lorem Ipsum available
                        but the majority have suffered alteration in that injected.
                    </p>
                    <p>
                        There are many variations of passages of Lorem Ipsum available
                        but the majority have suffered alteration in that injected. There
                        are many variations of passages of Lorem Ipsum available but the
                        majority have the at suffered alteration in that injected.
                    </p>
                    <button className={styles.readMore}>Read More</button>
                </div>
                <div className={styles.image} data-aos="fade-left">
                    <img src="/images/about/da_img.png" alt="About Illustration" />
                </div>
            </section>

            {/* Content 2 */}
            <section className={styles.bestMatchSection}>
                <div className={styles.container}>
                    <div className={styles.textBox} data-aos="flip-left">
                        <h2>Why We’re The Best Match For Your Business!!</h2>
                        <p>
                            There are many variations of passages of Lorem Ipsum available the
                            majority to have suffered some form by injected.
                        </p>
                        <ul className={styles.featureList}>
                            <li>
                                <i className="fa-solid fa-check"></i>
                                There are many variations of passages of Lorem Ipsum available but
                                the majority have suffered alteration.
                            </li>
                            <li>
                                <i className="fa-solid fa-check"></i>
                                If you are going to use a passage of Lorem Ipsum you need to be
                                sure there isn't anything embarrassing.
                            </li>
                            <li>
                                <i className="fa-solid fa-check"></i>
                                There are many variations of passages of Lorem Ipsum available but
                                the majority have suffered alteration.
                            </li>
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

            {/* Content 3 */}
            <Agency />

            <ScrollToTop />
        </>
    );
}
