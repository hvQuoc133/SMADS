"use client";
import Image from "next/image";
import styles from "../../styles/HomeHero.module.css";
import Testimonials from "@/components/Testimonials";
import ScrollToTop from "@/components/ScrollToTop";
import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';
import CountUp from "react-countup";
import { useInView } from "framer-motion";
import Agency from "@/components/Agency";
import ActivitiesSection from "@/components/ActivitiesSection";
import viDict from "@/lib/dictionaries/vi.json";
import enDict from "@/lib/dictionaries/en.json";
import { urlFor } from "../../sanity/lib/image";
import HomeHero from "./HomeHero";
import { client } from "../../sanity/lib/client";

export default function HomeContent({ homeData, dict, locale }) {

    const t = homeData || dict?.home;

    // State
    const [homeActivities, setHomeActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch activities Sanity
    useEffect(() => {
        async function fetchHomeActivities() {
            try {
                setLoading(true);
                const query = `*[_type == "activity"] | order(publishedAt desc)[0...3]{
                    _id,
                    title,
                    titleEn,
                    description,
                    descriptionEn,
                    slugVi,
                    slugEn,
                    image {
                        asset->,
                        alt
                    }
                }`;

                const activities = await client.fetch(query);
                setHomeActivities(activities || []);
            } catch (error) {
                console.error('Error fetching home activities:', error);
                setHomeActivities([]);
            } finally {
                setLoading(false);
            }
        }

        fetchHomeActivities();
    }, []);

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

    // Fallback: nếu không có data từ Sanity, dùng component cũ
    if (!homeData) {
        return <HomeHero locale={locale} />;
    }

    // SỬA QUAN TRỌNG: Dùng activities từ Sanity thay vì dict
    const activities = homeActivities.map((item, idx) => ({
        id: item._id || idx + 1,
        title: locale === 'vi' ? item.title : item.titleEn || item.title,
        desc: locale === 'vi' ? item.description : item.descriptionEn || item.description,
        image: item.image ? urlFor(item.image).quality(80).url() : `/images/activities/activity${idx + 1}.jpg`,
        slug: locale === 'vi' ? item.slugVi : item.slugEn || `activity-${idx + 1}`,
        alt: item.image?.alt || (locale === 'vi' ? item.title : item.titleEn || item.title),
    }));

    function StartItem({ end, label }) {
        const ref = useRef(null);
        const isInView = useInView(ref, { once: true });

        return (
            <div className={styles.StartItem}>
                <h2 ref={ref}>
                    {isInView ? <CountUp end={end} duration={2} /> : 0}
                </h2>
                <p>{label}</p>
            </div>
        );
    }

    // Image error handler
    const handleImageError = (e) => {
        e.target.src = "/images/fallback-image.png";
    };

    const getImageUrl = (image) => {
        return image?._ref ? urlFor(image).quality(80).url() : null;
    };

    return (
        <>
            {/* Content 1 - Hero Section */}
            <section className={styles.hero}>
                <div className={styles.overlay}></div>
                <div className={styles.container}>
                    <div className={styles.left} data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
                        <h1 className={styles.title}>
                            {t.hero?.title1}   <br />
                            <span className={styles.highlight}>{t.hero?.highlight}</span>
                        </h1>
                        <p className={styles.description}>
                            {t.hero?.desc}
                        </p>
                        <div className={styles.buttons}>
                            <button className={styles.primaryButton}>{t.hero?.readMore}</button>
                        </div>
                    </div>
                    <div className={styles.right} data-aos="fade-left">
                        <Image
                            src={getImageUrl(t.hero?.image) || "/images/home/slider_img.png"}
                            alt={t.hero?.image?.alt || "Hero Illustration"}
                            width={500}
                            height={400}
                            onError={handleImageError}
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>

            {/* Content 2 - Circle Section */}
            <section className={styles.circleSection}>
                <div className={styles.circleDecor}>
                    <img
                        src="/images/home/dotted_shape.png"
                        alt="Dots background"
                        className={styles.dots}
                        onError={handleImageError}
                    />
                    <img
                        data-aos="fade-left"
                        src="/images/home/circle_shape.png"
                        alt="Circle shape"
                        className={styles.circle}
                        onError={handleImageError}
                    />
                </div>
            </section>

            {/* Content 3 - Startup Section */}
            <img
                src="/images/home/start_shape_bg.png"
                alt="Startup background"
                className={styles.startupBg}
                onError={handleImageError}
            />
            <section className={styles.startupContainer}>
                <div className={styles.startupLeft} data-aos="fade-down-right">
                    <img
                        src={getImageUrl(t.startup?.image) || "/images/home/services_img.png"}
                        alt={t.startup?.image?.alt || "Startup Illustration"}
                        onError={handleImageError}
                        loading="lazy"
                    />
                </div>
                <div className={styles.startupRight} data-aos="fade-down-left">
                    <h1 className={styles.startupTitle}>
                        {t.startup?.title}
                    </h1>
                    <p className={styles.startupDescription}>
                        {t.startup?.desc}
                    </p>
                    <div className={styles.startupBtn}>
                        <button className={styles.startupButton}>{t.startup?.button}</button>
                    </div>
                </div>
            </section>

            {/* Content 4 - Features Section */}
            <section className={styles.featuresSection}>
                <div className={styles.featuresHeader} data-aos="fade-up" data-aos-duration="3000">
                    <p className={styles.featureSubtitle}>{t.features?.subtitle}</p>
                    <h2 className={styles.featureTitle}>{t.features?.title}</h2>
                    <p className={styles.featureDesc}>{t.features?.desc}</p>
                </div>

                <div className={styles.featuresGrid}>
                    {t.features?.items?.map((item, index) => (
                        <div key={index} className={styles.featureCard}>
                            <div className={styles.iconWrap}>
                                <img
                                    src={getImageUrl(item.icon) || `/images/home/features_icon0${index + 1}.png`}
                                    alt={item.icon?.alt || item.title}
                                    onError={handleImageError}
                                    loading="lazy"
                                />
                            </div>
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Content 5 - Stats Section */}
            <section className={styles.parallaxSection}>
                <div className={styles.parallaxOverlay}></div>

                <div className={styles.parallaxContent}>
                    <div className={styles.imageBox} data-aos="fade-up">
                        <img
                            src={getImageUrl(t.stats?.image) || "/images/home/counter_img.png"}
                            alt={t.stats?.image?.alt || "Statistics Visual"}
                            onError={handleImageError}
                            loading="lazy"
                        />
                    </div>

                    <div className={styles.statsBox}>
                        <StartItem end={248} label={t.stats?.happyCustomer} />
                        <StartItem end={39} label={t.stats?.awardWin} />
                        <StartItem end={575} label={t.stats?.projectComplete} />
                    </div>
                </div>
            </section>

            {/* Content 6 - Optimization Section */}
            <section className={styles.optimizationSection}>
                {/* Background image */}
                <div className={styles.backgroundImage}>
                    <img
                        src="/images/home/area_bg.png"
                        alt="Background"
                        onError={handleImageError}
                    />
                </div>

                {/* Main content */}
                <div className={styles.contentWrapper}>
                    {/* Left content */}
                    <div className={styles.leftContenttitleOptimization} data-aos="fade-down">
                        <img
                            src="/images/home/optimize_img.png"
                            alt="Optimization Visual"
                            onError={handleImageError}
                            loading="lazy"
                        />
                    </div>

                    {/* Right content */}
                    <div className={styles.rightContenttitleOptimization} data-aos="fade-up">
                        <div className={styles.titleOptimization}>{t.optimization?.title}</div>
                        <div className={styles.descOptimization}>{t.optimization?.desc}</div>

                        {t.optimization?.items?.map((item, index) => (
                            <div key={index} className={styles.textContent}>
                                <div className={styles.textContent_1}>
                                    <img
                                        src={getImageUrl(item.icon) || `/images/home/optimize_icon0${index + 1}.png`}
                                        alt={item.icon?.alt || item.title}
                                        onError={handleImageError}
                                        loading="lazy"
                                    />
                                    <h4>{item.title}</h4>
                                </div>
                                <p>{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom content */}
                <div className={styles.bottomContent}>
                    <div className={styles.featuresHeader}>
                        <p className={styles.featureSubtitle}>{t.optimization?.clientsSubtitle}</p>
                        <h2 className={styles.featureTitle}>{t.optimization?.clientsTitle}</h2>
                        <Testimonials />
                    </div>
                </div>
            </section>

            {/* Content 7 - Agency Section */}
            <Agency />

            {/* Content 8 - CTA Section */}
            <section className={styles.ctaSection}>
                <img
                    src="/images/home/cta_shape01.png"
                    alt="Shape Left"
                    className={styles.ctaShapeLeft_1}
                    onError={handleImageError}
                />
                <img
                    src="/images/home/cta_shape02.png"
                    alt="Shape Left"
                    className={styles.ctaShapeLeft_2}
                    onError={handleImageError}
                />
                <img
                    src="/images/home/cta_shape03.png"
                    alt="Shape Right"
                    className={styles.ctaShapeRight}
                    onError={handleImageError}
                />
                <div className={styles.ctaContent}>
                    <div className={styles.ctaText}>
                        <h2>{t.cta?.title}</h2>
                        <p>
                            {t.cta?.desc}
                        </p>
                    </div>
                    <div className={styles.ctaButton}>
                        <button>{t.cta?.button}</button>
                    </div>
                </div>
            </section>

            {/* Content 9 - Activities Section */}
            {!loading && (
                <ActivitiesSection dict={dict} activities={activities} locale={locale} />
            )}

            <ScrollToTop />
        </>
    );
}