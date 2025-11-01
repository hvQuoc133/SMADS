import { getDictionary } from "../../../lib/dictionaries";
import Activities from "./Activities";

export default async function Page({ params }) {
  const { locale } = params; 
  const dict = await getDictionary(locale);

  const activities = dict.activities.list.map((item, index) => ({
    id: index + 1,
    slug: item.slug,
    title: item.title,
    desc: item.desc,
    image: `/images/activities/activity${(index % 3) + 1}.jpg`,
  }));

  return <Activities dict={dict} activities={activities} locale={locale} />;
}

