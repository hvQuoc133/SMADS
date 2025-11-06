import { getDictionary } from "../../../../lib/dictionaries";
import Service from "../../../[locale]/services/ads/Service";

export default async function Page({ params: { locale } }) {
    const dict = await getDictionary(locale);
    return <Service dict={dict} locale={locale} />;
}
