"use client";

import { useEffect } from "react";
import BgAllPage from "../../../components/BgAllPage";
import ScrollToTop from "../../../components/ScrollToTop";
import "aos/dist/aos.css";
import ActivitiesSection from "../../../components/ActivitiesSection";
import Activities from "./Activities";
import { urlFor } from "../../../sanity/lib/image";

export default function ActivitiesContent({ pageData, activitiesData, dict, locale }) {
    useEffect(() => {
        import("aos").then((AOS) => {
            AOS.init({ duration: 1000, once: true });
        });

        // STRUCTURED DATA 
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": locale === 'vi' ? "Danh sách hoạt động" : "Activities List",
            "description": locale === 'vi' ? "Các hoạt động và dự án của SMADS" : "SMADS activities and projects",
            "numberOfItems": activitiesData?.length || 0,
            "itemListElement": activitiesData?.map((activity, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                    "@type": "Article",
                    "name": locale === 'vi' ? activity.title : activity.titleEn,
                    "description": locale === 'vi' ? activity.description : activity.descriptionEn,
                    "url": `https://smads.com.vn/${locale}/activities/${locale === 'vi' ? activity.slugVi : activity.slugEn}`
                }
            }))
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(structuredData);
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, [activitiesData, locale]);

    if (!activitiesData || activitiesData.length === 0) {
        return <Activities dict={dict} activities={[]} locale={locale} />;
    }

    const transformedActivities = activitiesData.map((item, index) => ({
        id: item._id || index + 1,
        title: locale === 'vi' ? item.title : item.titleEn,
        desc: locale === 'vi' ? item.description : item.descriptionEn,
        image: item.image ? urlFor(item.image).quality(80).url() : `/images/activities/activity${index + 1}.jpg`,
        slug: locale === 'vi' ? item.slugVi : item.slugEn,
        alt: item.image?.alt || (locale === 'vi' ? item.title : item.titleEn),
    }));

    const pageTitle = locale === 'vi'
        ? pageData?.pageTitle
        : pageData?.pageTitleEn || dict.activities.titleHero;

    return (
        <>
            <BgAllPage
                title={pageTitle}
                parent="SMADS"
            />

            <ActivitiesSection
                dict={dict}
                activities={transformedActivities}
                locale={locale}
            />
            <ScrollToTop />
        </>
    );
}