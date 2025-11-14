"use client";

import Link from "next/link";
import Image from "next/image";
import style from "../styles/Activities.module.css";

export default function ActivitiesSection({ dict, activities, locale }) {
  if (!dict?.activities || !activities) return null;

  console.log('📦 ActivitiesSection received:', {
    hasDict: !!dict,
    hasActivities: !!activities,
    activitiesCount: activities?.length,
    activitiesData: activities
  });

  if (!dict?.activities || !activities) {
    console.log('❌ Missing data:', {
      hasDict: !!dict,
      hasDictActivities: !!dict?.activities,
      hasActivities: !!activities
    });
    return null;
  }

  // Trong component cha (ví dụ: HomeContent hoặc trang khác)
  console.log('🏠 PARENT PAGE - Activities data to pass:', {
    activitiesCount: activities?.length,
    activitiesData: activities,
    source: 'Sanity or Dict?' // Xem data từ đâu
  });

  // Và kiểm tra xem component có được render không
  console.log('🔧 Rendering ActivitiesSection component...');

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
                  alt={item.alt || item.title}
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
