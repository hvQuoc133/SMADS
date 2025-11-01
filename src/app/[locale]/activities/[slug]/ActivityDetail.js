"use client";

import BgAllPage from "../../../../components/BgAllPage";
import ScrollToTop from "../../../../components/ScrollToTop";
import Image from "next/image";
import style from "../../../../styles/Activities.module.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ActivityDetail({ dict, activity }) {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  if (!activity) {
    return <p className={style.notFound}>{dict.activities.notFound || "Không tìm thấy hoạt động này."}</p>;
  }

  return (
    <>
      <BgAllPage title={activity.title} parent={dict.activities.title} />

      <section className={style.detailSection}>
        <div className={style.container}>
          <div className={style.detailImage} data-aos="fade-up">
            <Image
              src={activity.image}
              alt={activity.title}
              width={900}
              height={500}
              className={style.image}
            />
          </div>

          <div className={style.detailContent} data-aos="fade-up">
            <h2 className={style.detailTitle}>{activity.title}</h2>
            <p className={style.detailDesc}>{activity.desc}</p>
            <p className={style.detailText}>{activity.content}</p>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </>
  );
}
