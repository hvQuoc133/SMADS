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

export default function HomeHero({ locale }) {  // Just pass locale as a prop
  const dict = locale === "vi" ? viDict : enDict;
  const t = dict.home;

  const activities = (dict.activities?.list || []).map((item, idx) => ({
    ...item,
    id: idx + 1,
    image: item.image
      ? (item.image.startsWith("/") ? item.image : "/" + item.image)
      : `/images/activities/activity${idx + 1}.jpg`,
    slug: item.slug || `activity-${idx + 1}`,
  }));

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

  return (
    <>
      {/* Content 1 */}
      <section className={styles.hero}>
        <div className={styles.overlay}></div>
        <div className={styles.container}>
          <div className={styles.left} data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
            <h1 className={styles.title}>
              {t.hero.title1}   <br />
              <span className={styles.highlight}>{t.hero.highlight}</span>
            </h1>
            <p className={styles.description}>
              {t.hero.desc}
            </p>
            <div className={styles.buttons}>
              <button className={styles.primaryButton}>{t.hero.readMore}</button>
            </div>
          </div>
          <div className={styles.right} data-aos="fade-left">
            <Image
              src="/images/home/slider_img.png"
              alt="Hero Illustration"
              width={500}
              height={400}
            />
          </div>
        </div>
      </section>

      {/* Content 2 */}
      <section className={styles.circleSection}>
        <div className={styles.circleDecor}>
          <img
            src="/images/home/dotted_shape.png"
            alt="Dots background"
            className={styles.dots}
          />
          <img data-aos="fade-left"
            src="/images/home/circle_shape.png"
            alt="Circle shape"
            className={styles.circle}
          />
        </div>
      </section>

      {/* Content 3 */}
      <img
        src="/images/home/start_shape_bg.png"
        alt="Hero Illustration"
        className={styles.startupBg}
      />
      <section className={styles.startupContainer}>
        <div className={styles.startupLeft} data-aos="fade-down-right">

          <img
            src="/images/home/services_img.png"
            alt="Hero Illustration"
          />
        </div>
        <div className={styles.startupRight} data-aos="fade-down-left">
          <h1 className={styles.startupTitle}>
            {t.startup.title}
          </h1>
          <p className={styles.startupDescription}>
            {t.startup.desc}
          </p>
          <div className={styles.startupBtn}>
            <button className={styles.startupButton}>{t.startup.button}</button>
          </div>
        </div>
      </section>

      {/* Content 4  */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresHeader} data-aos="fade-up" data-aos-duration="3000">
          <p className={styles.featureSubtitle}>{t.features.subtitle}</p>
          <h2 className={styles.featureTitle}>{t.features.title}</h2>
          <p className={styles.featureDesc}>{t.features.desc}</p>
        </div>

        <div className={styles.featuresGrid}>
          {[
            { icon: "/images/home/features_icon01.png", title: t.features.items[0].title },
            { icon: "/images/home/features_icon02.png", title: t.features.items[1].title },
            { icon: "/images/home/features_icon03.png", title: t.features.items[2].title },
            { icon: "/images/home/features_icon04.png", title: t.features.items[3].title },
            { icon: "/images/home/features_icon05.png", title: t.features.items[4].title },
            { icon: "/images/home/features_icon06.png", title: t.features.items[5].title },
          ].map((item, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.iconWrap}>
                <img src={item.icon} alt={item.title} />
              </div>
              <h3>{item.title}</h3>
              <p>{t.features.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Content 5 */}
      <section className={styles.parallaxSection}>
        <div className={styles.parallaxOverlay}></div>

        <div className={styles.parallaxContent}>
          <div className={styles.imageBox} data-aos="fade-up">
            <img src="/images/home/counter_img.png" alt="Parallax Visual" />
          </div>

          <div className={styles.statsBox}>
            <StartItem end={248} label={t.stats.happyCustomer} />
            <StartItem end={39} label={t.stats.awardWin} />
            <StartItem end={575} label={t.stats.projectComplete} />
          </div>
        </div>
      </section>

      {/* Content 6 */}
      <section className={styles.optimizationSection}>
        {/* Background image */}
        <div className={styles.backgroundImage}>
          <img src="/images/home/area_bg.png" alt="Background" />
        </div>

        {/* Main content */}
        <div className={styles.contentWrapper}>
          {/* Left content */}
          <div className={styles.leftContenttitleOptimization} data-aos="fade-down">
            <img src="/images/home/optimize_img.png" alt="Left Visual" />
          </div>

          {/* Right content */}
          <div className={styles.rightContenttitleOptimization} data-aos="fade-up">
            <div className={styles.titleOptimization}>{t.optimization.title}</div>
            <div className={styles.descOptimization}>{t.optimization.desc}</div>

            {t.optimization.items.map((item, index) => (
              <div key={index} className={styles.textContent}>
                <div className={styles.textContent_1}>
                  <img
                    src={`/images/home/optimize_icon0${index + 1}.png`}
                    alt={item.title}
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
            <p className={styles.featureSubtitle}>{t.optimization.clientsSubtitle}</p>
            <h2 className={styles.featureTitle}>{t.optimization.clientsTitle}</h2>
            <Testimonials />
          </div>
        </div>
      </section>


      {/* Content 7 */}
      <Agency />

      {/* Content 8 */}
      <section className={styles.ctaSection}>
        <img src="/images/home/cta_shape01.png" alt="Shape Left" className={styles.ctaShapeLeft_1} />
        <img src="/images/home/cta_shape02.png" alt="Shape Left" className={styles.ctaShapeLeft_2} />
        <img src="/images/home/cta_shape03.png" alt="Shape Right" className={styles.ctaShapeRight} />
        <div className={styles.ctaContent}>
          <div className={styles.ctaText}>
            <h2>{t.cta.title}</h2>
            <p>
              {t.cta.desc}
            </p>
          </div>
          <div className={styles.ctaButton}>
            <button>{t.cta.button}</button>
          </div>
        </div>
      </section>

      {/* Content 9 */}
      <ActivitiesSection dict={dict} activities={activities} locale={locale} />
      <ScrollToTop />
    </>
  );
}
