import ServiceWebDesign from './ServiceWebDesign';
import { getDictionary } from "../../../../lib/dictionaries";

export default async function ServicePage({ params }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);
    return <ServiceWebDesign locale={locale} dict={dict} />;
}

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const dict = await getDictionary(locale);

    return {
        title: dict.serviceWebDesign?.hero?.title || 'Thiết kế Website Chuyên nghiệp',
        description: dict.serviceWebDesign?.hero?.desc || 'Dịch vụ thiết kế website chuyên nghiệp, responsive, chuẩn SEO'
    };
}