// src/app/[locale]/activities/[slug]/page.jsx

import { getDictionary } from "../../../../lib/dictionaries";
import ActivityDetail from "./ActivityDetail";
import viDict from "../../../../lib/dictionaries/vi.json";
import enDict from "../../../../lib/dictionaries/en.json";

export default async function Page({ params }) {
  const { locale, slug } = params;
  const dict = await getDictionary(locale);

  // List of all activities in the current locale
  const activities = dict.activities.list.map((item, index) => ({
    id: index + 1,
    slug: item.slug,
    title: item.title,
    desc: item.desc,
    image: `/images/activities/activity${(index % 3) + 1}.jpg`,
    content: item.content || "",
  }));

  // Find the activity by slug
  let activity = activities.find((a) => a.slug === slug);

  // If not found, try to fallback to the other locale
  if (!activity) {
    const fallbackList = locale === "vi" ? enDict.activities.list : viDict.activities.list;
    const fallback = fallbackList.find((a) => a.slug === slug);
    if (fallback) {
      activity = activities.find((a) => a.title === fallback.title);
    }
  }

  // Get related activities (excluding the current one)
  const relatedActivities = activities.filter((a) => a.slug !== slug).slice(0, 4);

  return (
    <ActivityDetail
      dict={dict}
      locale={locale}
      activity={activity}
      relatedActivities={relatedActivities}
    />
  );
}
