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

export default function HomeHero() {

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


  // Component for individual statistic item
  function StatItem({ end, label }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
      <div className={styles.statItem}>
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
              Digital Agency behind  <br />
              <span className={styles.highlight}>Startup Business</span>
            </h1>
            <p className={styles.description}>
              There are many variations of passages of Lorem Ipsum available but at the
              majority have suffered alteration in that some form by injected humour that
              randomised words.
            </p>
            <div className={styles.buttons}>
              <button className={styles.primaryButton}>Read More</button>
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
            Start to end <br />
            app development agency
          </h1>
          <p className={styles.startupDescription}>
            There are many variations of passages of Lorem Ipsum available but the majority have and suffered alteration in that
            some form by injected humour or randomised words which the don’t look even slightly believable. If you are going a to
            use a passage of Lorem Ipsum you need to be sure there isn’t anything embarrassing.
            <br />
            <br />
            There are many variations of passages of Lorem Ipsum available but the majority have very suffered alteration in that some
            form by injected humour or randomised words which the don’t look even slightly believable.
          </p>
          <div className={styles.startupBtn}>
            <button className={styles.startupButton}>More About Us</button>
          </div>
        </div>
      </section>

      {/* Content 4  */}
      <section className={styles.featuresSection}>
        <div className={styles.featuresHeader} data-aos="fade-up" data-aos-duration="3000">
          <p className={styles.featureSubtitle}>Features</p>
          <h2 className={styles.featureTitle}>Some Of The Best Features</h2>
          <p className={styles.featureDesc}>
            There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration
            in some form by injected humour or randomised words which don't look even slightly believable.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {[
            { icon: "/images/home/features_icon01.png", title: "Expand Your Reach" },
            { icon: "/images/home/features_icon02.png", title: "Higher Growth Rate" },
            { icon: "/images/home/features_icon03.png", title: "Manage Your Customer" },
            { icon: "/images/home/features_icon04.png", title: "Book Your Provider" },
            { icon: "/images/home/features_icon05.png", title: "Market Analysis" },
            { icon: "/images/home/features_icon06.png", title: "Creative Web Solution" },
          ].map((item, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.iconWrap}>
                <img src={item.icon} alt={item.title} />
              </div>
              <h3>{item.title}</h3>
              <p>
                There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration
                in that injected.
              </p>
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
            <StatItem end={248} label="Happy Customer" />
            <StatItem end={39} label="Award Win" />
            <StatItem end={575} label="Project Complete" />
          </div>
        </div>
      </section>

      {/* Content 6 */}
      <section className={styles.optimizationSection}>
        {/* Background image */}
        <div className={styles.backgroundImage}>
          <img src="/images/home/area_bg.png" alt="Background" />
        </div>
        {/* Main content*/}
        <div className={styles.contentWrapper}>
          {/* Left content*/}
          <div className={styles.leftContenttitleOptimization} data-aos="fade-down">
            <img src="/images/home/optimize_img.png" alt="Left Visual" />
          </div>
          {/* Right content*/}
          <div className={styles.rightContenttitleOptimization} data-aos="fade-up">
            <div className={styles.titleOptimization}>Spend Optimization Our Software easily</div>
            <div className={styles.descOptimization}>There are many variations of passages of Lorem Ipsum
              available but the majority have suffered alteration in that injected. There are many that
              variations of passages.There are many variations of passages of Lorem Ipsum available but
              the majority have suffered.</div>
            <div className={styles.textContent}>
              <div className={styles.textContent_1}>
                <img src="/images/home/optimize_icon01.png" alt="Left Visual" />
                <h4>Get insight only our app</h4>
              </div>
              <p>There are many variations of passages of Lorem Ipsum available but at the majority have suffered alteration in that injected.</p>
            </div>
            <div className={styles.textContent}>
              <div className={styles.textContent_1}>
                <img src="/images/home/optimize_icon02.png" alt="Left Visual" />
                <h4>Get insight only our app</h4>
              </div>
              <p>There are many variations of passages of Lorem Ipsum available but at the majority have suffered alteration in that injected.</p>
            </div>
          </div>
        </div>
        {/* Bottom content */}
        <div className={styles.bottomContent}>
          <div className={styles.featuresHeader}>
            <p className={styles.featureSubtitle}>Our Clients</p>
            <h2 className={styles.featureTitle}>Testimonials</h2>
            < Testimonials />
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
            <h2>We help to grow creativity<br />that Break rules</h2>
            <p>
              There are many variations of passages of Lorem Ipsum available but the our majority have suffered alteration in that injected. There are many variations of passages of Lorem Ipsum available.
            </p>
          </div>
          <div className={styles.ctaButton}>
            <button>Get Started</button>
          </div>
        </div>
      </section>

      {/* Content 9 */}
      <section className={styles.newsSection}>
        <div className={styles.newsHeader}>
          <p className={styles.newsSubtitle}>Read Our</p>
          <h2 className={styles.newsTitle}>Latest News</h2>
          <p className={styles.newsDesc}>
            There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration some randomised words which don't look even slightly believable.
          </p>
        </div>

        <div className={styles.newsCards}>
          <div className={styles.newsCard}>
            <img src="/images/home/news01.jpg" alt="News 1" />
            <h3>How to more productive using sticky notes</h3>
            <p>There are many variations of passages of at Lorem Ipsum available but the majority the have suffered dummy is</p>
            <div className={styles.newsInfo}>
              <span>Digee</span> | <span>March 28, 2019</span>
            </div>
          </div>

          <div className={styles.newsCard}>
            <img src="/images/home/news02.jpg" alt="News 2" />
            <h3>How to become a best sale marketer in a years</h3>
            <p>There are many variations of passages of at Lorem Ipsum available but the majority the have suffered dummy is</p>
            <div className={styles.newsInfo}>
              <span>Digee</span> | <span>April 18, 2019</span>
            </div>
          </div>

          <div className={styles.newsCard}>
            <img src="/images/home/news03.jpg" alt="News 3" />
            <h3>We are nominated to Agency of the year.</h3>
            <p>There are many variations of passages of at Lorem Ipsum available but the majority the have suffered dummy is</p>
            <div className={styles.newsInfo}>
              <span>Digee</span> | <span>April 28, 2019</span>
            </div>
          </div>
        </div>
      </section>
      <ScrollToTop />
    </>
  );
}
