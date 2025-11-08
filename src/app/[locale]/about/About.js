"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // ← Thêm import này
import styles from "../../../styles/About.module.css";
import BgAllPage from "../../../components/BgAllPage";
import ScrollToTop from "../../../components/ScrollToTop";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Agency from "../../../components/Agency";
import AOS from "aos";
import "aos/dist/aos.css";
import { client } from "../../../sanity/lib/client";
import { urlFor } from "../../../sanity/lib/image";

// Fetch data từ Sanity
async function getAboutData(locale) {
    const query = `*[_type == "about" && language == $locale][0]{
    pageTitle,
    section1 {
      title,
      p1,
      p2,
      readMore,
      image
    },
    section2 {
      title,
      desc,
      list,
      image
    }
  }`;

    return await client.fetch(query, { locale });
}

export default function About({ dict }) { // ← Bỏ params ở đây
    const params = useParams(); // ← Lấy params từ hook
    const { locale } = params; // ← Destructure từ useParams()
    const [aboutData, setAboutData] = useState(null);
    const a = dict.about;

    useEffect(() => {
        // Fetch data từ Sanity
        const fetchAboutData = async () => {
            const data = await getAboutData(locale);
            setAboutData(data);
        };

        fetchAboutData();

        // Phần AOS của bạn (giữ nguyên)
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
    }, [locale]);

    // Fallback data: nếu Sanity không có data thì dùng dict
    const displayData = {
        pageTitle: aboutData?.pageTitle || a.pageTitle,
        section1: {
            title: aboutData?.section1?.title || a.section1.title,
            p1: aboutData?.section1?.p1 || a.section1.p1,
            p2: aboutData?.section1?.p2 || a.section1.p2,
            readMore: aboutData?.section1?.readMore || a.section1.readMore,
            image: aboutData?.section1?.image
        },
        section2: {
            title: aboutData?.section2?.title || a.section2.title,
            desc: aboutData?.section2?.desc || a.section2.desc,
            list: aboutData?.section2?.list || a.section2.list,
            image: aboutData?.section2?.image
        }
    };

    // Hiển thị loading khi chưa có data
    if (!aboutData && !dict) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <BgAllPage title={displayData.pageTitle} parent="SMADS" />

            {/* Section 1 */}
            <section className={styles.content}>
                <div className={styles.text} data-aos="fade-up">
                    <h2>{displayData.section1.title}</h2>
                    <p>{displayData.section1.p1}</p>
                    <p>{displayData.section1.p2}</p>
                    <button className={styles.readMore}>
                        {displayData.section1.readMore}
                    </button>
                </div>
                <div className={styles.image} data-aos="fade-left">
                    <img
                        src={displayData.section1.image ? urlFor(displayData.section1.image).url() : "/images/about/da_img.png"}
                        alt="About Illustration"
                    />
                </div>
            </section>

            {/* Section 2 */}
            <section className={styles.bestMatchSection}>
                <div className={styles.container}>
                    <div className={styles.textBox} data-aos="flip-left">
                        <h2>{displayData.section2.title}</h2>
                        <p>{displayData.section2.desc}</p>
                        <ul className={styles.featureList}>
                            {displayData.section2.list.map((item, idx) => (
                                <li key={idx}>
                                    <i className="fa-solid fa-check"></i> {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.imageBox} data-aos="flip-right">
                        <img
                            src={displayData.section2.image ? urlFor(displayData.section2.image).url() : "/images/about/best_match.png"}
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