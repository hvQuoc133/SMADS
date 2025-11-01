"use client";

import Link from "next/link";
import Image from "next/image";
import style from "../styles/Activities.module.css";

export default function ActivitiesSection({ dict, activities, locale }) {
  if (!dict?.activities || !activities) return null;

  return (
    <section className={style.activitiesSection}>
      <div className={style.container}>
        <h2 className={style.sectionTitle}>{dict.activities.title}</h2>

        <div className={style.activitiesGrid}>
          {activities.map((item) => (
            <Link
              key={item.id}
              href={`/${locale}/activities/${item.slug}`}
              className={style.activityCard}
            >
              <div className={style.activityImg}>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={260}
                  className={style.image}
                />
              </div>
              <div className={style.activityContent}>
                <h5 className={style.activityTitle}>{item.title}</h5>
                <p className={style.activityDesc}>{item.desc}</p>
                <span className={style.activityLink}>
                  {dict.activities.viewDetail}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
