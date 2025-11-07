import ServiceInvoice from "./ServiceInvoice";
import { getDictionary } from "../../../../lib/dictionaries";

export default async function Page({ params: { locale } }) {
    const dict = await getDictionary(locale);
    return <ServiceInvoice locale={locale} dict={dict} />;
}
