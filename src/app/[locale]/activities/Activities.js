"use client";

import { useEffect } from "react";
import BgAllPage from "../../../components/BgAllPage";
import ScrollToTop from "../../../components/ScrollToTop";
import "aos/dist/aos.css";
import ActivitiesSection from "../../../components/ActivitiesSection";

export default function Activities({ dict, activities, locale }) {
  useEffect(() => {
    import("aos").then((AOS) => {
      AOS.init({ duration: 1000, once: true });
    });
  }, []);

  return (
    <>
      <BgAllPage title={dict.activities.title} parent="SMADS" />

      <ActivitiesSection dict={dict} activities={activities} locale={locale} />

      <ScrollToTop />
    </>
  );
}
