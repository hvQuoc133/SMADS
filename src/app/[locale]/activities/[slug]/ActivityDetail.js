"use client";

import BgAllPage from "../../../../components/BgAllPage";
import ScrollToTop from "../../../../components/ScrollToTop";
import Image from "next/image";
import style from "../../../../styles/Activities.module.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

export default function ActivityDetail({ dict, locale, activity, relatedActivities }) {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  if (!activity) {
    return (
      <p className={style.notFound}>
        {dict.activities.notFound || "Không tìm thấy hoạt động này."}
      </p>
    );
  }

  return (
    <>
      <BgAllPage title={activity.title} parent={dict.activities.title} />

      <section className={style.detailSection}>
        {/* Left Content */}
        <div className={style.leftContent}>
          <div className={style.detailImage} data-aos="fade-up">
            <Image
              src={activity.image}
              alt={activity.title}
              width={900}
              height={500}
              className={style.image}
              priority
            />
          </div>

          <div className={style.detailContent} data-aos="fade-up">
            <h2 className={style.detailTitle}>{activity.title}</h2>
            <p className={style.detailDesc}>{activity.desc}</p>
            <div className={style.detailText}>{activity.content}</div>
          </div>
        </div>

        {/* Right Content - Related Articles */}
        <aside className={style.rightContent}>
          <h3>Bài viết khác</h3>
          
          <div className={style.relatedList}>
            {relatedActivities && relatedActivities.length > 0 ? (
              relatedActivities.map((item) => (
                <div key={item.id} className={style.relatedArticle}>
                  <Link href={`/${locale}/activities/${item.slug}`} className={style.relatedLink}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={100}
                      height={100}
                      className={style.relatedThumb}
                    />
                    <div className={style.relatedInfo}>
                      <h4>{item.title}</h4>
                      <p>{item.desc.slice(0, 60)}...</p>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p>Không có bài viết liên quan</p>
            )}
          </div>
        </aside>
      </section>

      <ScrollToTop />
    </>
  );
}
