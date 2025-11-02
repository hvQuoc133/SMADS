// src/app/[locale]/activities/[slug]/page.jsx

import { getDictionary } from "../../../../lib/dictionaries";
import ActivityDetail from "./ActivityDetail";
import viDict from "../../../../lib/dictionaries/vi.json";
import enDict from "../../../../lib/dictionaries/en.json";

export default async function Page({ params }) {
  const { locale, slug } = params;
  const dict = await getDictionary(locale);

  // Danh sách tất cả hoạt động trong locale hiện tại
  const activities = dict.activities.list.map((item, index) => ({
    id: index + 1,
    slug: item.slug,
    title: item.title,
    desc: item.desc,
    image: `/images/activities/activity${(index % 3) + 1}.jpg`,
    content: item.content || "",
  }));

  // Tìm bài hiện tại
  let activity = activities.find((a) => a.slug === slug);

  // Nếu không tìm thấy trong locale hiện tại, thử tìm fallback
  if (!activity) {
    const fallbackList = locale === "vi" ? enDict.activities.list : viDict.activities.list;
    const fallback = fallbackList.find((a) => a.slug === slug);
    if (fallback) {
      activity = activities.find((a) => a.title === fallback.title);
    }
  }

  // Lọc ra các bài viết khác để hiển thị ở cột bên phải
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
