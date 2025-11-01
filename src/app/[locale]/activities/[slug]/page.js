// src/app/[locale]/activities/[slug]/page.jsx

import { getDictionary } from "../../../../lib/dictionaries";
import ActivityDetail from "./ActivityDetail";
import viDict from "../../../../lib/dictionaries/vi.json";
import enDict from "../../../../lib/dictionaries/en.json";

export default async function Page({ params }) {
  const { locale, slug } = params;
  const dict = await getDictionary(locale);

  const activities = dict.activities.list.map((item, index) => ({
    slug: item.slug,
    title: item.title,
    desc: item.desc,
    image: `/images/activities/activity${(index % 3) + 1}.jpg`,
    content: item.content || "",
  }));

  // Nếu không tìm thấy trong locale hiện tại → thử tìm trong locale khác
  let activity = activities.find((a) => a.slug === slug);

  if (!activity) {
    const allLocales = locale === "vi" ? enDict.activities.list : viDict.activities.list;
    const fallback = allLocales.find((a) => a.slug === slug);
    if (fallback) {
      // tìm hoạt động tương đương trong locale hiện tại theo title
      activity = activities.find((a) => a.title === fallback.title);
    }
  }

  return <ActivityDetail dict={dict} activity={activity} />;
}
