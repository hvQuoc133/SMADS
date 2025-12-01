"use client";
import React, { useState, useEffect, useMemo } from "react";
import styles from "../styles/Agency.module.css";
import { client } from "../sanity/lib/client";
import { urlFor } from "../sanity/lib/image";

export default function Agency({ locale = 'vi' }) {
    const [agencyData, setAgencyData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch agency data Sanity
    useEffect(() => {
        async function fetchAgencyData() {
            try {
                setLoading(true);
                const query = `*[_type == "agency"][0]{
                    titleLine1Vi,
                    titleLine1En,
                    titleLine2Vi,
                    titleLine2En,
                    descriptionVi,
                    descriptionEn,
                    skills[] {
                        labelVi,
                        labelEn,
                        percent,
                        color
                    },
                    image {
                        asset->,
                        altVi,
                        altEn
                    }
                }`;

                const data = await client.fetch(query, { lang: locale });
                setAgencyData(data);
            } catch (error) {
                console.error('Error fetching agency data:', error);
                setAgencyData(null);
            } finally {
                setLoading(false);
            }
        }

        fetchAgencyData();
    }, [locale]);

    // Transform data Sanity
    const transformedData = useMemo(() => {
        if (agencyData) {
            return {
                titleLine1: locale === 'vi' ? agencyData.titleLine1Vi : agencyData.titleLine1En,
                titleLine2: locale === 'vi' ? agencyData.titleLine2Vi : agencyData.titleLine2En,
                description: locale === 'vi' ? agencyData.descriptionVi : agencyData.descriptionEn,
                skills: agencyData.skills?.map(skill => ({
                    label: locale === 'vi' ? skill.labelVi : skill.labelEn,
                    percent: skill.percent,
                    color: skill.color
                })) || [],
                image: agencyData.image,
                imageAlt: locale === 'vi' ? agencyData.image?.altVi : agencyData.image?.altEn
            };
        }
        return null;
    }, [agencyData, locale]);

    // Fallback data
    const fallbackData = {
        titleLine1: "We're a full-service",
        titleLine2: "digital agency",
        description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
        skills: [
            { label: "Web Design", percent: 85, color: "blue" },
            { label: "Digital Marketing", percent: 90, color: "green" },
            { label: "Branding", percent: 80, color: "orange" },
            { label: "Development", percent: 95, color: "purple" }
        ],
        imageAlt: "Agency skills visualization"
    };

    const a = transformedData || fallbackData;

    if (loading) {
        return (
            <section className={styles.agencySection}>
                <div className={styles.loading}>Đang tải thông tin agency...</div>
            </section>
        );
    }

    return (
        <section className={styles.agencySection}>
            <div className={styles.agencyWrapper}>
                <div className={styles.agencyContent}>
                    {/* LEFT TEXT */}
                    <div className={styles.agencyText}>
                        <h2>
                            {a.titleLine1} <br />
                            <span>{a.titleLine2}</span>
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
                    <div className={styles.agencyImage}>
                        <img
                            src={a.image?.asset ?
                                urlFor(a.image).width(500).height(400).quality(80).url() :
                                "/images/home/skill_img.png"
                            }
                            alt={a.imageAlt || "Agency skills"}
                            width={500}
                            height={400}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}