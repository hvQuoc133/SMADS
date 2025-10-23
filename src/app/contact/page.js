
"use client";
import { useEffect, useState } from "react";
import BgAllPage from '../../components/BgAllPage';
import ScrollToTop from '../../components/ScrollToTop';
import AOS from "aos";
import 'aos/dist/aos.css';
import styles from '../../styles/Contact.module.css';
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";

export default function Contact() {
    
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
            <BgAllPage title="Contact" parent="SMADS" />
            <section className={styles.contactSection}>
                <div className={styles.contactHeader} data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
                    <h5>Get in Touch</h5>
                    <h2>Contact Us Now</h2>
                    <p>
                        There are many variations of passages of Lorem Ipsum available but the
                        majority have suffered alteration in some form by injected humour or
                        randomised words.
                    </p>
                </div>

                <div className={styles.contactContainer}>
                    {/* Left info */}
                    <div className={styles.contactInfo} data-aos="fade-up"data-aos-duration="3000">
                        <h3>Get in Touch</h3>
                        <p>
                            There are many variations of passages of Lorem Ipsum available but
                            the Lorem Ipsum you need to be sure there isn’t anything
                            embarrassing.
                        </p>

                        <ul>
                            <li>📍 77 Nguyễn Sinh Sắc, Liên Chiểu, Đà Nẵng</li>
                            <li>✉️ nfo@smads.com.vn</li>
                            <li>📞 (+84) 775 779 266</li>
                        </ul>

                        <div className={styles.socialIcons}>
                            <a href="#" className={styles.socialFb}><FaFacebookF /></a>
                            <a href="#" className={styles.socialX}><FaXTwitter /></a>
                            <a href="#" className={styles.socialTele}><FaTelegramPlane /></a>
                            <a href="#" className={styles.socialIg}><FaInstagram /></a>
                        </div>
                    </div>

                    {/* Right form */}
                    <div className={styles.contactForm} data-aos="zoom-in">
                        <form>
                            <div className={styles.row}>
                                <input type="text" placeholder="Name *" required />
                                <input type="email" placeholder="Email *" required />
                            </div>
                            <input type="text" placeholder="Subject *" required />
                            <textarea placeholder="Message..." rows="5"></textarea>
                            <button type="submit">SEND A MESSAGE</button>
                        </form>
                    </div>
                </div>

                {/* Google Map */}
                <div className={styles.mapContainer}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.752145878697!2d108.16210837685611!3d16.078346539190548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218dd119d3767%3A0xbaebe6d5d52f9520!2zNzcgTmd1eeG7hW4gU2luaCBT4bqvYywgSG_DoCBNaW5oLCBMacOqbiBDaGnhu4N1LCDEkMOgIE7hurVuZyA1NTAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1761212623431!5m2!1svi!2s"
                        allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </section>

            <ScrollToTop />
        </>
    );
}