"use client";

import { useEffect, useState } from "react";
import BgAllPage from "../../../components/BgAllPage";
import ScrollToTop from "../../../components/ScrollToTop";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "../../../styles/Contact.module.css";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import { toast } from "react-toastify";
import { urlFor } from "../../../sanity/lib/image";
import ContactFallback from "./Contact";

export default function ContactContent({ pageData, dict, locale }) {
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

    // Fallback nếu không có data từ Sanity
    if (!pageData) {
        return <ContactFallback dict={dict} />;
    }

    const c = pageData.contactInfo || {};
    const form = pageData.contactForm || {};
    const toastMsgs = pageData.toast || {};
    const social = pageData.socialLinks || {};
    const map = pageData.map || {};

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formElement = e.target;

        const name = formElement.name.value.trim();
        const email = formElement.email.value.trim();
        const subject = formElement.subject.value.trim();
        const message = formElement.message.value.trim();

        if (!name || !email || !subject || !message) {
            toast.error(toastMsgs.fillAll || "Vui lòng điền đầy đủ thông tin");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error(toastMsgs.invalidEmail || "Email không hợp lệ");
            return;
        }

        setIsLoading(true);

        // Verify email existence
        try {
            const verify = await fetch("/api/verify-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const verifyResult = await verify.json();
            if (!verifyResult.valid) {
                toast.error(toastMsgs.emailNotFound || "Email không tồn tại");
                setIsLoading(false);
                return;
            }
        } catch (err) {
            toast.error(toastMsgs.checkFail || "Kiểm tra email thất bại");
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/send-contact-mail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, subject, message }),
            });

            const data = await res.json();

            if (data.success) {
                toast.success(toastMsgs.success || "Gửi thành công!");
                formElement.reset();
            } else {
                toast.error((toastMsgs.fail || "Gửi thất bại: ") + data.error);
            }
        } catch (err) {
            toast.error(toastMsgs.sendError || "Lỗi gửi email");
        } finally {
            setIsLoading(false);
        }
    };

    // Image error handler
    const handleImageError = (e) => {
        e.target.src = "/images/fallback-image.png";
    };

    return (
        <>
            <BgAllPage
                title={pageData.pageTitle}
                parent="SMADS"
            />

            <section className={styles.contactSection}>
                <div
                    className={styles.contactHeader}
                    data-aos="fade-up"
                    data-aos-anchor-placement="bottom-bottom"
                >
                    <h5>{c.getInTouch}</h5>
                    <h2>{c.subTitle}</h2>
                </div>

                <div className={styles.contactContainer}>
                    <div
                        className={styles.contactInfo}
                        data-aos="fade-up"
                        data-aos-duration="3000"
                    >
                        <h3>{c.titleForm}</h3>
                        <p>{c.description}</p>

                        <ul>
                            <li>
                                <FaMapMarkerAlt className={styles.infoIcon} />
                                {c.address}
                            </li>
                            <li>
                                <FaEnvelope className={styles.infoIcon} />
                                {c.email}
                            </li>
                            <li>
                                <FaPhone className={styles.infoIcon} />
                                {c.phone}
                            </li>
                        </ul>

                        <div className={styles.socialIcons}>
                            {social.facebook && (
                                <a href={social.facebook} target="_blank" rel="noopener noreferrer" className={styles.socialFb}>
                                    <FaFacebookF />
                                </a>
                            )}
                            {social.twitter && (
                                <a href={social.twitter} target="_blank" rel="noopener noreferrer" className={styles.socialX}>
                                    <FaXTwitter />
                                </a>
                            )}
                            {social.instagram && (
                                <a href={social.instagram} target="_blank" rel="noopener noreferrer" className={styles.socialIg}>
                                    <FaInstagram />
                                </a>
                            )}
                            {social.telegram && (
                                <a href={social.telegram} target="_blank" rel="noopener noreferrer" className={styles.socialTele}>
                                    <FaTelegramPlane />
                                </a>
                            )}
                        </div>
                    </div>

                    <div className={styles.contactForm} data-aos="zoom-in">
                        <form onSubmit={handleSubmit}>
                            <div className={styles.row}>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder={form.name}
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder={form.email}
                                    required
                                />
                            </div>
                            <input
                                type="text"
                                name="subject"
                                placeholder={form.subject}
                                required
                            />
                            <textarea
                                name="message"
                                placeholder={form.message}
                                rows="5"
                                required
                            ></textarea>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={styles.submitBtn}
                            >
                                {isLoading ? (
                                    <>
                                        <span className={styles.loader}></span>
                                        {form.sending || "Đang gửi..."}
                                    </>
                                ) : (
                                    form.submit
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                <div className={styles.mapContainer}>
                    <iframe
                        src={map.embedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.752145878697!2d108.16210837685611!3d16.078346539190548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218dd119d3767%3A0xbaebe6d5d52f9520!2zNzcgTmd1eeG7hW4gU2luaCBT4bqvYywgSG_DoCBNaW5oLCBMacOqbiBDaGnhu4N1LCDEkMOgIE7hurVuZyA1NTAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1761212623431!5m2!1svi!2s"}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={map.mapTitle || "SMADS Location"}
                    ></iframe>
                </div>
            </section>

            <ScrollToTop />
        </>
    );
}