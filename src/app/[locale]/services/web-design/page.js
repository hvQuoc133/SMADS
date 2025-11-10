import ServiceWebDesign from './ServiceWebDesign';
import { getDictionary } from "../../../../lib/dictionaries";

export default async function ServicePage({ params }) {
    const { locale } = params;
    const dict = await getDictionary(locale);
    return <ServiceWebDesign locale={locale} dict={dict} />;
}

export async function generateMetadata({ params }) {
    const { locale } = params;
    const dict = await getDictionary(locale);

    return {
        title: dict.serviceWebDesign?.hero?.title || 'Website Design Service',
        description: dict.serviceWebDesign?.hero?.description || 'Professional website design service'
    };
}