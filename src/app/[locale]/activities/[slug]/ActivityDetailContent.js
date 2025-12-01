"use client";

import BgAllPage from "../../../../components/BgAllPage";
import ScrollToTop from "../../../../components/ScrollToTop";
import Image from "next/image";
import style from "../../../../styles/Activities.module.css";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import ActivityDetail from "./ActivityDetail";
import { urlFor } from "../../../../sanity/lib/image";
import { PortableText } from "@portabletext/react";
import portableTextComponents from "@/components/portableTextComponents";


export default function ActivityDetailContent({ activityData, dict, locale, relatedActivities }) {

    // Initialize AOS
    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    // Fallback
    if (!activityData) {
        return <ActivityDetail dict={dict} locale={locale} activity={null} relatedActivities={relatedActivities} />;
    }

    // Transform data
    const transformedActivity = {
        title: locale === 'vi' ? activityData.title : activityData.titleEn,
        desc: locale === 'vi' ? activityData.description : activityData.descriptionEn,
        content: locale === 'vi' ? activityData.content : activityData.contentEn,
        image: activityData.image ? urlFor(activityData.image).width(900).height(500).quality(80).url() : "/images/fallback-activity.jpg",
    };

    return (
        <>
            <BgAllPage title={transformedActivity.title} parent={dict.activities.title} />

            <section className={style.detailSection}>
                <div className={style.leftContent}>
                    <div className={style.detailImage} data-aos="fade-up">
                        <Image
                            src={transformedActivity.image}
                            alt={activityData.image?.alt || transformedActivity.title || "Activity image"}
                            width={900}
                            height={500}
                            className={style.image}
                            priority
                        />
                    </div>

                    <div className={style.detailContent} data-aos="fade-up">
                        <h2 className={style.detailTitle}>{transformedActivity.title}</h2>
                        <p className={style.detailDesc}>{transformedActivity.desc}</p>

                        <div className={style.detailText}>
                            {transformedActivity.content && transformedActivity.content.length > 0 ? (
                                <PortableText
                                    value={transformedActivity.content}
                                    components={portableTextComponents}
                                />
                            ) : (
                                <p>
                                    {locale === 'vi' ? 'Nội dung đang được cập nhật...' : 'Content is being updated...'}
                                    <br />
                                    <small>Debug: content length = {transformedActivity.content?.length || 0}</small>
                                </p>
                            )}
                        </div>
                    </div>

                    <div className={style.backButton}>
                        <a href={`/${locale}/activities`}>{dict.activities.btn_back}</a>
                    </div>
                </div>

                {/* Right Content - Related Articles */}
                <aside className={style.rightContent}>
                    <h3>{dict.activities.list_of_articles}</h3>
                    <div className={style.relatedList}>
                        {relatedActivities && relatedActivities.length > 0 ? (
                            relatedActivities.map((item) => (
                                <div key={item.id} className={style.relatedArticle}>
                                    <Link href={`/${locale}/activities/${item.slug}`} className={style.relatedLink}>
                                        <Image
                                            src={item.image ? urlFor(item.image).width(100).height(100).quality(80).url() : `/images/activities/activity${item.id}.jpg`}
                                            alt={item.alt || item.title || "Related activity"}
                                            width={100}
                                            height={100}
                                            className={style.relatedThumb}
                                        />
                                        <div className={style.relatedInfo}>
                                            <h4>{item.title}</h4>
                                            <p>{item.desc?.slice(0, 60)}...</p>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>{locale === 'vi' ? 'Không có bài viết liên quan' : 'No related articles'}</p>
                        )}
                    </div>
                </aside>
            </section>

            <ScrollToTop />
        </>
    );
}