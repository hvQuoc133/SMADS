"use client";

import { useEffect } from "react";
import BgAllPage from "../../../components/BgAllPage";
import ScrollToTop from "../../../components/ScrollToTop";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "../../../styles/Contact.module.css";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Contact({ dict }) {
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

  const c = dict.contact;
  const t = c.toast;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !subject || !message) {
      toast.error(t.fillAll);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error(t.invalidEmail);
      return;
    }

    try {
      const verify = await fetch("/api/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const verifyResult = await verify.json();
      if (!verifyResult.valid) {
        toast.error(t.emailNotFound);
        return;
      }
    } catch (err) {
      toast.error(t.checkFail);
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
        toast.success(t.success);
        form.reset();
      } else {
        toast.error(t.fail + data.error);
      }
    } catch (err) {
      toast.error(t.sendError);
    }
  };

  return (
    <>
      <BgAllPage title={c.pageTitle} parent="SMADS" />
      <section className={styles.contactSection}>
        <div
          className={styles.contactHeader}
          data-aos="fade-up"
          data-aos-anchor-placement="bottom-bottom"
        >
          <h5>{c.getInTouch}</h5>
          <h2>{c.subTitle}</h2>
          <p>{c.description}</p>
        </div>

        <div className={styles.contactContainer}>
          <div
            className={styles.contactInfo}
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            <h3>{c.getInTouch}</h3>
            <p>{c.description}</p>

            <ul>
              <li>{c.address}</li>
              <li>{c.email}</li>
              <li>{c.phone}</li>
            </ul>

            <div className={styles.socialIcons}>
              <a href="#" className={styles.socialFb}>
                <FaFacebookF />
              </a>
              <a href="#" className={styles.socialX}>
                <FaXTwitter />
              </a>
              <a href="#" className={styles.socialTele}>
                <FaTelegramPlane />
              </a>
              <a href="#" className={styles.socialIg}>
                <FaInstagram />
              </a>
            </div>
          </div>

          <div className={styles.contactForm} data-aos="zoom-in">
            <form onSubmit={handleSubmit}>
              <div className={styles.row}>
                <input
                  type="text"
                  name="name"
                  placeholder={c.form.name}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder={c.form.email}
                  required
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder={c.form.subject}
                required
              />
              <textarea
                name="message"
                placeholder={c.form.message}
                rows="5"
                required
              ></textarea>
              <button type="submit">{c.form.submit}</button>
            </form>
          </div>
        </div>

        <div className={styles.mapContainer}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.752145878697!2d108.16210837685611!3d16.078346539190548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218dd119d3767%3A0xbaebe6d5d52f9520!2zNzcgTmd1eeG7hW4gU2luaCBT4bqvYywgSG_DoCBNaW5oLCBMacOqbiBDaGnhu4N1LCDEkMOgIE7hurVuZyA1NTAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1761212623431!5m2!1svi!2s"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      <ScrollToTop />
    </>
  );
}
