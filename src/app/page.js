import Image from "next/image";
import styles from "../styles/HomeHero.module.css";

export default function HomeHero() {
  return (
    <>
      {/* Content 1 */}
      <section className={styles.hero}>
        <div className={styles.overlay}></div>
        <div className={styles.container}>
          <div className={styles.left}>
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
          <div className={styles.right}>
            <Image
              src="/images/home/slider_img.png"
              alt="Hero Illustration"
              width={500}
              height={400}
            />
          </div>
        </div>
        <div className={styles.heroWave} aria-hidden="true">
          <svg viewBox="0 0 1440 150" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C220,120 420,0 720,40 C1020,80 1220,20 1440,80 L1440 150 L0 150 Z" fill="#ffffff" />
          </svg>
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
          <img
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
        <div className={styles.startupLeft}>

          <img
            src="/images/home/services_img.png"
            alt="Hero Illustration"
          />
        </div>
        <div className={styles.startupRight}>
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
        <div className={styles.featuresHeader}>
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
          <div className={styles.imageBox}>
            <img src="/images/home/counter_img.png" alt="Parallax Visual" />
          </div>

          <div className={styles.statsBox}>
            <div className={styles.statItem}>
              <h2>248</h2>
              <p>Happy Customer</p>
            </div>
            <div className={styles.statItem}>
              <h2>39</h2>
              <p>Award Win</p>
            </div>
            <div className={styles.statItem}>
              <h2>575</h2>
              <p>Project Complete</p>
            </div>
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
          <div className={styles.leftContenttitleOptimization}>
            <img src="/images/home/optimize_img.png" alt="Left Visual" />
          </div>
          {/* Right content*/}
          <div className={styles.rightContenttitleOptimization}>
            <div className={styles.titleOptimization}>Spend Optimization Our Software easily</div>
            <div className={styles.descOptimization}>There are many variations of passages of Lorem Ipsum
              available but the majority have suffered alteration in that injected. There are many that
              variations of passages.There are many variations of passages of Lorem Ipsum available but
              the majority have suffered.</div>
            <div className={styles.textContent}>
              <h3>Get insight only our app</h3>
              <p>There are many variations of passages of Lorem Ipsum available but at the majority have suffered alteration in that injected.</p>
            </div>
            <div className={styles.textContent}>
              <h3>Get insight only our app</h3>
              <p>There are many variations of passages of Lorem Ipsum available but at the majority have suffered alteration in that injected.</p>
            </div>
          </div>
        </div>
        {/* Bottom content */}
        <div className={styles.bottomContent}>
          <div className={styles.featuresHeader}>
            <p className={styles.featureSubtitle}>Features</p>
            <h2 className={styles.featureTitle}>Some Of The Best Features</h2>
            <p className={styles.featureDesc}>
              There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration
              in some form by injected humour or randomised words which don't look even slightly believable.
            </p>
          </div>
        </div>
      </section>

    </>
  );
}
