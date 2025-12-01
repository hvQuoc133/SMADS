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
import { PortableText } from "@portabletext/react";
import portableTextHero from "@/components/portableTextHero";
import Link from "next/link";

export default function HomeContent({ homeData, dict, locale }) {

    const t = homeData || dict?.home;

    // State
    const [homeActivities, setHomeActivities] = useState([]);
    const lines = homeData?.startup?.lines || [];
    const [activeIndex, setActiveIndex] = useState(0);
    const [currentImage, setCurrentImage] = useState(null);
    const [currentAlt, setCurrentAlt] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (homeData) {
            setLoading(false);
        }
    }, [homeData]);

    // Update current image when lines or homeData change
    useEffect(() => {
        if (lines.length > 0) {
            const firstLine = lines[0];
            const img = firstLine.image && firstLine.image.asset
                ? urlFor(firstLine.image).url()
                : "/images/home/services_img.png";

            setCurrentImage(img);
            setCurrentAlt(firstLine.image?.alt || homeData?.startup?.title);
        }
    }, [lines, homeData]);

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

    // Fallback
    if (!homeData) {
        return <HomeHero locale={locale} />;
    }

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
        return image?.asset?._ref
            ? urlFor(image).quality(80).url()
            : null;
    };


    useEffect(() => {
        if (typeof window !== "undefined" && window.AOS) {
            setTimeout(() => {
                window.AOS.refresh();
            }, 100);
        }
    }, [locale]);


    return (
        <>
            {/* Content 1 - Hero Section */}
            <section className={styles.hero}>
                <div className={styles.overlay}></div>
                <div className={styles.container}>
                    <div className={styles.left} data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
                        <h1 className={styles.title}>
                            {t.hero?.title1}   <br />
                            <span className={`${styles.highlight} ${styles[t.hero?.highlightFontSize]}`}>
                                {t.hero?.highlight}
                            </span>

                        </h1>
                        <div className={styles.description}>
                            <PortableText value={t.hero?.desc} components={portableTextHero} />
                        </div>
                        <div className={styles.buttons}>
                            <Link href={t.hero?.readMore?.link || "#"}>
                                <button className={styles.primaryButton}>
                                    {t.hero?.readMore?.text || "Đọc thêm"}
                                </button>
                            </Link>
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
                {/* Left image */}
                <div className={styles.startupLeft} data-aos="fade-down-right">
                    {currentImage ? (
                        <div className={styles.startupImageWrapper}>
                            <Image
                                src={currentImage}
                                alt={currentAlt}
                                width={750}
                                height={450}
                                className={styles.startupImage}
                                loading="lazy"
                            />
                        </div>
                    ) : (
                        <img
                            src="/images/home/services_img.png"
                            alt="Startup Illustration"
                            loading="lazy"
                        />
                    )}
                </div>

                {/* Right content */}
                <div className={styles.startupRight} data-aos="fade-down-left">
                    <h2 className={styles.startupTitle}>
                        {homeData?.startup?.title}
                    </h2>
                    <div className={styles.startupDescription}>
                        {lines.map((line, index) => (
                            <p
                                key={index}
                                onClick={() => {
                                    const img = line.image && line.image.asset
                                        ? urlFor(line.image).url()
                                        : "/images/home/services_img.png"; // ảnh fallback

                                    setCurrentImage(img);
                                    setCurrentAlt(line.image?.alt || homeData?.startup?.title);
                                    setActiveIndex(index);
                                }}
                                className={`${styles.clickableLine} ${index === activeIndex ? styles.active : ""}`}
                            >
                                {line.text}
                            </p>

                        ))}
                    </div>
                    <div className={styles.startupBtn}>
                        <Link href={homeData?.startup?.button?.link || "#"}>
                            <button className={styles.startupButton}>
                                {homeData?.startup?.button?.text || "Xem thêm"}
                            </button>
                        </Link>
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
                                    <Image
                                        src={item.icon ? urlFor(item.icon).width(80).height(80).url() : "/images/home/optimize_icon0.png"}
                                        alt={item.icon?.alt || item.title}
                                        width={80}
                                        height={80}
                                        onError={handleImageError}
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
                        <Testimonials locale={locale} />
                    </div>
                </div>
            </section>

            {/* Content 7 - Agency Section */}
            <Agency locale={locale} />

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