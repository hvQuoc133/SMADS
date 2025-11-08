"use client";

import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import styles from "../styles/FloatingContact.module.css";

export default function FloatingContact() {
    return (
        <div className={styles.floatingBar} data-aos="fade-up"
            data-aos-anchor-placement="bottom-bottom">
            {/* Phone */}
            <Link href="tel:0775779266" className={`${styles.icon} ${styles.phone}`} aria-label="Phone">
                <FaPhoneAlt />
            </Link>

            {/* WhatsApp */}
            <Link
                href="https://wa.me/84775779266"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.icon} ${styles.whatsapp}`}
                aria-label="WhatsApp"
            >
                <FaWhatsapp />
            </Link>

            {/* Zalo */}
            <Link
                href="https://zalo.me/0775779266"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.icon} ${styles.zalo}`}
                aria-label="Zalo"
            >
                <span className={styles.zaloText}>Zalo</span>
            </Link>
        </div>
    );
}
