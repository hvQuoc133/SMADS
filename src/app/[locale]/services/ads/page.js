import { getDictionary } from "../../../../lib/dictionaries";
import ServiceAds from "./ServiceAds";

export default async function Page({ params: { locale } }) {
    const dict = await getDictionary(locale);
    return <ServiceAds dict={dict} locale={locale} />;
}
