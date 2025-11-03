"use client";
import React from "react";
import styles from "../styles/Agency.module.css";

export default function Agency({ dict }) {
    if (!dict?.agency) return null;
    const a = dict.agency;

    return (
        <section className={styles.agencySection}>
            <div className={styles.agencyWrapper}>
                <div className={styles.agencyContent}>
                    {/* LEFT TEXT */}
                    <div className={styles.agencyText} data-aos="fade-left">
                        <h2>
                            {a.titleLine1} <br />
                            <span>{a.titleLine2}</span>
                            <br /> {a.titleLine3}
                        </h2>
                        <p>{a.description}</p>

                        <div className={styles.agencySkills}>
                            {a.skills.map((skill, idx) => (
                                <div key={idx} className={styles.agencySkill}>
                                    <div
                                        className={`${styles.agencyCircle} ${styles[skill.color]}`}
                                    >
                                        {skill.percent}%
                                    </div>
                                    <span>{skill.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className={styles.agencyImage} data-aos="fade-right">
                        <img
                            src="/images/home/skill_img.png"
                            alt={a.imageAlt}
                            width={500}
                            height={400}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
