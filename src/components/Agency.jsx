import React from 'react';
import styles from '../styles/Agency.module.css';

export default function Agency({ title, parent }) {
    return (
        <section className={styles.agencySection}>
            <div className={styles.agencyWrapper}>
                <div className={styles.agencyContent}>
                    {/* LEFT TEXT */}
                    <div className={styles.agencyText} data-aos="fade-left">
                        <h2>
                            Creative Agency <br />
                            <span>From New York - USA</span>
                            <br /> in 30 years.
                        </h2>
                        <p>
                            There are many variations of passages of Lorem Ipsum available but
                            the majority have suffered alteration in that injected. There are
                            many variations of passages of Lorem Ipsum available.
                        </p>

                        <div className={styles.agencySkills}>
                            <div className={styles.agencySkill}>
                                <div className={`${styles.agencyCircle} ${styles.purple}`}>69%</div>
                                <span>WordPress Developer</span>
                            </div>
                            <div className={styles.agencySkill}>
                                <div className={`${styles.agencyCircle} ${styles.red}`}>85%</div>
                                <span>Apps Developer</span>
                            </div>
                            <div className={styles.agencySkill}>
                                <div className={`${styles.agencyCircle} ${styles.green}`}>76%</div>
                                <span>Android Apps</span>
                            </div>
                            <div className={styles.agencySkill}>
                                <div className={`${styles.agencyCircle} ${styles.blue}`}>80%</div>
                                <span>Apps Developer</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className={styles.agencyImage} data-aos="fade-right">
                        <img
                            src="/images/home/skill_img.png"
                            alt="Creative Agency Illustration"
                            width={500}
                            height={400}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
