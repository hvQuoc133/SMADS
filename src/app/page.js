import Image from "next/image";
import styles from "../styles/HomeHero.module.css";

export default function HomeHero() {
  return (
    <>
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <div className={styles.left}>
          <h1 className={styles.title}>
            Digital Agency behind <span className={styles.highlight}>Startup Business</span>
          </h1>
          <p className={styles.description}>
            There are many variations of passages of Lorem Ipsum available but at the
            majority have suffered alteration in that some form by injected humour that
            randomised words.
          </p>
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
    </section>
    <h1>
      There are many variations of passages of Lorem Ipsum available but at the
            majority have suffered alteration in that some form by injected humour that
            randomised words.
    </h1>
    <h1>
      There are many variations of passages of Lorem Ipsum available but at the
            majority have suffered alteration in that some form by injected humour that
            randomised words.
    </h1>
    <h1>
      There are many variations of passages of Lorem Ipsum available but at the
            majority have suffered alteration in that some form by injected humour that
            randomised words.
    </h1>
    <h1>
      There are many variations of passages of Lorem Ipsum available but at the
            majority have suffered alteration in that some form by injected humour that
            randomised words.
    </h1>
    <h1>
      There are many variations of passages of Lorem Ipsum available but at the
            majority have suffered alteration in that some form by injected humour that
            randomised words.
    </h1>
    <h1>
      There are many variations of passages of Lorem Ipsum available but at the
            majority have suffered alteration in that some form by injected humour that
            randomised words.
    </h1>
    <h1>
      There are many variations of passages of Lorem Ipsum available but at the
            majority have suffered alteration in that some form by injected humour that
            randomised words.
    </h1>
    <h1>
      There are many variations of passages of Lorem Ipsum available but at the
            majority have suffered alteration in that some form by injected humour that
            randomised words.
    </h1>
    </>
  );
}
